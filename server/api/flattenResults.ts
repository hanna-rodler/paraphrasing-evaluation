import path from "path";
import { promises as fs } from "fs";
import type { numArray, valuesObject } from "~/types/evaluation.type";

export default defineEventHandler(async (event) => {
  const directoryPath = path.resolve("contents/results");
  const rawData = await fs.readFile("contents/results/results.json", "utf-8");
  const respondents = JSON.parse(rawData);
  console.log("respondents length", respondents.length);

  const csvHeader = [
    "RespondentID",
    "age",
    "gender",
    "country",
    "federalState",
    "psychosocialWorker",
    "News_Sensitivity",
    "Lang_Sensitivity",
    "NewsWorry",
    "NewsBoundaries",
    "LangHighSensitivity",
    "LangLowSensitivity",
    "VerySoftDeathInjNums",
    "SoftDeathInjNums",
    "ArtikelID",
    "Satznummer",
    "PromptID",
    "LangIntensity",
    "Factuality",
  ].join(";");

  const csvHeaderDemographics = [
    "RespondentID",
    "age",
    "gender",
    "country",
    "federalState",
    "psychosocialWorker",
    "News_Sensitivity",
    "Lang_Sensitivity",
    "NewsWorry",
    "NewsBoundaries",
    "LangHighSensitivity",
    "LangLowSensitivity",
    "softDeathInjNums",
    "verySoftDeathInjNums",
  ].join(";");

  // News_Sensitivity = newsWorry + newsBoundaries *-1;

  const processRespondent = (respondent) => {
    const rows = { demographics: [], prompts: [], calculatedPromptValues: [] };
    const respondentId = respondent._id?.$oid || -1000;
    // TODO: + respondent id + demographics.
    let caclulatedValues: valuesObject[] = Array.from({ length: 18 }, () => ({
      respondendtId: respondentId,
      factuality: [] as numArray,
      langIntensity: [] as numArray,
      counterBalanced: [] as numArray,
    }));

    const cleanedFederalState = cleanFederalState(
      respondent.federalState.trim() || ""
    );

    let newsWorry = Number(respondent.newsWorry.$numberInt);
    let newsBoundaries = Number(respondent.newsBoundaries.$numberInt);
    let langHighSensitivity = Number(respondent.langHighSensitivity.$numberInt);
    let langLowSensitivity = Number(respondent.langLowSensitivity.$numberInt);
    let newsSensitivity = newsWorry - newsBoundaries;
    let langSensitivity = langHighSensitivity - langLowSensitivity;

    let softDeathInjNums = transformNoZeroValues(
      Number(respondent.softDeathInjNums.$numberInt)
    );
    let verySoftDeathInjNums = transformNoZeroValues(
      Number(respondent.verySoftDeathInjNums.$numberInt)
    );

    // Demographische Daten extrahieren
    const demographics = {
      RespondentID: respondentId,
      age: respondent.age.$numberInt || -1000,
      gender: respondent.gender || "",
      country: respondent.country || "",
      federalState: cleanedFederalState || "",
      psychoSocialWorker: respondent.psychoSocialWorker || false,
      News_Sensitivity: newsSensitivity,
      Lang_Sensitivity: langSensitivity,
      NewsWorry: newsWorry,
      NewsBoundaries: newsBoundaries,
      LangHighSensitivity: langHighSensitivity,
      LangLowSensitivity: langLowSensitivity,
      softDeathInjNums: softDeathInjNums,
      verySoftDeathInjNums: verySoftDeathInjNums,
    };
    rows.demographics.push(demographics);

    // Artikel verarbeiten
    for (const [articleId, articleData] of Object.entries(
      respondent.articles
    )) {
      for (const [sentenceKey, sentenceData] of Object.entries(articleData)) {
        if (sentenceKey.startsWith("sentence__")) {
          const sentenceNum = sentenceKey.split("__")[1];

          for (const [promptId, promptData] of Object.entries(sentenceData)) {
            let factuality: number | null =
              Number(promptData.factuality?.$numberInt) || null;
            let langIntensity: number | null =
              Number(promptData.langIntensity?.$numberInt) || null;
            const promptIds = promptId.split("__")[1].split("_");

            if (factuality !== null && langIntensity !== null) {
              for (let promptNum of promptIds) {
                if (
                  factuality > 4 ||
                  factuality < -4 ||
                  langIntensity < -4 ||
                  langIntensity > 4
                ) {
                  console.log("ALERT!", promptNum, factuality, langIntensity);
                }
                let numOccurences: number = 1;
                if (promptNum.split("x").length === 2) {
                  const splittedPromptNum = promptNum.split("x");
                  promptNum = splittedPromptNum[0];
                  numOccurences = Number(splittedPromptNum[1]);
                }
                let weightedMultiplier = 1;
                if (promptNum.endsWith("-")) {
                  promptNum = promptNum.slice(0, -1);
                  weightedMultiplier = 0.75;
                  if (promptNum.endsWith("-")) {
                    promptNum = promptNum.slice(0, -1);
                    weightedMultiplier = 0.5;
                  }
                }

                let normedFactuality = transformNoZeroValues(factuality);

                langIntensity = langIntensity * weightedMultiplier;
                normedFactuality = normedFactuality * weightedMultiplier;
                for (let i = 1; i <= numOccurences; i++) {
                  const counterBalanced = langIntensity + normedFactuality;
                  const row = {
                    ...demographics,
                    ArtikelID: articleId,
                    // ArtikelID: articleId.replace("article_", ""),
                    Satznummer: sentenceNum,
                    Prompt_ID: promptNum,
                    LangIntensity: langIntensity,
                    Factuality: normedFactuality,
                  };
                  rows.prompts.push(row);
                  // rows.calculatedPromptValues.push(values);
                }
              }
            }
          }
        }
      }
    }
    return rows;
  };

  // // 4. CSV generieren
  let csvContent = [csvHeader];
  let demographicsCsvContent = [csvHeaderDemographics];
  for (const respondent of Array.isArray(respondents)
    ? respondents
    : [respondents]) {
    const rows = processRespondent(respondent);
    csvContent = csvContent.concat(
      rows.prompts.map((row) => Object.values(row).join(";"))
    );
    demographicsCsvContent = demographicsCsvContent.concat(
      rows.demographics.map((row) => Object.values(row).join(";"))
    );
  }

  // // 5. Datei speichern
  try {
    fs.writeFile("contents/results/umfragedaten.csv", csvContent.join("\n"));
    fs.writeFile(
      "contents/results/demographic.csv",
      demographicsCsvContent.join("\n")
    );
    console.log("CSV erfolgreich erstellt!");
    return {
      success: true,
      statuscode: 200,
      message: "CSV erfolgreich erstellt!",
    };
  } catch (error) {
    console.log("failed to create csv", error);
    return { success: false, error: error, statuscode: 500 };
  }
});

function cleanFederalState(federalState: string) {
  if (
    federalState.toLowerCase() === "nö" ||
    federalState === "Niederösterreich"
  ) {
    federalState = "NÖ";
  } else if (
    federalState === "Obeösterreich" ||
    federalState.toLowerCase() === "oö" ||
    federalState === "Oberösterreich"
  ) {
    federalState = "OÖ";
  } else if (federalState.toLowerCase() === "vorarlberg") {
    federalState = "Vbg";
  } else if (federalState.toLowerCase() === "wien") {
    federalState = "W";
  } else if (federalState.toLowerCase() === "baden-württemberg") {
    federalState = "BW";
  }
  return federalState;
  // if (federalState === "Nö") {
  //   federalState = "Niederösterreich";
  // } else if (
  //   federalState === "Obeösterreich" ||
  //   federalState.toLowerCase() === "oö"
  // ) {
  //   federalState = "Oberösterreich";
  // }
}

function transformNoZeroValues(num: number) {
  switch (num) {
    case -2:
      num = 0;
      break;
    case -1:
      num = 1;
      break;
    case 1:
      num = 2;
      break;
    case 2:
      num = 3;
      break;
    default:
      break;
  }
  return num;
}
