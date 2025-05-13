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
    "newsConsumptionFrequency",
    "newsConsumptionFrequency_numbered",
    "ArtikelID",
    "Satznummer",
    // "PromptID_1",
    "P1_LI",
    "P1_Fact",
    // "P2",
    "P2_LI",
    "P2_Fact",
    // "P3",
    "P3_LI",
    "P3_Fact",
    // "P4",
    "P4_LI",
    "P4_Fact",
    // "P5",
    "P5_LI",
    "P5_Fact",
    // "P6",
    "P6_LI",
    "P6_Fact",
    // "P7",
    "P7_LI",
    "P7_Fact",
    // "P8",
    "P8_LI",
    "P8_Fact",
    // "P9",
    "P9_LI",
    "P9_Fact",
    // "P10",
    "P10_LI",
    "P10_Fact",
    // "P11",
    "P11_LI",
    "P11_Fact",
    // "P12",
    "P12_LI",
    "P12_Fact",
    // "P13",
    "P13_LI",
    "P13_Fact",
    // "P14",
    "P14_LI",
    "P14_Fact",
    // "P15",
    "P15_LI",
    "P15_Fact",
    // "P16",
    "P16_LI",
    "P16_Fact",
    // "P17",
    "P17_LI",
    "P17_Fact",
    // "P18",
    "P18_LI",
    "P18_Fact",
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
    "newsConsumptionFrequency",
    "newsConsumptionFrequency_numbered",
  ].join(";");

  const csvHeaderCalculatedPromptValues = [
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
    "newsConsumptionFrequency",
    "newsConsumptionFrequency_numbered",
    "p1_f_avg",
    "p1_f_med",
    "p1_lI_avg",
    "p1_lI_med",
    "p1_cB_avg",
    "p1_cB_med",
    "p2_f_avg",
    "p2_f_med",
    "p2_lI_avg",
    "p2_lI_med",
    "p2_cB_avg",
    "p2_cB_med",
    "p3_f_avg",
    "p3_f_med",
    "p3_lI_avg",
    "p3_lI_med",
    "p3_cB_avg",
    "p3_cB_med",
    "p4_f_avg",
    "p4_f_med",
    "p4_lI_avg",
    "p4_lI_med",
    "p4_cB_avg",
    "p4_cB_med",
    "p5_f_avg",
    "p5_f_med",
    "p5_lI_avg",
    "p5_lI_med",
    "p5_cB_avg",
    "p5_cB_med",
    "p6_f_avg",
    "p6_f_med",
    "p6_lI_avg",
    "p6_lI_med",
    "p6_cB_avg",
    "p6_cB_med",
    "p7_f_avg",
    "p7_f_med",
    "p7_lI_avg",
    "p7_lI_med",
    "p7_cB_avg",
    "p7_cB_med",
    "p8_f_avg",
    "p8_f_med",
    "p8_lI_avg",
    "p8_lI_med",
    "p8_cB_avg",
    "p8_cB_med",
    "p9_f_avg",
    "p9_f_med",
    "p9_lI_avg",
    "p9_lI_med",
    "p9_cB_avg",
    "p9_cB_med",
    "p10_f_avg",
    "p10_f_med",
    "p10_lI_avg",
    "p10_lI_med",
    "p10_cB_avg",
    "p10_cB_med",
    "p11_f_avg",
    "p11_f_med",
    "p11_lI_avg",
    "p11_lI_med",
    "p11_cB_avg",
    "p11_cB_med",
    "p12_f_avg",
    "p12_f_med",
    "p12_lI_avg",
    "p12_lI_med",
    "p12_cB_avg",
    "p12_cB_med",
    "p13_f_avg",
    "p13_f_med",
    "p13_lI_avg",
    "p13_lI_med",
    "p13_cB_avg",
    "p13_cB_med",
    "p14_f_avg",
    "p14_f_med",
    "p14_lI_avg",
    "p14_lI_med",
    "p14_cB_avg",
    "p14_cB_med",
    "p15_f_avg",
    "p15_f_med",
    "p15_lI_avg",
    "p15_lI_med",
    "p15_cB_avg",
    "p15_cB_med",
    "p16_f_avg",
    "p16_f_med",
    "p16_lI_avg",
    "p16_lI_med",
    "p16_cB_avg",
    "p16_cB_med",
    "p17_f_avg",
    "p17_f_med",
    "p17_lI_avg",
    "p17_lI_med",
    "p17_cB_avg",
    "p17_cB_med",
    "p18_f_avg",
    "p18_f_med",
    "p18_lI_avg",
    "p18_lI_med",
    "p18_cB_avg",
    "p18_cB_med",
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

    const newsConsumptionFrequencyNumbered = () => {
      switch (respondent.newsConsumptionFrequency) {
        case "never":
          return 0;
        case "lessThanOnceWeekly":
          return 1;
        case "oneToThreeTimesWeekly":
          return 2;
        case "fourToSixTimesWeekly":
          return 3;
        case "daily":
          return 4;
        case "severalTimesDaily":
          return 5;
        default:
          break;
      }
    };

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
      newsConsumptionFrequency: respondent.newsConsumptionFrequency,
      newsConsumptionFrequency_numbered: newsConsumptionFrequencyNumbered(),
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

                factuality = transformNoZeroValues(factuality);

                langIntensity = langIntensity * weightedMultiplier;
                factuality = factuality * weightedMultiplier;
                for (let i = 1; i <= numOccurences; i++) {
                  const counterBalanced = langIntensity + factuality;
                  const row = {
                    ...demographics,
                    ArtikelID: articleId,
                    // ArtikelID: articleId.replace("article_", ""),
                    Satznummer: sentenceNum,
                    // PromptID: promptNum,
                    // PromptID_1: promptNum === "1" ? counterBalanced : -1000,
                    PromptID_1_LangIntensity:
                      promptNum === "1" ? langIntensity : -1000,
                    PromptId_1_Factuality:
                      promptNum === "1" ? factuality : -1000,
                    // PromptID_2: promptNum === "2" ? counterBalanced : -1000,
                    PromptID_2_LangIntensity:
                      promptNum === "2" ? langIntensity : -1000,
                    PromptID_2_Factuality:
                      promptNum === "2" ? factuality : -1000,
                    // PromptID_3: promptNum === "3" ? counterBalanced : -1000,
                    PromptID_3_LangIntensity:
                      promptNum === "3" ? langIntensity : -1000,
                    PromptID_3_Factuality:
                      promptNum === "3" ? factuality : -1000,
                    // PromptID_4: promptNum === "4" ? counterBalanced : -1000,
                    PromptID_4_LangIntensity:
                      promptNum === "4" ? langIntensity : -1000,
                    PromptID_4_Factuality:
                      promptNum === "4" ? factuality : -1000,
                    // PromptID_5: promptNum === "5" ? counterBalanced : -1000,
                    PromptID_5_LangIntensity:
                      promptNum === "5" ? langIntensity : -1000,
                    PromptID_5_Factuality:
                      promptNum === "5" ? factuality : -1000,
                    // PromptID_6: promptNum === "6" ? counterBalanced : -1000,
                    PromptID_6_LangIntensity:
                      promptNum === "6" ? langIntensity : -1000,
                    PromptID_6_Factuality:
                      promptNum === "6" ? factuality : -1000,
                    // PromptId_7: promptNum === "7" ? counterBalanced : -1000,
                    PromptId_7_LangIntensity:
                      promptNum === "7" ? langIntensity : -1000,
                    PromptId_7_Factuality:
                      promptNum === "7" ? factuality : -1000,
                    // PromptId_8: promptNum === "8" ? counterBalanced : -1000,
                    PromptId_8_LangIntensity:
                      promptNum === "8" ? langIntensity : -1000,
                    PromptId_8_Factuality:
                      promptNum === "8" ? factuality : -1000,
                    // PromptId_9: promptNum === "9" ? counterBalanced : -1000,
                    PromptId_9_LangIntensity:
                      promptNum === "9" ? langIntensity : -1000,
                    PromptId_9_Factuality:
                      promptNum === "9" ? factuality : -1000,
                    // PromptId_10: promptNum === "10" ? counterBalanced : -1000,
                    PromptId_10_LangIntensity:
                      promptNum === "10" ? langIntensity : -1000,
                    PromptId_10_Factuality:
                      promptNum === "10" ? factuality : -1000,
                    // PromptId_11: promptNum === "11" ? counterBalanced : -1000,
                    PromptId_11_LangIntensity:
                      promptNum === "11" ? langIntensity : -1000,
                    PromptId_11_Factuality:
                      promptNum === "11" ? factuality : -1000,
                    // PromptId_12: promptNum === "12" ? counterBalanced : -1000,
                    PromptId_12_LangIntensity:
                      promptNum === "12" ? langIntensity : -1000,
                    PromptId_12_Factuality:
                      promptNum === "12" ? factuality : -1000,
                    // PromptId_13: promptNum === "13" ? counterBalanced : -1000,
                    PromptId_13_LangIntensity:
                      promptNum === "13" ? langIntensity : -1000,
                    PromptId_13_Factuality:
                      promptNum === "13" ? factuality : -1000,
                    // PromptId_14: promptNum === "14" ? counterBalanced : -1000,
                    PromptId_14_LangIntensity:
                      promptNum === "14" ? langIntensity : -1000,
                    PromptId_14_Factuality:
                      promptNum === "14" ? factuality : -1000,
                    // PromptId_15: promptNum === "15" ? counterBalanced : -1000,
                    PromptId_15_LangIntensity:
                      promptNum === "15" ? langIntensity : -1000,
                    PromptId_15_Factuality:
                      promptNum === "15" ? factuality : -1000,
                    // PromptId_16: promptNum === "16" ? counterBalanced : -1000,
                    PromptId_16_LangIntensity:
                      promptNum === "16" ? langIntensity : -1000,
                    PromptId_16_Factuality:
                      promptNum === "16" ? factuality : -1000,
                    // PromptId_17: promptNum === "17" ? counterBalanced : -1000,
                    PromptId_17_LangIntensity:
                      promptNum === "17" ? langIntensity : -1000,
                    PromptId_17_Factuality:
                      promptNum === "17" ? factuality : -1000,
                    // PromptId_18: promptNum === "18" ? counterBalanced : -1000,
                    PromptId_18_LangIntensity:
                      promptNum === "18" ? langIntensity : -1000,
                    PromptId_18_Factuality:
                      promptNum === "18" ? factuality : -1000,
                  };
                  const key = Number(promptNum) - 1;
                  caclulatedValues[key].factuality.push(factuality);
                  caclulatedValues[key].langIntensity.push(langIntensity);
                  caclulatedValues[key].counterBalanced.push(counterBalanced);
                  // console.log(
                  //   "Prompt ",
                  //   promptNum,
                  //   "factuality",
                  //   factuality,
                  //   "langIntensity",
                  //   langIntensity,
                  //   "counterBalanced",
                  //   counterBalanced
                  // );
                  rows.prompts.push(row);
                  // rows.calculatedPromptValues.push(values);
                }
              }
            }
          }
        }
      }
    }
    rows.calculatedPromptValues = caclulatedValues;
    return rows;
  };

  // // 4. CSV generieren
  let csvContent = [csvHeader];
  let demographicsCsvContent = [csvHeaderDemographics];
  let calculatedPromptsCsvContent = [csvHeaderCalculatedPromptValues];
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
    const calculatedValues = processValues(rows.calculatedPromptValues);
    const calculatedPromptsCsvRow = [
      ...calculatedValues.flatMap((values) => [
        values.factuality_avg,
        values.factuality_median,
        values.langIntensity_avg,
        values.langIntensity_median,
        values.counterBalanced_avg,
        values.counterBalanced_median,
      ]),
    ].join(";");
    // add demographics to the end of the row without the respondentId

    const calculatedPromptsCsvWithDemographics = [
      ...Object.values(rows.demographics[0]),
      ...calculatedPromptsCsvRow.split(";"),
    ].join(";");

    calculatedPromptsCsvContent.push(calculatedPromptsCsvWithDemographics);
  }

  // // 5. Datei speichern
  try {
    fs.writeFile("contents/results/umfragedaten.csv", csvContent.join("\n"));
    fs.writeFile(
      "contents/results/demographic.csv",
      demographicsCsvContent.join("\n")
    );
    fs.writeFile(
      "contents/results/calculatedPrompts.csv",
      calculatedPromptsCsvContent.join("\n")
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
    federalState === "Oberösterreich" ||
    federalState === "Öberösterreich"
  ) {
    federalState = "OÖ";
  } else if (federalState.toLowerCase() === "vorarlberg") {
    federalState = "Vbg";
  } else if (federalState.toLowerCase() === "wien") {
    federalState = "W";
  } else if (federalState.toLowerCase() === "salzburg") {
    federalState = "S";
  } else if (federalState.toLowerCase() === "nordrhein westfalen") {
    federalState = "NRW";
  } else if (federalState.toLowerCase() === "baden-württemberg") {
    federalState = "BW";
  }
  return federalState;
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

function processValues(values: Array<valuesObject>) {
  const processedValues = values.map((value) => {
    const { factuality, langIntensity, counterBalanced } = value;
    return {
      factuality_avg: calculateAverage(factuality),
      factuality_median: calculateMedian(factuality),
      langIntensity_avg: calculateAverage(langIntensity),
      langIntensity_median: calculateMedian(langIntensity),
      counterBalanced_avg: calculateAverage(counterBalanced),
      counterBalanced_median: calculateMedian(counterBalanced),
    };
  });
  // console.log("processed values", processedValues);
  return processedValues;
}

function calculateAverage(arr: numArray) {
  if (arr === undefined || arr.length === 0) return -1000;
  const sum = arr.reduce((acc, val) => acc + val, 0);
  return sum / arr.length;
}
function calculateMedian(arr: numArray) {
  if (arr === undefined || arr.length === 0) return -1000;
  const sorted = arr.slice().sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}
