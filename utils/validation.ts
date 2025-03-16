import type { articleSelection } from "~/types/survey.type";

export function countValidArticles(articles: articleSelection) {
  let validArticlesCount = 0;
  // iterate through object
  const validSentences = [];
  // console.log("articleSelection ", articles);
  for (const article in articles) {
    const sentences = articles[article];
    for (const sentence in sentences) {
      for (const version in sentences[sentence]) {
        if (
          sentences[sentence][version].factuality !== undefined &&
          sentences[sentence][version].langIntensity !== undefined
        ) {
          // console.log("sentence", sentences[sentence]); // sentence key CONTINUE
          validSentences.push(sentences[sentence][version]);
          validArticlesCount++;
        }
      }
    }
  }
  // console.log("valid sentences", validSentences);
  return validArticlesCount;
}
