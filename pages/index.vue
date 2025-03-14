<template>
  <div class="w-11/12 my-4 md:my-8">
    <div class="fixed top-0 left-0 w-full h-4 bg-white shadow-lg">
      <div
        class="h-full bg-info transition-all duration-300"
        :style="{ width: progressPercentage + '%' }"
      ></div>
    </div>
    <div class="section flex flex-col justify-center items-center">
      <h1 class="font-bold text-2xl md:text-4xl">
        Nachrichten-Paraphrasierung
      </h1>
      <div class="subSection px-4 md:px-0">
        <AtomsText>
          Liebe Teilnehmenden,<br />
          im Jahr 2024 lag die Anzahl der Menschen die manchmal oder oft
          Nachrichten vermieden haben bei durchschnittlich 39 % in über 74
          Ländern. Das Gefühl von der Menge an Nachrichten überschöpft zu sein
          lag ebenfalls bei 39 %.<br />
          Im Rahmen einer Masterarbeit an der FH Hagenberg, geht es darum
          herauszufinden, inwiefern die Reduktion von Sprachintensität von
          politischen Nachrichten beeinflusst wie regelmäßig politische
          Nachrichten konsumiert werden und was für einen Einfluss dies auf eine
          mögliche Überforderung von Lesenden hat. Hierzu soll eine App
          entwickelt werden, die es den Lesenden je nach Stimmungslage und
          Kapazitäten ermöglicht eine sanftere Version oder das Original zu
          lesen.
        </AtomsText>
        <AtomsText>
          Um im ersten Schritt zu untersuchen, wie die Sprachintensität
          wahrgenommen wird, werden Ihnen politische Nachrichtenartikel von der
          ORF Website in einer umformulierten Version präsentiert. Sie sehen
          zuerst den gesamten Nachrichtenartikel als Kontext und bekommen dann
          pro Satz mehrere Versionen zum Bewerten angezeigt. Sie müssen das
          Original nicht jedes Mal erneut lesen. Veränderte Satzteile sind für
          den vereinfachten Vergleich markiert. Wenn ein neuer Satz kommt, ist
          dies gekennzeichnet. Bitte bewerten Sie zu jeder Version die
          Sprachintensität und wie faktisch korrekt die Version im Vergleich zum
          Original ist.
        </AtomsText>
        <AtomsText>
          Die Teilnahme an dieser Studie dauert [] min. Die Daten sind anonym
          und werden nur im Rahmen der Masterarbeit verwendet. Ein Rückschluss
          auf Ihre Person ist nicht möglich.<br />
          Bei Fragen oder Anregungen können Sie Hanna Rodler unter
          <a href="mailto:s2310629019@fhooe.at">s2310629019[at]fhooe.at</a>
          kontaktieren.
        </AtomsText>
        <AtomsText>Vielen Dank für die Teilnahme an der Studie!</AtomsText>
      </div>
    </div>
    <Demographics></Demographics>
    <SelfAssessment></SelfAssessment>
    <div v-for="(article, index) of shuffledData" v-bind:key="article.id">
      <Comparison :article="article" :index="index"></Comparison>
    </div>

    <AdditionalQuestions></AdditionalQuestions>

    <div class="section">
      <div
        v-if="!isValid"
        class="text-error text-center"
        id="form-error-msg"
        role="alert"
      >
        Bitte füllen Sie alle allgemeinen Pflichtfragen aus.
      </div>
      <div
        v-if="showArticleError"
        role="alert"
        id="articles-error-msg"
        class="text-error text-center"
      >
        Bitte bewerten Sie mindestens 15 Versionen.
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
import type {
  age,
  country,
  gender,
  surveyResponseType,
  versions,
} from "~/types/survey.type";
import { ref, onMounted } from "vue";
import surveyData from "~/contents/shortened-one-version-survey.json";
import { countValidArticles } from "~/utils/validation";

const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
});

const gender = useState<gender>("gender");
const age = useState<age>("age");
const country = useState<country>("country");
const federalState = useState<string>("federalState");
const iWouldRead = useState<versions[] | null[]>("iWouldRead");
const clientsWouldRead = useState<versions[] | null[]>("clientsWouldRead");
const verySoftDeathInjNums = useState<number | null>("verySoftDeathInjNums");
const softDeathInjNums = useState<number | null>("softDeathInjNums");
const psychoSocialWorker = useState<boolean | null>("psychoSocialWorker");
const generalRemark = useState<string>("generalRemark");
const showArticleError = ref(false);
const totalQuestionLength = ref<number>(102); // 5+ 3+ 40 TODO: adapt
let answeredQuestionCount = ref<number>(0);
let prevArticlesValidCount = 0;
const progressPercentage = computed(() => {
  console.log(
    "answeredQuestionCount",
    answeredQuestionCount.value,
    "total",
    totalQuestionLength.value,
    answeredQuestionCount.value / totalQuestionLength.value
  );
  return (answeredQuestionCount.value / totalQuestionLength.value) * 100;
});

