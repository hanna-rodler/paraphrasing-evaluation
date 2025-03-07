<template>
  <div class="w-11/12 my-4 md:my-8">
    <div class="section flex flex-col justify-center items-center">
      <h1 class="font-bold text-2xl md:text-4xl">
        Nachrichten-Paraphrasierung
      </h1>
      <div class="md:max-w-2xl px-4 md:px-0">
        <AtomsText>
          Liebe Teilnehmenden,<br />
          im Jahr 2024 lag die Anzahl der Menschen die manchmal oder oft
          Nachrichten vermieden haben bei durchschnittlich 39% in über 74
          Ländern. Das Gefühl von der Menge an Nachrichten überschöpft zu sein
          lag ebenfalls bei 39%.<br />
          Im Rahmen einer Masterarbeit an der FH Hagenberg, geht es darum
          herauszufinden, inwiefern die Reduktion von Sprachintensität von
          politischen Nachrichten beeinflusst wie regelmäßig politische
          Nachrichten konsumiert werden und was für einen Einfluss dies auf eine
          mögliche Überforderung von Lesenden hat.
        </AtomsText>
        <AtomsText>
          Um zu untersuchen, wie die Sprachintensität wahrgenommen wird, werden
          Ihnen politische Nachrichtenartikel von der ORF Website in
          unterschiedlichen Sprachintensitäten präsentiert. Sie sehen einmal den
          gesamten Nachrichtenartikel als Kontext und bekommen dann Sätze daraus
          in einer sanften und sehr sanften Version präsentiert. Um Ihnen den
          Vergleich einfacher zu machen, sind veränderte Satzteile markiert. Sie
          können zu jeder Version die Faktizität von korrekt bis inkorrekt und
          die Sprachintensität von zu hart bis zu sanft bewerten. Teils sehen
          Sie auch denselben Satz in der umgeschriebenen Version noch einmal, um
          bei gewissen Formulierungen zu bewerten, ob solche Phrasen überhaupt
          umgeschrieben werden sollen.
        </AtomsText>
        <AtomsText>
          Die Teilnahme an dieser Studie dauert [] min. Die Daten sind anonym
          und werden nur im Rahmen der Masterarbeit verwendet. Ein Rückschluss
          auf Ihre Person ist nicht möglich.<br />
          Bei Fragen oder Anregungen können Sie Hanna Rodler unter
          <a href="mailto:s2310629019@fhooe.at">s2310629019@fhooe.at</a>
          kontaktieren.
        </AtomsText>
        <AtomsText>Vielen Dank für die Teilnahme an der Studie!</AtomsText>
      </div>
    </div>
    <Demographics></Demographics>
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
import type {
  age,
  country,
  gender,
  surveyResponseType,
  versions,
} from "~/types/survey.type";
import { ref, onMounted } from "vue";
import surveyData from "~/contents/survey.json";

const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
  console.log("Component is mounted");
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
  console.log("generalRemark", generalRemark.value);

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
