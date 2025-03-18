import { defineNuxtRouteMiddleware, useNuxtApp, useFetch } from "#app";
import surveyData from "~/contents/final-version-survey.json";
import type { articleSelection } from "~/types/survey.type";

export default defineNuxtRouteMiddleware(async () => {
  const nuxtApp = useNuxtApp();

  // Fetch survey counter
  const { data, error: fetchError } = await useFetch("/api/count", {
    method: "GET",
  });

  if (data.value) {
    nuxtApp.payload.data.count = data.value.result?.responseCounter;
  } else {
    // default: show article configuration for 0
    nuxtApp.payload.data.count = 0;
    console.info("Unsuccessful fetch of count. Error:", fetchError.value);
    return;
  }

  // // Shuffle survey data if not already shuffled
  let shuffledData = nuxtApp.payload.data.shuffled;

  if (!shuffledData) {
    let answeredCount = nuxtApp.payload.data.count;
    let articlesById: { [key: string]: (typeof surveyData)[0] } =
      surveyData.reduce((acc, cur) => {
        acc[cur.id] = cur;
        return acc;
      }, {});

    let chosenArticles = [];
    // always add article_tote_gaza as the first article
    chosenArticles.push(articlesById["article_tote_gaza"]);
    let articleResponseSchema: articleSelection = {
      article_tote_gaza: { remark: "" },
    };

    // add article_iran_saengerin or article_sellner as the second article
    if (answeredCount % 2 === 0 || answeredCount === 0) {
      // add article_iran_saengerin for even numbers and zero
      chosenArticles.push(articlesById["article_iran_saengerin"]);
      articleResponseSchema.article_iran_saengerin = { remark: "" };
    } else {
      // add article_sellner for uneven numbers, but not for 0
      chosenArticles.push(articlesById["article_sellner"]);
      articleResponseSchema.article_sellner = { remark: "" };
    }

    // add article_russland, stocker or trump_grenell as the third article
    if (answeredCount % 3 === 0 || answeredCount === 0) {
      // article_sanctions_russia for 0, 3, 6, 9, 12, etc.
      chosenArticles.push(articlesById["article_sanctions_russia"]);
      articleResponseSchema.article_sanctions_russia = { remark: "" };
    } else if ((answeredCount + 1) % 3 === 0) {
      // article_stocker for 2, 5, 8, 11, etc.
      chosenArticles.push(articlesById["article_stocker"]);
      articleResponseSchema.article_stocker = { remark: "" };
    } else {
      // article_trump_grenell  for 1, 4, 7, 10, etc.
      chosenArticles.push(articlesById["article_trump_grenell"]);
      articleResponseSchema.article_trump_grenell = { remark: "" };
    }
    let shuffledData = shuffleArray(chosenArticles);
    nuxtApp.payload.data.shuffled = shuffledData;

    // count number of versions
    nuxtApp.payload.data.versionCount = countVersions(shuffledData);
    nuxtApp.payload.data.articleResponseSchema = articleResponseSchema;
  }
});

// Utility function to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

function countVersions(shuffledData: typeof surveyData) {
  let versionCount = 0;
  for (let i = 0; i < shuffledData.length; i++) {
    // Iterate through the sentences
    if (
      shuffledData[i].sentences &&
      typeof shuffledData[i].sentences === "object"
    ) {
      for (let key in shuffledData[i].sentences) {
        if (shuffledData[i].sentences.hasOwnProperty(key)) {
          let sentence = shuffledData[i].sentences[key];
          versionCount += sentence.versions.length;
        }
      }
    } else {
      console.warn(`shuffledData[${i}].sentences is not an object`);
    }
  }
  return versionCount;
}
