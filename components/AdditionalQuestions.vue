<template>
  <div class="section flex justify-center mt-4 md:mt-8">
    <div class="max-w-4xl">
      <!-- Death and Injured numbers-->
      <div class="mb-6 md:mb-12 mt-4 md:mt-8">
        <div>
          Zahlen von Toten und Verletzten sollen in der
          <em>sanften Version</em> immer durch allgemeine Kategorisierungen
          ersetzt werden: *
        </div>
        <div
          class="flex items-center space-x-2 md:space-x-4 justify-center mt-1"
        >
          <span>Ich stimme gar nicht zu</span>
          <div class="flex space-x-2">
            <label
              v-for="(rating, index) in ratingOptions"
              :key="index"
              class="flex items-center space-x-4"
              id="softDeathInjNums"
            >
              <input
                type="radio"
                name="softDeathInjNums"
                for="softDeathInjNums"
                :value="rating.value"
                v-model="softDeathInjNums"
                class="form-radio cursor-pointer w-4 h-4 text-primary mx-1 md:mx-2"
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
      <div class="mb-6 md:mb-12">
        <div>
          Zahlen von Toten und Verletzten sollen in der
          <em>sehr sanften Version</em> immer durch allgemeine Kategorisierungen
          ersetzt werden: *
        </div>
        <div
          class="flex items-center space-x-2 md:space-x-4 justify-center mt-1"
        >
          <span>Ich stimme gar nicht zu</span>
          <div class="flex space-x-2">
            <label
              v-for="(rating, index) in ratingOptions"
              :key="index"
              class="flex items-center space-x-4"
              id="verySoftDeathInjNums"
            >
              <input
                type="radio"
                name="very soft death and injury numbers"
                for="verySoftDeathInjNums"
                :value="rating.value"
                v-model="verySoftDeathInjNums"
                class="form-radio cursor-pointer w-4 h-4 text-primary mx-1 md:mx-2"
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
      <!-- I would read -->
      <div class="mb-6 md:mb-12">
        <div>
          Ich kann mir vorstellen folgende Versionen zu lesen, sofern ich selbst
          immer einstellen kann, welche ich lese: TODO wording / hilfreich Ich
          kann mir vorstellen, dass folgende Versionen für mich in manchen
          Situationen
          <em>hilfreich</em> sein können: *
        </div>
        <div
          class="flex justify-center"
          v-for="version in versionOptions"
          :key="version.value"
        >
          <div class="w-36">
            <label
              class="label cursor-pointer justify-start px-0 flex items-center space-x-2"
            >
              <input
                type="checkbox"
                :name="`iWouldRead-${version.value}`"
                class="checkbox w-4 h-4 border-black rounded-sm"
                :value="version.value"
                v-model="iWouldRead"
              />
              <span>{{ version.label }}</span>
            </label>
          </div>
        </div>
        <div
          id="iWouldRead-error"
          v-if="iWouldReadError"
          class="text-error text-center mt-2 flex items-center justify-center"
          role="alert"
        >
          <Icon
            name="heroicons:exclamation-triangle"
            size="18"
            class="mr-2 text-error"
            id="iWouldRead-icon-error"
            data-error-icon="iWouldRead"
            aria-hidden="true"
          />
          <span>Bitte auswählen.</span>
        </div>
      </div>
      <!-- Clients would read-->
      <div class="mb-6 md:mb-12" v-if="showSocialWorkerQuestion">
        <div>
          Nach meiner Einschätzung könnten folgende Versionen für meine
          Klient*innen hilfreich sein: TODO *
        </div>
        <div
          class="flex justify-center"
          v-for="version in versionOptions"
          :key="version.value"
        >
          <div class="w-36">
            <label
              class="label cursor-pointer justify-start px-0 flex items-center space-x-2"
            >
              <input
                type="checkbox"
                class="checkbox w-4 h-4 border-black rounded-sm"
                :value="version.value"
                v-model="clientsWouldRead"
              />
              <span>{{ version.label }}</span>
            </label>
          </div>
        </div>
        <div
          id="clientsWouldRead-error"
          v-if="clientsWouldReadError"
          class="text-error text-center mt-2 flex items-center justify-center"
          role="alert"
        >
          <Icon
            name="heroicons:exclamation-triangle"
            size="18"
            class="mr-2 text-error"
            id="clientsWouldRead-icon-error"
            data-error-icon="clientsWouldRead"
            aria-hidden="true"
          />
          <span>Bitte auswählen.</span>
        </div>
      </div>
      <div class="mb-6 md:mb-12">
        <FeedbackTextbox />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { versions } from "~/types/survey.type";
const iWouldRead = useState<versions[]>("iWouldRead", () => []);
const clientsWouldRead = useState<versions[]>("clientsWouldRead", () => []);
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
const iWouldReadError = useState<boolean>("iWouldReadError", () => false);
const clientsWouldReadError = useState<boolean>(
  "clientsWouldReadError",
  () => false
);

const psychoSocialWorker = useState<boolean | null>("psychoSocialWorker");
const showSocialWorkerQuestion = computed(() => {
  console.log("show social worker", psychoSocialWorker.value);
  return psychoSocialWorker.value === true ? true : false;
});

const versionOptions = ref([
  { value: "original", label: "original" },
  { value: "softer", label: "sanfter" },
  { value: "verySoft", label: "sehr sanft" },
  { value: "iDontKnow", label: "ich weiß es nicht" },
]);

const ratingOptions = ref([
  { value: -2 },
  { value: -1 },
  { value: 1 },
  { value: 2 },
]);
</script>
