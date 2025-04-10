import path from "path";
import { promises as fs } from "fs";
import { count } from "console";

export default defineEventHandler(async (event) => {
  // read files

  //   const result = await readAllFiles("contents/results");
  const dir = "contents/results";
  try {
    // Define the path to the folder
    const directoryPath = path.resolve(dir);

    // Read all files in the folder
    const files = await fs.readdir(directoryPath);

    const resultsByPrompts: string[] = [];
    const resultsByArticles = [
      { article_tote_gaza: {} },
      { article_iran_saengerin: {} },
      { article_sellner: {} },
      { article_sanctions_russia: {} },
      { article_stocker: {} },
      { article_trump_grenell: {} },
    ];

    // Read contents of each file
    const fileContents = await Promise.all(
      files.map(async (file) => {
        // if (file === "05-pretest.json") {
        const filePath = path.join(directoryPath, file);
        const content = await fs.readFile(filePath, "utf-8");
        const jsonContent = JSON.parse(content);
        const articles = jsonContent.articles;
        // // TODO: await process articles
        for (const article in articles) {
          console.log("next article: ", article);
          const sentences = articles[article];
          for (const sentence in sentences) {
            if (sentence !== "remark") {
              for (const version in sentences[sentence]) {
                // promptId__1-x1_5-x1_8x2_9x1_11x2_13x3_14x2_16x3_18x1
                if (version.split("__")[1] !== undefined) {
                  const promptIds = version.split("__")[1].split("_");
                  console.log("promptIds ", promptIds);
                  if (
                    sentences[sentence][version].factuality !== undefined &&
                    sentences[sentence][version].langIntensity !== undefined
                  ) {
                    for (const promptId of promptIds) {
                      console.log("now promptId ", promptId);
                      if (promptId.split("x").length == 2) {
                        let promptNum = promptId.split("x")[0];
                        let countMinus = 0;

                        // set minus for decreased rating
                        if (promptNum.endsWith("-")) {
                          promptNum = promptNum.slice(0, -1);
                          countMinus = 1;
                          if (promptNum.endsWith("-")) {
                            promptNum = promptNum.slice(0, -1);
                            countMinus = 2;
                          }
                        }

                        const multiplier: number = Number(
                          promptId.split("x")[1]
                        );
                        const promptName = "prompt_" + promptNum;

                        // STATISTICS
                        // Lang Intensity
                        const langIntensity = parseInt(
                          sentences[sentence][version].langIntensity.$numberInt,
                          10
                        );
                        let langIntensityRating = langIntensity;

                        const factuality = parseInt(
                          sentences[sentence][version].factuality.$numberInt,
                          10
                        );
                        let factualityRating = factuality;
                        // adjust for minus
                        if (countMinus === 1) {
                          langIntensityRating = langIntensityRating * 0.75;
                          factualityRating = factualityRating * 0.75;
                        } else if (countMinus === 2) {
                          langIntensityRating = langIntensityRating * 0.5;
                          factualityRating = factualityRating * 0.5;
                        }

                        // Initiailize resultsByPrompts for promptName
                        resultsByPrompts[promptName] =
                          resultsByPrompts[promptName] || {};
                        resultsByPrompts[promptName].langIntensity =
                          resultsByPrompts[promptName].langIntensity || {};
                        resultsByPrompts[promptName].factuality =
                          resultsByPrompts[promptName].factuality || {};
                        resultsByPrompts[promptName].counterBalanced =
                          resultsByPrompts[promptName].counterBalanced || {};

                        // // sum
                        // resultsByPrompts[promptName].langIntensity.sum =
                        //   resultsByPrompts[promptName].langIntensity.sum +
                        //     langIntensityRating * multiplier ||
                        //   langIntensityRating * multiplier;
                        // resultsByPrompts[promptName].factuality.sum =
                        //   resultsByPrompts[promptName].factuality.sum +
                        //     factualityRating * multiplier ||
                        //   factualityRating * multiplier;

                        // save values
                        const counterBalanced = langIntensity + factuality;
                        resultsByPrompts[promptName].langIntensity.values =
                          resultsByPrompts[promptName].langIntensity.values ||
                          [];
                        resultsByPrompts[promptName].factuality.values =
                          resultsByPrompts[promptName].factuality.values || [];
                        console.log("should go through loop ", multiplier);
                        for (let i = 0; i < multiplier; i++) {
                          console.log(
                            "push to promptName ",
                            promptName,
                            "x",
                            multiplier,
                            " => ",
                            langIntensityRating,
                            factualityRating,
                            counterBalanced
                          );
                          resultsByPrompts[
                            promptName
                          ].langIntensity.values.push(langIntensityRating);
                          resultsByPrompts[promptName].factuality.values.push(
                            factualityRating
                          );
                          resultsByPrompts[
                            promptName
                          ].counterBalanced.values.push(counterBalanced);
                        }

                        console.log(
                          "counterBalanced: ",
                          promptName,
                          " => ",
                          resultsByPrompts[promptName].counterBalanced,
                          "lang int",
                          langIntensity,
                          "factuality ",
                          factuality
                        );

                        // count
                        resultsByPrompts[promptName].count =
                          resultsByPrompts[promptName].count + multiplier ||
                          multiplier;

                        // full, third, half counts
                        if (countMinus === 0) {
                          resultsByPrompts[promptName].fullCounts =
                            resultsByPrompts[promptName].fullCounts +
                              multiplier || multiplier;
                        } else if (countMinus === 1) {
                          resultsByPrompts[promptName].twoTahirdCounts =
                            resultsByPrompts[promptName].twoTahirdCounts +
                              multiplier || multiplier;
                        } else if (countMinus === 2) {
                          resultsByPrompts[promptName].halfCounts =
                            resultsByPrompts[promptName].halfCounts +
                              multiplier || multiplier;
                        }
                        // sort values in array ascending
                        resultsByPrompts[promptName].sortedLangiNtensity =
                          resultsByPrompts[promptName].langIntensity;
                        resultsByPrompts[
                          promptName
                        ].sortedLangiNtensity.values.sort(
                          (a: number, b: number) => a - b
                        );
                        resultsByPrompts[promptName].sortedFactuality =
                          resultsByPrompts[promptName].factuality;
                        resultsByPrompts[promptName].factuality.values.sort(
                          (a: number, b: number) => a - b
                        );

                        // console.log(
                        //   "resultsByPrompts: ",
                        //   resultsByPrompts[promptName]
                        // );
                      } else {
                        console.log(
                          "prompt id splitting problem: ",
                          promptId,
                          promptIds
                        );
                      }
                    }
                  }
                } else {
                  console.log(
                    "version ",
                    version,
                    " of sentence",
                    sentences[sentence],
                    sentence,
                    " is undefined"
                  );
                }
              }
            } else {
              console.log("remark: ", sentence);
            }
          }
        }
        // // TODO: some kind of syncronizity issue. resultsByPrompts not defined
        // return { file, jsonContent, resultsByPrompts };
        // }
        return { " file": file, jsonContent: jsonContent };
      })
    );

    // for (let promptId in resultsByPrompts) {
    //   console.log("prompt: ", promptId, " => ", resultsByPrompts[promptId]);
    //   // sum all values in array
    //   const prompt = resultsByPrompts[promptId];
    //   if (
    //     prompt.langIntensity &&
    //     prompt.langIntensity.values.length >= 1 &&
    //     prompt.factuality &&
    //     prompt.factuality.values.length >= 1
    //   ) {
    //     const sumLangIntensity = prompt.langIntensity.values.reduce(
    //       (a: number, b: number) => a + b,
    //       0
    //     );
    //     const sumFactuality = prompt.factuality.values.reduce(
    //       (a: number, b: number) => a + b,
    //       0
    //     );
    //     prompt.factuality.sum = sumFactuality;
    //     prompt.langIntensity.sum = sumLangIntensity;
    //     // calculate average
    //     const avgLangIntensity = sumLangIntensity / prompt.count;
    //     const avgFactuality = sumFactuality / prompt.count;
    //     prompt.factuality.avg = avgFactuality;
    //     prompt.langIntensity.avg = avgLangIntensity;

    //     // // calculate median
    //     // const medianLangIntensity =
    //     //   prompt.count % 2 === 0
    //     //     ? (prompt.langIntensity[prompt.count / 2 - 1] +
    //     //         prompt.langIntensity[prompt.count / 2]) /
    //     //       2
    //     //     : prompt.langIntensity[(prompt.count - 1) / 2];
    //     // const medianFactuality =
    //     //   prompt.count % 2 === 0
    //     //     ? (prompt.factuality[prompt.count / 2 - 1] +
    //     //         prompt.factuality[prompt.count / 2]) /
    //     //       2
    //     //     : prompt.factuality[(prompt.count - 1) / 2];
    //     // prompt.factuality.median = medianFactuality;
    //     // prompt.langIntensity.median = medianLangIntensity;
    //     resultsByPrompts[promptId] = prompt;
    //   } else {
    //     console.log("prompt: ", prompt, " has no lang or factualtiy undefined");
    //   }
    // }
    console.log("resultsByPrompts: ", resultsByPrompts);

    // TODO: some kind of syncronizity issue. resultsByPrompts not defined
    return { success: true, data: fileContents };
  } catch (error) {
    return { success: false, error: error.message };
  }
  //   if (result.success) {
  //     console.log("Success:", result.files);
  //   } else {
  //     console.error("Error:", result.error);
  //   }
  //   console.log("Reading files");
  //   process files
  // write result file
  // return output
});

async function processFiles(fileContents, resultsByPrompts) {
  console.log("fileContents: ", fileContents);
  console.log("resultsByPrompts", resultsByPrompts);
}

// function getRating(promptName: string,  langIntensityRating: number, factualityRating: number, resultsByPrompts: string[], )
