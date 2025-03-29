<template>
  <div class="section" id="demographics">
    <AtomsHeadline level="h2" class="text-bold"
      >Demographische Daten</AtomsHeadline
    >
    <div class="flex flex-col justify-center items-center my-2">
      <div class="md:max-w-2xl">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-4 w-2xs">
          <div class="my-2">
            <label
              class="form-control w-full max-w-xs mb-1 flex flex-row items-center"
              for="age"
            >
              <Icon
                name="heroicons:exclamation-triangle"
                size="18"
                class="mr-2 hidden"
                aria-label="Bitte ausfüllen"
                id="age-error"
                data-error-icon="age"
                aria-hidden="true"
              />
              <span id="age-label">Alter *</span>
            </label>
            <input
              type="number"
              id="age"
              name="age"
              v-model="age"
              min="10"
              max="100"
              class="rounded-md border border-black focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition shadow-sm py-2 px-4"
              ara-labelledby="age-label"
              aria-describedby="age-error"
              :aria-invalid="ageError"
            />
            <div id="age-error" v-if="ageError" class="text-error" role="alert">
              Bitte auswählen.
            </div>
          </div>
          <div class="my-2">
            <label
              class="form-control w-full max-w-xs mb-1 flex flex-row items-center"
              for="gender"
            >
              <Icon
                name="heroicons:exclamation-triangle"
                size="18"
                class="mr-2 hidden"
                data-error-icon="gender"
                aria-hidden="true"
              />
              <span id="gender-label">Geschlecht *</span>
            </label>
            <select
              class="rounded-md border border-black focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition shadow-sm py-2 px-4 bg-white"
              name="gender"
              id="gender"
              v-model="gender"
              aria-labelledby="gender-label"
              aria-describedby="gender-error"
              :aria-invalid="genderError"
            >
              <option value="female">weiblich</option>
              <option value="male">männlich</option>
              <option value="diverse">divers</option>
              <option value="no_indication">keine Angabe</option>
            </select>
            <div
              id="gender-error"
              v-if="genderError"
              class="text-error"
              role="alert"
            >
              Bitte auswählen.
            </div>
          </div>
          <div class="my-2">
            <label
              class="form-control w-full max-w-xs mb-1 flex flex-row items-center"
              for="country"
            >
              <Icon
                name="heroicons:exclamation-triangle"
                size="18"
                class="mr-2 hidden"
                data-error-icon="country"
                aria-hidden="true"
              />
              <span id="country-label">Land *</span>
            </label>
            <select
              class="rounded-md border border-black focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition shadow-sm py-2 px-4 bg-white"
              name="country"
              id="country"
              v-model="country"
              aria-labelledby="country-label"
              aria-describedby="country-error"
              :aria-invalid="countryError"
            >
              <option value="at">Österreich</option>
              <option value="de">Deutschland</option>
              <option value="ch">Schweiz</option>
            </select>
            <div
              id="country-error"
              v-if="countryError"
              class="text-error"
              role="alert"
            >
              Bitte auswählen.
            </div>
          </div>
          <div class="my-2">
            <label
              class="form-control w-full max-w-xs mb-1 flex flex-row items-center"
              for="federalState"
            >
              <Icon
                name="heroicons:exclamation-triangle"
                size="18"
                class="mr-2 hidden"
                aria-label="Bitte ausfüllen"
                id="federalState-error"
                data-error-icon="federalState"
                aria-hidden="true"
              />
              <span id="federalState-label">Bundesland *</span>
            </label>
            <input
              type="text"
              id="federalState"
              name="federalState"
              v-model="federalState"
              class="rounded-md border border-black focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition shadow-sm py-2 px-4 "
              ara-labelledby="federalState-label"
              aria-describedby="federalState-error"
              :aria-invalid="federalStateError"
            />
            <div
              id="federalState-error"
              v-if="federalStateError"
              class="text-error"
              role="alert"
            >
              Bitte angeben.
            </div>
          </div>
        </div>
        <div class="flex flex-col mb-4 mt-6">
          <div class="flex items-center flex-col md:flex-row">
            <div class="md:mr-4 flex flex-row items-center">
              <Icon
                name="heroicons:exclamation-triangle"
                size="18"
                class="mr-2 hidden"
                aria-label="Bitte ausfüllen"
                id="psychoSocialWorker-error"
                data-error-icon="psychoSocialWorker"
                aria-hidden="true"
              />
              <span>Arbeiten Sie im psychosozialen Bereich? *</span>
            </div>
            <div class="flex flex-row space-x-4">
              <label
                class="label cursor-pointer px-0 flex items-center space-x-4"
                id="psychoSocialWorker-yes"
              >
                <input
                  type="radio"
                  name="psychoSocialWorker"
                  for="psychoSocialWorker-yes"
                  :value="true"
                  v-model="psychoSocialWorker"
                  class="form-radio w-4 h-4 text-primary mx-1 md:mx-2 cursor-pointer"
                  ref="psychoSocialWorkerYes"
                />
                <span class="ml-0" style="margin-left: 0">ja</span>
              </label>
              <label
                class="label cursor-pointer justify-start px-0 flex items-center space-x-4"
                id="psychoSocialWorker-no"
              >
                <input
                  type="radio"
                  name="psychoSocialWorker"
                  for="psychoSocialWorker-no"
                  :value="false"
                  v-model="psychoSocialWorker"
                  class="form-radio w-4 h-4 text-primary mx-1 md:mx-2 cursor-pointer"
                />
                <span class="ml-0" style="margin-left: 0">nein</span>
              </label>
            </div>
          </div>
          <div
            id="psychoSocialWorker-error"
            v-if="psychoSocialWorkerError"
            class="text-error"
            role="alert"
          >
            Bitte auswählen.
          </div>
        </div>
        <div class="flex flex-col my-2" v-if="psychoSocialWorker">
            <div class="my-2">
              <label
                class="form-control w-full mb-1 flex flex-row items-center"
                for="profession"
              >
                <span id="profession-label">Beruf</span>
              </label>
              <input
                type="text"
                id="profession"
                name="profession"
                v-model="profession"
                class="rounded-md border border-black focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition shadow-sm p-2 w-full"
                ara-labelledby="profession-label"
              />
            </div>
          </div>
      </div
  </div>
  </div>
  </div>
</template>
<script setup lang="ts">
import type { gender, age, country } from "~/types/survey.type";
const gender = useState<gender>("gender", () => "");
const age = useState<age>("age", () => "");
const country = useState<country>("country", () => "");
const federalState = useState<string>("federalState", () => "");
const profession = useState<string>("profession", () => "");
// simple solution for FeedbackText.vue gets mounted without isProfessionalRemark when loading from localStorage.
const psychoSocialWorker = useState<boolean | null>(
  "psychoSocialWorker",
  () => true
);

const ageError = useState<boolean>("ageError", () => false);
const genderError = useState<boolean>("genderError", () => false);
const countryError = useState<boolean>("countryError", () => false);
const federalStateError = useState<boolean>("federalStateError", () => false);
const psychoSocialWorkerError = useState<boolean>(
  "psychoSocialWorkerError",
  () => false
);
</script>
