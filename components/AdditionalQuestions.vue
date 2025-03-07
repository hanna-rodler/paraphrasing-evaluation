<template>
  <div class="section flex justify-center mt-4 md:mt-8">
    <div class="max-w-4xl">
      <!-- Death and Injured numbers-->
      <div class="mt-2 mb-6 md:mb-12">
        Zahlen von Toten und Verletzten sollen in der
        <em>sanften Version</em> immer durch allgemeine Kategorisierungen
        ersetzt werden:
        <br />
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
                name="soft death and injury numbers"
                for="softDeathInjNums"
                :value="rating.value"
                v-model="softDeathInjNums"
                class="form-radio w-4 h-4 text-primary mx-1 md:mx-2"
              />
            </label>
          </div>
          <span>Ich stimme sehr zu</span>
        </div>
      </div>
      <div class="mb-6 md:mb-12">
        Zahlen von Toten und Verletzten sollen in der
        <em>sehr sanften Version</em> immer durch allgemeine Kategorisierungen
        ersetzt werden:
        <br />
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
                class="form-radio w-4 h-4 text-primary mx-1 md:mx-2"
              />
            </label>
          </div>
          <span>Ich stimme sehr zu</span>
        </div>
      </div>
      <!-- I would read -->
      <div class="mb-6 md:mb-12">
        <div>
          Ich kann mir vorstellen folgende Versionen zu lesen, sofern ich selbst
          immer einstellen kann, welche ich lese: TODO wording / hilfreich Ich
          kann mir vorstellen, dass folgende Versionen für mich in manchen
          Situationen
          <em>hilfreich</em> sein können:
        </div>
        <div
          class="flex justify-center"
          v-for="version in versionOptions"
          :key="version.value"
        >
          <div class="w-24">
            <label
              class="label cursor-pointer justify-start px-0 flex items-center space-x-2"
            >
              <input
                type="checkbox"
                class="checkbox w-4 h-4 border-black rounded-sm"
                :value="version.value"
                v-model="iWouldRead"
              />
              <span>{{ version.label }}</span>
            </label>
          </div>
        </div>
      </div>
      <div
        class="mb-6 md:mb-12"
        v-if="psychoSocialWorker && psychoSocialWorker === true"
      >
        Meine Klient*innen... TODO
      </div>
      <!-- Clients would read-->
      <div class="mb-6 md:mb-12">
        Nach meiner Einschätzung könnten folgende Versionen für meine
        Klient*innen hilfreich sein:
        <div
          class="flex justify-center"
          v-for="version in versionOptions"
          :key="version.value"
        >
          <div class="w-24">
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
      </div>
      <div class="mb-6 md:mb-12">
        <FeedbackTextbox />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { versions } from "~/types/survey.type";
const iWouldRead = useState<versions[] | null[]>("iWouldRead", () => []);
const clientsWouldRead = useState<versions[] | null[]>(
  "clientsWouldRead",
  () => []
);
const verySoftDeathInjNums = useState<number>("verySoftDeathInjNums", () => 0);
const softDeathInjNums = useState<number | null>(
  "softDeathInjNums",
  () => null
);
const psychoSocialWorker = useState<boolean | null>("psychoSocialWorker");

const versionOptions = ref([
  { value: "original", label: "original" },
  { value: "softer", label: "sanfter" },
  { value: "verySoft", label: "sehr sanft" },
]);

const ratingOptions = ref([
  { value: -2 },
  { value: -1 },
  { value: 1 },
  { value: 2 },
]);
</script>
