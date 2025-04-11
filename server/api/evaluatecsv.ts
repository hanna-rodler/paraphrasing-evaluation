import path from "path";
import { promises as fs } from "fs";

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
    // "Nachrichtenhaefigkeit",
    // "Sprachsensibilitaet",
    // "Abgrenzungsfaehigkeit",
    "ArtikelID",
    "Satznummer",
    "PromptID",
    "PromptID_1",
    "PromptID_1_LangIntensity",
    "PromptId_1_Factuality",
    "PromptID_2",
    "PromptID_2_LangIntensity",
    "PromptID_2_Factuality",
    "PromptID_3",
    "PromptID_3_LangIntensity",
    "PromptID_3_Factuality",
    "PromptID_4",
    "PromptID_4_LangIntensity",
    "PromptID_4_Factuality",
    "PromptID_5",
    "PromptID_5_LangIntensity",
    "PromptID_5_Factuality",
    "PromptID_6",
    "PromptID_6_LangIntensity",
    "PromptID_6_Factuality",
    "PromptID_7",
    "PromptID_7_LangIntensity",
    "PromptId_7_Factuality",
    "PromptID_8",
    "PromptId_8_LangIntensity",
    "PromptId_8_Factuality",
    "PromptID_9",
    "PromptId_9_LangIntensity",
    "PromptId_9_Factuality",
    "PromptID_10",
    "PromptId_10_LangIntensity",
    "PromptId_10_Factuality",
    "PromptID_11",
    "PromptId_11_LangIntensity",
    "PromptId_11_Factuality",
    "PromptID_12",
    "PromptId_12_LangIntensity",
    "PromptId_12_Factuality",
    "PromptID_13",
    "PromptId_13_LangIntensity",
    "PromptId_13_Factuality",
    "PromptID_14",
    "PromptId_14_LangIntensity",
    "PromptId_14_Factuality",
    "PromptID_15",
    "PromptId_15_LangIntensity",
    "PromptId_15_Factuality",
    "PromptID_16",
    "PromptId_16_LangIntensity",
    "PromptId_16_Factuality",
    "PromptID_17",
    "PromptId_17_LangIntensity",
    "PromptId_17_Factuality",
    "PromptID_18",
    "PromptId_18_LangIntensity",
    "PromptId_18_Factuality",
  ].join(",");

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
  ].join(",");

  // News_Sensitivity = newsWorry + newsBoundaries *-1;

  const processRespondent = (respondent) => {
    const rows = { demographics: [], prompts: [] };
    const respondentId = respondent._id?.$oid || -1000;

    let federalState = respondent.federalState.trim() || "";
    // if (federalState === "Nö") {
    //   federalState = "Niederösterreich";
    // } else if (
    //   federalState === "Obeösterreich" ||
    //   federalState.toLowerCase() === "oö"
    // ) {
    //   federalState = "Oberösterreich";
    // }
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

    let newsWorry = Number(respondent.newsWorry.$numberInt);
    let newsBoundaries = Number(respondent.newsBoundaries.$numberInt);
    let langHighSensitivity = Number(respondent.langHighSensitivity.$numberInt);
    let langLowSensitivity = Number(respondent.langLowSensitivity.$numberInt);
    let newsSensitivity = newsWorry - newsBoundaries;
    let langSensitivity = langHighSensitivity - langLowSensitivity;

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
      federalState: federalState || "",
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

                langIntensity = langIntensity * weightedMultiplier;
                factuality = factuality * weightedMultiplier;
                for (let i = 1; i <= numOccurences; i++) {
                  const counterBalanced = langIntensity + factuality;
                  const row = {
                    ...demographics,
                    News_Sensitivity: newsSensitivity,
                    Lang_Sensitivity: langSensitivity,
                    NewsWorry: newsWorry,
                    NewsBoundaries: newsBoundaries,
                    LangHighSensitivity: langHighSensitivity,
                    LangLowSensitivity: langLowSensitivity,
                    ArtikelID: articleId.replace("article_", ""),
                    Satznummer: sentenceNum,
                    PromptID: promptNum,
                    PromptID_1: promptNum === "1" ? counterBalanced : -1000,
                    PromptID_1_LangIntensity:
                      promptNum === "1" ? langIntensity : -1000,
                    PromptId_1_Factuality:
                      promptNum === "1" ? factuality : -1000,
                    PromptID_2: promptNum === "2" ? counterBalanced : -1000,
                    PromptID_2_LangIntensity:
                      promptNum === "2" ? langIntensity : -1000,
                    PromptID_2_Factuality:
                      promptNum === "2" ? factuality : -1000,
                    PromptID_3: promptNum === "3" ? counterBalanced : -1000,
                    PromptID_3_LangIntensity:
                      promptNum === "3" ? langIntensity : -1000,
                    PromptID_3_Factuality:
                      promptNum === "3" ? factuality : -1000,
                    PromptID_4: promptNum === "4" ? counterBalanced : -1000,
                    PromptID_4_LangIntensity:
                      promptNum === "4" ? langIntensity : -1000,
                    PromptID_4_Factuality:
                      promptNum === "4" ? factuality : -1000,
                    PromptID_5: promptNum === "5" ? counterBalanced : -1000,
                    PromptID_5_LangIntensity:
                      promptNum === "5" ? langIntensity : -1000,
                    PromptID_5_Factuality:
                      promptNum === "5" ? factuality : -1000,
                    PromptID_6: promptNum === "6" ? counterBalanced : -1000,
                    PromptID_6_LangIntensity:
                      promptNum === "6" ? langIntensity : -1000,
                    PromptID_6_Factuality:
                      promptNum === "6" ? factuality : -1000,
                    PromptId_7: promptNum === "7" ? counterBalanced : -1000,
                    PromptId_7_LangIntensity:
                      promptNum === "7" ? langIntensity : -1000,
                    PromptId_7_Factuality:
                      promptNum === "7" ? factuality : -1000,
                    PromptId_8: promptNum === "8" ? counterBalanced : -1000,
                    PromptId_8_LangIntensity:
                      promptNum === "8" ? langIntensity : -1000,
                    PromptId_8_Factuality:
                      promptNum === "8" ? factuality : -1000,
                    PromptId_9: promptNum === "9" ? counterBalanced : -1000,
                    PromptId_9_LangIntensity:
                      promptNum === "9" ? langIntensity : -1000,
                    PromptId_9_Factuality:
                      promptNum === "9" ? factuality : -1000,
                    PromptId_10: promptNum === "10" ? counterBalanced : -1000,
                    PromptId_10_LangIntensity:
                      promptNum === "10" ? langIntensity : -1000,
                    PromptId_10_Factuality:
                      promptNum === "10" ? factuality : -1000,
                    PromptId_11: promptNum === "11" ? counterBalanced : -1000,
                    PromptId_11_LangIntensity:
                      promptNum === "11" ? langIntensity : -1000,
                    PromptId_11_Factuality:
                      promptNum === "11" ? factuality : -1000,
                    PromptId_12: promptNum === "12" ? counterBalanced : -1000,
                    PromptId_12_LangIntensity:
                      promptNum === "12" ? langIntensity : -1000,
                    PromptId_12_Factuality:
                      promptNum === "12" ? factuality : -1000,
                    PromptId_13: promptNum === "13" ? counterBalanced : -1000,
                    PromptId_13_LangIntensity:
                      promptNum === "13" ? langIntensity : -1000,
                    PromptId_13_Factuality:
                      promptNum === "13" ? factuality : -1000,
                    PromptId_14: promptNum === "14" ? counterBalanced : -1000,
                    PromptId_14_LangIntensity:
                      promptNum === "14" ? langIntensity : -1000,
                    PromptId_14_Factuality:
                      promptNum === "14" ? factuality : -1000,
                    PromptId_15: promptNum === "15" ? counterBalanced : -1000,
                    PromptId_15_LangIntensity:
                      promptNum === "15" ? langIntensity : -1000,
                    PromptId_15_Factuality:
                      promptNum === "15" ? factuality : -1000,
                    PromptId_16: promptNum === "16" ? counterBalanced : -1000,
                    PromptId_16_LangIntensity:
                      promptNum === "16" ? langIntensity : -1000,
                    PromptId_16_Factuality:
                      promptNum === "16" ? factuality : -1000,
                    PromptId_17: promptNum === "17" ? counterBalanced : -1000,
                    PromptId_17_LangIntensity:
                      promptNum === "17" ? langIntensity : -1000,
                    PromptId_17_Factuality:
                      promptNum === "17" ? factuality : -1000,
                    PromptId_18: promptNum === "18" ? counterBalanced : -1000,
                    PromptId_18_LangIntensity:
                      promptNum === "18" ? langIntensity : -1000,
                    PromptId_18_Factuality:
                      promptNum === "18" ? factuality : -1000,
                  };
                  rows.prompts.push(row);
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
      rows.prompts.map((row) => Object.values(row).join(","))
    );
    demographicsCsvContent = demographicsCsvContent.concat(
      rows.demographics.map((row) => Object.values(row).join(","))
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
    return { success: false, error: error, statuscode: 500 };
  }
  return {
    success: true,
    statuscode: 200,
    message: "CSV erfolgreich erstellt!",
  };
});
