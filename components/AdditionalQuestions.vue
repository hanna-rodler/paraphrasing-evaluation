<template>
  <div
    class="section flex justify-center mt-4 md:mt-8"
    id="additionalQuestions"
  >
    <div class="subSection mx-4 md:mx-0">
      <AtomsHeadline level="h2" class="text-bold">Abschluss</AtomsHeadline>
      <div class="mb-12 mt-4 md:mt-8 text-bold">
        Angenommen Sie können zwischen verschiedenen Versionen je nach Ihrer
        Stimmungslage und Kapazitäten wählen, wie bewerten Sie Folgendes?
      </div>
      <!-- Death and Injured numbers-->
      <div class="mb-12">
        <div>
          Zahlen von Toten und Verletzten sollen in der
          <em><span class="underline">etwas</span> sanfteren Version</em> immer
          durch allgemeine Kategorisierungen wie "ein paar", "mehrere" oder
          "viele" ersetzt werden: *
        </div>
        <div class="radioScaleContainer">
          <span>Ich stimme gar nicht zu</span>
          <div class="radioScaleLabelContainer">
            <label
              v-for="(rating, index) in ratingOptions"
              :key="index"
              class="radioScaleLabel"
              id="softDeathInjNums"
            >
              <input
                type="radio"
                name="softDeathInjNums"
                for="softDeathInjNums"
                :value="rating.value"
                v-model="softDeathInjNums"
                class="radioScaleInput"
              />
            </label>
          </div>
          <span>Ich stimme sehr zu</span>
        </div>
        <div
          id="softDeathInjNums-error"
          v-if="softDeathInjNumsError"
          class="text-error text-center mt-2 flex items-center justify-center"
          role="alert"
        >
          <Icon
            name="heroicons:exclamation-triangle"
            size="18"
            class="mr-2 text-error"
            id="softDeathInjNums-icon-error"
            data-error-icon="softDeathInjNums"
            aria-hidden="true"
          />
          Bitte auswählen.
        </div>
      </div>
      <div class="mb-12">
        <div>
          Zahlen von Toten und Verletzten sollen in der
          <em><span class="underline">sehr</span> sanften Version</em> immer
          durch allgemeine Kategorisierungen ersetzt werden: *
        </div>
        <div class="radioScaleContainer">
          <span>Ich stimme gar nicht zu</span>
          <div class="radioScaleLabelContainer">
            <label
              v-for="(rating, index) in ratingOptions"
              :key="index"
              class="radioScaleLabel"
              id="verySoftDeathInjNums"
            >
              <input
                type="radio"
                name="very soft death and injury numbers"
                for="verySoftDeathInjNums"
                :value="rating.value"
                v-model="verySoftDeathInjNums"
                class="radioScaleInput"
              />
            </label>
          </div>
          <span>Ich stimme sehr zu</span>
        </div>
        <div
          id="verySoftDeathInjNums-error"
          v-if="verySoftDeathInjNumsError"
          class="text-error text-center mt-2 flex items-center justify-center"
          role="alert"
        >
          <Icon
            name="heroicons:exclamation-triangle"
            size="18"
            class="mr-2 text-error"
            id="verySoftDeathInjNums-icon-error"
            data-error-icon="verySoftDeathInjNums"
            aria-hidden="true"
          />
          Bitte auswählen.
        </div>
      </div>
      <div class="mb-6 md:mb-12">
        <FeedbackTextbox
          v-if="psychoSocialWorker"
          :isProfessionalRemark="true"
        />
        <FeedbackTextbox class="mt-8" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const verySoftDeathInjNums = useState<number | null>(
  "verySoftDeathInjNums",
  () => null
);
const softDeathInjNums = useState<number | null>(
  "softDeathInjNums",
  () => null
);

// Error States
const softDeathInjNumsError = useState<boolean>(
  "softDeathInjNumsError",
  () => false
);
const verySoftDeathInjNumsError = useState<boolean>(
  "verySoftDeathInjNumsError",
  () => false
);
const psychoSocialWorker = useState<boolean | null>("psychoSocialWorker");

const ratingOptions = ref([
  { value: -2 },
  { value: -1 },
  { value: 1 },
  { value: 2 },
]);
</script>
