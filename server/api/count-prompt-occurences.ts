import { promises as fs } from "fs";
type PromptCount = {
  fullCount: number;
  twoThirdCount: number;
  halfCount: number;
  sum: number;
  articles: Map<string, number>;
  stringifiedArticles?: unknown;
};

export default defineEventHandler(async (event) => {
  // Load JSON from file

  try {
    const rawData = await fs.readFile(
      "contents/final-version-survey.json",
      "utf-8"
    );

    const jsonData = JSON.parse(rawData);
    console.log("JSON data loaded successfully.", jsonData.length);

    // Map to store the total occurrences of each promptNumber

    const promptCounts: Record<string, PromptCount> = {};

    // Go through the JSON structure
    for (const item of jsonData) {
      const currArticle = item.id;
      const sentences = item.sentences;
      if (sentences && typeof sentences === "object") {
        for (const sentenceKey of Object.keys(sentences)) {
          const sentence = sentences[sentenceKey];
          if (sentence && Array.isArray(sentence.versions)) {
            for (const version of sentence.versions) {
              const promptId = version.prompt_id;
              if (typeof promptId === "string") {
                console.log("promptId:", promptId);
                // Split on '_' and process each {promptNumber}x{occurrences}
                // const cleanedPromptIds = promptId.replace(/-/g, "");
                // console.log("cleanedPromptIds:", cleanedPromptIds);
                // const parts = cleanedPromptIds.split("_");
                const parts = promptId.split("_");
                for (const part of parts) {
                  const match = part.match(/^(\d+)x(\d+)$/);

                  if (match) {
                    const [_, promptNumber, occurrencesStr] = match;
                    const occurrences = parseInt(occurrencesStr, 10);
                    // console.log(
                    //   `Found promptNumber: ${promptNumber}, occurrences: ${occurrences}`
                    // );

                    if (!promptCounts[promptNumber]) {
                      promptCounts[promptNumber] = {
                        fullCount: 0,
                        twoThirdCount: 0,
                        halfCount: 0,
                        articles: new Map<string, number>(),
                      };
                    }
                    // Initialize the promptCount object if it doesn't exist
                    promptCounts[promptNumber].fullCount =
                      (promptCounts[promptNumber].fullCount || 0) + occurrences;

                    promptCounts[promptNumber].sum =
                      (promptCounts[promptNumber].sum || 0) + occurrences;

                    if (currArticle) {
                      console.log("currArticle:", currArticle);
                      promptCounts[promptNumber].articles.set(
                        currArticle,
                        occurrences +
                          (promptCounts[promptNumber].articles.get(
                            currArticle
                          ) || 0)
                      );
                      const articles = JSON.stringify(
                        Object.fromEntries(
                          promptCounts[promptNumber].articles.entries()
                        )
                      );
                      console.log(
                        `Prompt: ${promptNumber}, articles: ${articles}`
                      );
                    } else {
                      console.warn("currArticle is undefined or empty.");
                    }
                  } else {
                    // count how man y minus signs are in the part
                    const countMinus = (part.match(/-/g) || []).length;
                    const cleanedPromptPart = part.replace(/-/g, "");
                    const cleanedMatch =
                      cleanedPromptPart.match(/^(\d+)x(\d+)$/);
                    if (cleanedMatch) {
                      const [_, promptNumber, occurrencesStr] = cleanedMatch;
                      if (!promptCounts[promptNumber]) {
                        promptCounts[promptNumber] = {
                          fullCount: 0,
                          twoThirdCount: 0,
                          halfCount: 0,
                          articles: new Map<string, number>(),
                        };
                      }
                      const occurrences = parseInt(occurrencesStr, 10);
                      promptCounts[promptNumber].sum =
                        (promptCounts[promptNumber].sum || 0) + occurrences;
                      promptCounts[promptNumber].articles.set(
                        currArticle,
                        occurrences +
                          (promptCounts[promptNumber].articles.get(
                            currArticle
                          ) || 0)
                      );
                      const articles = Object.fromEntries(
                        promptCounts[promptNumber].articles.entries()
                      );
                      console.log(
                        `Prompt: ${promptNumber}, articles: ${articles}`
                      );

                      if (countMinus === 1) {
                        promptCounts[promptNumber].twoThirdCount =
                          (promptCounts[promptNumber].twoThirdCount || 0) +
                          occurrences;
                        console.log(
                          `Found cleaned promptNumber: ${promptNumber}-${countMinus}, occurrences: ${occurrences}, now: ${promptCounts[promptNumber].twoThirdCount}`
                        );
                      } else if (countMinus === 2) {
                        promptCounts[promptNumber].halfCount =
                          (promptCounts[promptNumber].halfCount || 0) +
                          occurrences;
                        console.log(
                          `Found cleaned promptNumber: ${promptNumber}-${countMinus}, occurrences: ${occurrences}, now: ${promptCounts[promptNumber].halfCount}`
                        );
                      } else {
                        console.error(
                          "No occurences found for promptNumber:",
                          promptNumber
                        );
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    for (const [key, value] of Object.entries(promptCounts)) {
      console.log(`Prompt: ${key}, Count: ${value.fullCount}`);
      value.stringifiedArticles = Object.fromEntries(value.articles.entries());
    }

    // Output result
    return {
      statusCode: 200,
      message: promptCounts,
    };
  } catch (error) {
    console.error("Error reading or parsing JSON file:", error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
    };
  }
});
