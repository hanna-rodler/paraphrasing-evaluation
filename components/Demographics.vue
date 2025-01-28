<template>
  <div class="section">
    <AtomsHeadline level="h2">Demographische Daten</AtomsHeadline>
    <div class="flex flex-row space-x-8 justify-center">
      <div class="my-4">
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
      <div class="my-4">
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
    </div>
  </div>
</template>
<script setup lang="ts">
import type { gender, age } from "~/types/survey.type";
const gender = useState<gender>("gender", () => "");
const age = useState<age>("age", () => "");

const ageError = useState<boolean>("ageError", () => false);
const genderError = useState<boolean>("genderError", () => false);
</script>
