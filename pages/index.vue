<template>
  <div class="w-11/12">
    <div class="section">
      <h1 class="font-bold text-2xl md:text-4xl">News Umfrage Titel</h1>
      <AtomsText class="text-center">
        Umfrage Einführungstext - Erklärung was kommt. Was beinhaltet politisch?
      </AtomsText>
    </div>
    <Demographics></Demographics>
    <div v-for="(article, index) of shuffledData" v-bind:key="article.id">
      <Comparison :article="article" :index="index"></Comparison>
    </div>
    <div class="section">
      <div class="my-4">
        Zahlen von Toten und Verletzten sollen in der
        <em>sehr sanften Version</em> immer durch allgemeine Kategorisierungen
        ersetzt werden:
        <br />
        <div
          class="flex items-center space-x-2 md:space-x-4 justify-center mt-2"
        >
          <span>Ich stimme sehr zu</span>
          <div class="flex space-x-2">
            <label
              v-for="(value, index) in [2, 1, -1, -2]"
              :key="index"
              class="flex items-center space-x-4"
            >
              <input
                type="radio"
                name="rating"
                :value="value"
                class="form-radio w-4 h-4 text-primary mx-1 md:mx-2"
              />
            </label>
          </div>
          <span>Ich stimme gar nicht zu</span>
        </div>
      </div>
      <div class="my-4">
        Ich kann mir grundsätzlich vorstellen folgende Versionen zu lesen,
        sofern ich selbst immer einstellen kann, welche ich lese:
        <br />
        Auswahl original, sanfter, sehr sanft
      </div>
      <div class="my-4">
        Ich kann mir vorstellen, dass folgende Versionen für mich
        <em>hilfreich</em> sein können, sofern ich selbst immer einstellen kann,
        welche ich lese:
        <br />
        Auswahl original, sanfter, sehr sanft
      </div>
    </div>

    <div class="section">
      <div
        v-if="!isValid"
        class="text-error text-center"
        id="form-error-msg"
        role="alert"
      >
        Bitte füllen Sie alle Fragen aus.
      </div>
      <div class="mt-5 flex justify-center flex-row">
        <AtomsButton
          tag="button"
          variant="gradient"
          @click="submitForm"
          aria-describedby="form-error-msg"
          aria-label="Umfrage abschicken"
        >
          Abschicken
        </AtomsButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { surveyResponseType, gender, age } from "~/types/survey.type";
import { ref, onMounted } from "vue";
import surveyData from "~/contents/survey.json";

const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
  console.log("Component is mounted");
});

const gender = useState<gender>("gender");
const age = useState<age>("age");

const responseScheme: any = {
  articles: {
    article_sellner: { softer: {}, verySoft: {} },
    article_stocker: { softer: {}, verySoft: {} },
    article_iran_saengerin: { softer: {}, verySoft: {} },
  },
  age: age.value,
  gender: gender.value,
};

let shuffledData = useNuxtApp().payload.data.shuffled;

if (shuffledData == undefined) {
  shuffledData = shuffleArray(surveyData);
  useNuxtApp().payload.data.shuffled = shuffledData;
}

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }

  return array;
}

const surveyResponse = useState<surveyResponseType>(
  "surveyResponse",
  (): surveyResponseType => responseScheme
);

const isValid = computed(() => {
  if (isMounted.value) {
    return checkValidity(false);
  }
  return false;
});

function checkValidity(showErrors: boolean) {
  const validity = {
    age: false,
    gender: false,
  };
  // validate age
  const ageInput = document.querySelector("input[name='age']");
  const ageError = useState("ageError");
  const ageErrorIcon = document.querySelector("[data-error-icon='age']");
  if (age.value === "" || age.value < 10 || age.value > 120) {
    if (showErrors) {
      ageInput?.classList.remove("input-info");
      ageInput?.classList.add("input-error");
      ageErrorIcon?.classList.remove("hidden");
      ageError.value = true;
    }
  } else {
    validity.age = true;
    ageInput?.classList.remove("input-error");
    ageInput?.classList.add("input-info");
    ageErrorIcon?.classList.add("hidden");
    ageError.value = false;
  }

  // validate gender
  const selectGender = document.querySelector("select[name='gender']");
  const genderErrorIcon = document.querySelector("[data-error-icon='gender']");
  const genderError = useState("genderError");
  if (gender.value === "") {
    if (showErrors) {
      selectGender?.classList.remove("select-info");
      selectGender?.classList.add("select-error");
      genderErrorIcon?.classList.remove("hidden");
      genderError.value = true;
    }
  } else {
    selectGender?.classList.add("select-info");
    selectGender?.classList.remove("select-error");
    genderErrorIcon?.classList.add("hidden");
    validity.gender = true;
    genderError.value = false;
  }

  // validate articles
  //   const articles = surveyResponse.value.articles;
  //   let articlesValid = true;
  //   for (let i = 0; i < articles.length; i++) {
  //     if (articles[i].selectedSummary === "") {
  //       if (showErrors) {
  //         const question = document.querySelector(`[data-question-id='${i}']`);
  //         question?.classList.add("form-error");
  //         const errorMsg = document.querySelector(
  //           `[data-question-id='${i}'].error-msg`
  //         );
  //         errorMsg?.classList.remove("hidden");
  //       }
  //       articlesValid = false;
  //     }
  //     if (articles[i].interest === -1) {
  //       articlesValid = false;
  //       // info: if selected is already shown for range
  //     }
  //   }

  //   if (articlesValid) {
  //     validity.articles = true;
  //   }

  const allValid = Object.values(validity).every((value) => value === true);

  return allValid;
}

const submitForm = () => {
  surveyResponse.value.age = age.value;
  surveyResponse.value.gender = gender.value;

  const submitValid = checkValidity(true);
  if (submitValid) {
    console.log("surveyResponse", surveyResponse.value);
    saveToDB();
  } else {
    console.error("errors occured");
  }
};

const saveToDB = async () => {
  const { data, error: fetchError } = await useFetch(
    "/api/saveSurveyResponse",
    {
      method: "POST",
      body: surveyResponse.value,
    }
  );
  if (data.value) {
    console.log("successful. redirect");
    navigateTo("./success");
  } else {
    console.error("Unsuccessful. Error:", fetchError.value);
  }
};
</script>