const responseScheme: surveyResponseType = {
  articles: {
    article_sellner: { softer: {}, verySoft: {}, remark: "" },
    article_stocker: { softer: {}, verySoft: {}, remark: "" },
    article_iran_saengerin: { softer: {}, verySoft: {}, remark: "" },
    article_trump_grenell: { softer: {}, verySoft: {}, remark: "" },
    article_sanctions_russia: { softer: {}, verySoft: {}, remark: "" },
    article_tote_gaza: { softer: {}, verySoft: {}, remark: "" },
  },
  age: age.value,
  gender: gender.value,
  country: country.value,
  federalState: federalState.value,
  iWouldRead: iWouldRead.value,
  clientsWouldRead: clientsWouldRead.value,
  verySoftDeathInjNums: verySoftDeathInjNums.value,
  softDeathInjNums: softDeathInjNums.value,
  psychoSocialWorker: psychoSocialWorker.value,
  generalRemark: generalRemark.value,
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

const validity = {
  age: false,
  gender: false,
  federalState: false,
  country: false,
  psychoSocialWorker: false,
  softDeathInjNums: false,
  verySoftDeathInjNums: false,
  iWouldRead: false,
  clientsWouldRead: false,
  articles: false,
};

function checkValidity(showErrors: boolean) {
  let gotUpdated = false;

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
    if (validity.age) {
      validity.age = false;
      gotUpdated = true;
    }
  } else {
    if (!validity.age) {
      validity.age = true;
      ageInput?.classList.remove("input-error");
      ageInput?.classList.add("input-info");
      ageErrorIcon?.classList.add("hidden");
      ageError.value = false;
      gotUpdated = true;
    }
  }

  // validate gender
  if (!validity.gender) {
    const selectGender = document.querySelector("select[name='gender']");
    const genderErrorIcon = document.querySelector(
      "[data-error-icon='gender']"
    );
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
      gotUpdated = true;
    }
  }

  // valid country
  if (!validity.country) {
    const countryInput = document.querySelector("input[name='country']");
    const countryError = useState("countryError");
    const countryErrorIcon = document.querySelector(
      "[data-error-icon='country']"
    );
    if (country.value === "") {
      if (showErrors) {
        countryInput?.classList.remove("input-info");
        countryInput?.classList.add("input-error");
        countryErrorIcon?.classList.remove("hidden");
        countryError.value = true;
      }
    } else {
      validity.country = true;
      countryInput?.classList.remove("input-error");
      countryInput?.classList.add("input-info");
      countryErrorIcon?.classList.add("hidden");
      countryError.value = false;
      gotUpdated = true;
    }
  }

  // valid federal State
  const federalStateInput = document.querySelector(
    "input[name='federalState']"
  );
  const federalStateError = useState("federalStateError");
  const federalStateErrorIcon = document.querySelector(
    "[data-error-icon='federalState']"
  );
  if (federalState.value === "") {
    if (showErrors) {
      federalStateInput?.classList.remove("input-info");
      federalStateInput?.classList.add("input-error");
      federalStateErrorIcon?.classList.remove("hidden");
      federalStateError.value = true;
    }
    if (validity.federalState) {
      validity.federalState = false;
      gotUpdated = true;
    }
  } else {
    if (!validity.federalState) {
      validity.federalState = true;
      federalStateInput?.classList.remove("input-error");
      federalStateInput?.classList.add("input-info");
      federalStateErrorIcon?.classList.add("hidden");
      federalStateError.value = false;
      gotUpdated = true;
    }
  }

  // valid psychoSocialWorker
  if (!validity.psychoSocialWorker) {
    const psychoSocialWorkerInput = document.querySelector(
      "input[name='psychoSocialWorker']"
    );
    const psychoSocialWorkerError = useState("psychoSocialWorkerError");
    const psychoSocialWorkerErrorIcon = document.querySelector(
      "[data-error-icon='psychoSocialWorker']"
    );
    if (psychoSocialWorker.value === null) {
      if (showErrors) {
        psychoSocialWorkerInput?.classList.remove("input-info");
        psychoSocialWorkerInput?.classList.add("input-error");
        psychoSocialWorkerErrorIcon?.classList.remove("hidden");
        psychoSocialWorkerError.value = true;
      }
    } else {
      if (!validity.psychoSocialWorker) {
        validity.psychoSocialWorker = true;
        psychoSocialWorkerInput?.classList.remove("input-error");
        psychoSocialWorkerInput?.classList.add("input-info");
        psychoSocialWorkerErrorIcon?.classList.add("hidden");
        psychoSocialWorkerError.value = false;
        gotUpdated = true;
      }
    }
  }

  // valid softDeathInjNums
  if (!validity.softDeathInjNums) {
    const softDeathInjNumsError = useState("softDeathInjNumsError");

    if (softDeathInjNums.value === null) {
      if (showErrors) {
        softDeathInjNumsError.value = true;
      }
    } else {
      validity.softDeathInjNums = true;
      softDeathInjNumsError.value = false;
      gotUpdated = true;
    }
  }

  // valid verySoftDeathInjNums
  if (!validity.verySoftDeathInjNums) {
    const verySoftDeathInjNumsError = useState("verySoftDeathInjNumsError");
    if (verySoftDeathInjNums.value === null) {
      if (showErrors) {
        verySoftDeathInjNumsError.value = true;
      }
    } else {
      validity.verySoftDeathInjNums = true;
      verySoftDeathInjNumsError.value = false;
      gotUpdated = true;
    }
  }

  // valid verySoftDeathInjNums
  const iWouldReadError = useState("iWouldReadError");
  if (iWouldRead.value.length === 0) {
    if (showErrors) {
      iWouldReadError.value = true;
    }
    if (validity.iWouldRead) {
      validity.iWouldRead = false;
      gotUpdated = true;
    }
  } else {
    if (!validity.iWouldRead) {
      validity.iWouldRead = true;
      gotUpdated = true;
    }
    iWouldReadError.value = false;
  }

  // validity clientsWouldRead
  const clientsWouldReadError = useState("clientsWouldReadError");
  if (
    psychoSocialWorker.value === true &&
    clientsWouldRead.value.length === 0
  ) {
    if (showErrors) {
      clientsWouldReadError.value = true;
    }
    if (validity.clientsWouldRead === true) {
      validity.clientsWouldRead = false;
      gotUpdated = true;
    }
  } else {
    if (validity.clientsWouldRead === false) {
      validity.clientsWouldRead = true;
      clientsWouldReadError.value = false;
      gotUpdated = true;
    }
  }

  // at least 15 sentences have a factuality and langIntensity
  let articlesValidCount = countValidArticles(surveyResponse.value.articles);
  // iterate through object
  if (articlesValidCount >= 15) {
    validity.articles = true;
    showArticleError.value = false;
  } else {
    validity.articles = false;
    showArticleError.value = true;
  }
  if (prevArticlesValidCount !== articlesValidCount) {
    prevArticlesValidCount = articlesValidCount;
    gotUpdated = true;
  }

  console.log("updated ", gotUpdated);

  if (gotUpdated) {
    // filter answeredQuestionCount by true
    answeredQuestionCount.value =
      Object.values(validity).filter((value) => value === true).length +
      articlesValidCount;
    if (
      psychoSocialWorker.value === false ||
      psychoSocialWorker.value === null
    ) {
      answeredQuestionCount.value = answeredQuestionCount.value - 1;
    }
    console.log("func answeredQuestionCount", answeredQuestionCount.value);
  }

  const allValid = Object.values(validity).every((value) => value === true);

  return allValid;
}

const submitForm = () => {
  surveyResponse.value.age = age.value;
  surveyResponse.value.gender = gender.value;
  surveyResponse.value.country = country.value;
  surveyResponse.value.federalState = federalState.value;
  surveyResponse.value.iWouldRead = iWouldRead.value;
  surveyResponse.value.clientsWouldRead = clientsWouldRead.value;
  surveyResponse.value.verySoftDeathInjNums = verySoftDeathInjNums.value;
  surveyResponse.value.softDeathInjNums = softDeathInjNums.value;
  surveyResponse.value.psychoSocialWorker = psychoSocialWorker.value;
  surveyResponse.value.generalRemark = generalRemark.value;
  console.log("clientsWouldRead", clientsWouldRead.value);
  console.log("psychoSocialWorker", psychoSocialWorker.value);

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
