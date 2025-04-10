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
    "psychosocialWorker",
    // "Nachrichtenhaefigkeit",
    // "Sprachsensibilitaet",
    // "Abgrenzungsfaehigkeit",
    "ArtikelID",
    "Satznummer",
    "PromptID",
    "PromptID_1",
    "PromptID_2",
    "PromptID_3",
    "PromptID_4",
    "PromptID_5",
    "PromptID_6",
    "PromptID_7",
    "PromptID_8",
    "PromptID_9",
    "PromptID_10",
    "PromptID_11",
    "PromptID_12",
    "PromptID_13",
    "PromptID_14",
    "PromptID_15",
    "PromptID_16",
    "PromptID_17",
    "PromptID_18",
    "Factuality_Score",
    "LangIntensity_Score",
  ].join(",");

  const processRespondent = (respondent) => {
    const rows = [];
    const respondentId = respondent._id?.$oid || null;

    // Demographische Daten extrahieren
    const demographics = {
      RespondentID: respondentId,
      age: respondent.age.$numberInt || null,
      gender: respondent.gender || "",
      psychoSocialWorker: respondent.psychoSocialWorker || false,
    };

    const row = {
      ...demographics,
    };
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
                    ArtikelID: articleId.replace("article_", ""),
                    Satznummer: sentenceNum,
                    PromptID: promptNum,
                    PromptID_1: promptNum === "1" ? counterBalanced : "",
                    PromptID_2: promptNum === "2" ? counterBalanced : "",
                    PromptID_3: promptNum === "3" ? counterBalanced : "",
                    PromptID_4: promptNum === "4" ? counterBalanced : "",
                    PromptID_5: promptNum === "5" ? counterBalanced : "",
                    PromptID_6: promptNum === "6" ? counterBalanced : "",
                    PromptId_7: promptNum === "7" ? counterBalanced : "",
                    PromptId_8: promptNum === "8" ? counterBalanced : "",
                    PromptId_9: promptNum === "9" ? counterBalanced : "",
                    PromptId_10: promptNum === "10" ? counterBalanced : "",
                    PromptId_11: promptNum === "11" ? counterBalanced : "",
                    PromptId_12: promptNum === "12" ? counterBalanced : "",
                    PromptId_13: promptNum === "13" ? counterBalanced : "",
                    PromptId_14: promptNum === "14" ? counterBalanced : "",
                    PromptId_15: promptNum === "15" ? counterBalanced : "",
                    PromptId_16: promptNum === "16" ? counterBalanced : "",
                    PromptId_17: promptNum === "17" ? counterBalanced : "",
                    PromptId_18: promptNum === "18" ? counterBalanced : "",
                    Factuality_Score: factuality,
                    LangIntensity_Score: langIntensity,
                  };
                  rows.push(row);
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
  for (const respondent of Array.isArray(respondents)
    ? respondents
    : [respondents]) {
    const rows = processRespondent(respondent);
    csvContent = csvContent.concat(
      rows.map((row) => Object.values(row).join(","))
    );
  }

  // // 5. Datei speichern
  try {
    fs.writeFile("contents/results/umfragedaten.csv", csvContent.join("\n"));
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
