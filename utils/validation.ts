import type { articleSelection } from "~/types/survey.type";

export function countValidArticles(articles: articleSelection) {
  let validArticlesCount = 0;
  // iterate through object
  for (const article in articles) {
    const sentences = articles[article].softer;
    for (const sentence in sentences) {
      for (const version in sentences[sentence]) {
        if (
          sentences[sentence][version].factuality !== undefined &&
          sentences[sentence][version].langIntensity !== undefined
        ) {
          validArticlesCount++;
        }
      }
    }
    const verySoftSentences = articles[article].verySoft;
    for (const sentence in verySoftSentences) {
      for (const version in verySoftSentences[sentence]) {
        if (
          verySoftSentences[sentence][version].factuality !== undefined &&
          verySoftSentences[sentence][version].langIntensity !== undefined
        ) {
          validArticlesCount++;
        }
      }
    }
  }
  return validArticlesCount;
}
