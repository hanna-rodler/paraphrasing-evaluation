import {
  defineNuxtRouteMiddleware,
  useNuxtApp,
  useFetch,
  navigateTo,
} from "#app";
import surveyData from "~/contents/shortened-one-version-survey.json";
import count from "~/server/api/count";
import type { articleSelection } from "~/types/survey.type";

export default defineNuxtRouteMiddleware(async () => {
  const nuxtApp = useNuxtApp();

  // Fetch survey counter
  const { data, error: fetchError } = await useFetch("/api/count", {
    method: "GET",
  });

  if (data.value) {
    nuxtApp.payload.data.count = data.value.counters?.viewCounter;
  } else {
    console.error("Unsuccessful. Error:", fetchError.value);
    return;
  }

  // Shuffle survey data if not already shuffled
  let shuffledData = nuxtApp.payload.data.shuffled;

  if (!shuffledData) {
    let answeredCount = nuxtApp.payload.data.count;
    // structure the surveyData so that we can get the article by id from the json file
    let articlesById: { [key: string]: (typeof surveyData)[0] } =
      surveyData.reduce((acc, cur) => {
        acc[cur.id] = cur;
        return acc;
      }, {});

    let chosenArticles = [];
    let articleResponseSchema: articleSelection = {};
    let emptyArticleInitiation = {
      softer: {},
      verySoft: {},
      remark: "",
    };

    // always add article_tote_gaza
    chosenArticles.push(articlesById["article_tote_gaza"]);
    articleResponseSchema.article_tote_gaza = emptyArticleInitiation;

    // get "id": "article_tote_gaza" from surveyData

    // add article_iran_saengerin for even numbers and zero
    // add article_sellner for uneven numbers, but not for 0
    if (answeredCount % 2 === 0 || answeredCount === 0) {
      // get article_iran_saengerin  OR article_sellner from surveyData
      // answeredCount % 4 === 0 OR answeredCount 0
      chosenArticles.push(articlesById["article_iran_saengerin"]);
      articleResponseSchema.article_iran_saengerin = emptyArticleInitiation;
    } else {
      // answeredCount % 2, but not % 4 === 0 und answeredCount 0
      chosenArticles.push(articlesById["article_sellner"]);
      articleResponseSchema.article_sellner = emptyArticleInitiation;
    }

    // add article_russland for every third answer and zero
    if (answeredCount % 3 === 0 || answeredCount === 0) {
      // get article_stocker OR article_trump_grenell OR article_sanctions_russia from surveyData
      chosenArticles.push(articlesById["article_sanctions_russia"]);
      articleResponseSchema.article_sanctions_russia = emptyArticleInitiation;
    } else if ((answeredCount + 1) % 3 === 0) {
      // for 2, 5, 8, 11, etc.
      chosenArticles.push(articlesById["article_stocker"]);
      articleResponseSchema.article_stocker = emptyArticleInitiation;
    } else {
      // for 1, 4, 7, 10, etc.
      chosenArticles.push(articlesById["article_trump_grenell"]);
      articleResponseSchema.article_trump_grenell = emptyArticleInitiation;
    }
    shuffledData = shuffleArray(chosenArticles);
    console.log("shuffled Data", shuffledData);
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
