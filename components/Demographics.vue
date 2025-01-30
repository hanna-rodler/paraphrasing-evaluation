<template>
  <div class="section">
    <AtomsHeadline level="h2" class="text-bold"
      >Demographische Daten</AtomsHeadline
    >
    <div class="flex flex-col items-center my-2">
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
            class="rounded-md border border-black focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition shadow-sm py-2 px-4"
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
            class="rounded-md border border-black focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition shadow-sm py-2 px-4"
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
            class="rounded-md border border-black focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition shadow-sm py-2 px-4"
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
            Bitte auswählen.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { gender, age } from "~/types/survey.type";
const gender = useState<gender>("gender", () => "");
const age = useState<age>("age", () => "");
const country = useState<gender>("country", () => "");
const federalState = useState<age>("federalState", () => "");

const ageError = useState<boolean>("ageError", () => false);
const genderError = useState<boolean>("genderError", () => false);
const countryError = useState<boolean>("countryError", () => false);
const federalStateError = useState<boolean>("federalStateError", () => false);
</script>
