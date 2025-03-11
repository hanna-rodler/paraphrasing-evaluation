<template>
  <div class="section">
    <AtomsHeadline level="h2" class="text-bold">
      Selbsteinschätzung
    </AtomsHeadline>
    <div class="flex justify-center my-4">
      <div class="subSection px-4 md:px-0">
        <div class="mb-10 mt-4">
          Bitte geben Sie im folgenden Abschnitt Ihre Selbsteinschätzung ehrlich
          an. Es gibt kein richtig oder falsch.
        </div>
        <!-- P.N. beunruhigen -->
        <div class="mt-4 mb-12 sm:mb-8">
          <div class="mb-2 sm:mb-1">
            Mich beunruhigen politische Nachrichten oft noch Stunden nachdem ich
            diese gelesen habe. *
          </div>
          <div class="radioScaleContainer">
            <span>trifft gar nicht zu</span>
            <div class="radioScaleLabelContainer">
              <label
                v-for="(rating, index) in ratingOptions"
                :key="index"
                class="radioScaleLabel"
                id="newsWorry"
              >
                <input
                  type="radio"
                  name="newsWorry"
                  for="newsWorry"
                  :value="rating.value"
                  v-model="newsWorry"
                  class="radioScaleInput"
                />
              </label>
            </div>
            <span>trifft voll und ganz zu</span>
          </div>

          <div
            id="newsWorry-error"
            v-if="newsWorryError"
            class="text-error text-center mt-2 flex items-center justify-center"
            role="alert"
          >
            <Icon
              name="heroicons:exclamation-triangle"
              size="18"
              class="mr-2 text-error"
              id="newsWorry-icon-error"
              data-error-icon="newsWorry"
              aria-hidden="true"
            />
            Bitte auswählen.
          </div>
        </div>

        <!-- Wortwahl bemerke Unterschiede -->
        <div class="my-12 sm:my-8">
          <div class="mb-2 sm:mb-1">
            Ich bemerke oft subtile Unterschiede in Wortwahl und Formulierungen.
            *
          </div>
          <div class="radioScaleContainer">
            <span>trifft gar nicht zu</span>
            <div class="radioScaleLabelContainer">
              <label
                v-for="(rating, index) in ratingOptions"
                :key="index"
                class="radioScaleLabel"
                id="langHighSensitivity"
              >
                <input
                  type="radio"
                  name="langHighSensitivity"
                  for="langHighSensitivity"
                  :value="rating.value"
                  v-model="langHighSensitivity"
                  class="radioScaleInput"
                />
              </label>
            </div>
            <span>trifft voll und ganz zu</span>
          </div>
          <div
            id="langHighSensitivity-error"
            v-if="langHighSensitivityError"
            class="text-error text-center mt-2 flex items-center justify-center"
            role="alert"
          >
            <Icon
              name="heroicons:exclamation-triangle"
              size="18"
              class="mr-2 text-error"
              id="langHighSensitivity-icon-error"
              data-error-icon="langHighSensitivity"
              aria-hidden="true"
            />
            Bitte auswählen.
          </div>
        </div>
        <!-- P.N. abrenzen -->
        <div class="my-12 sm:my-8">
          <div class="mb-2 sm:mb-1">
            Ich kann mich emotional rasch von politischen Nachrichten abgrenzen.
            *
          </div>
          <div class="radioScaleContainer">
            <span>trifft gar nicht zu</span>
            <div class="radioScaleLabelContainer">
              <label
                v-for="(rating, index) in ratingOptions"
                :key="index"
                class="radioScaleLabel"
                id="newsBoundaries"
              >
                <input
                  type="radio"
                  name="newsBoundaries"
                  for="newsBoundaries"
                  :value="rating.value"
                  v-model="newsBoundaries"
                  class="radioScaleInput"
                />
              </label>
            </div>
            <span>trifft voll und ganz zu</span>
          </div>
          <div
            id="newsBoundaries-error"
            v-if="newsBoundariesError"
            class="text-error text-center mt-2 flex items-center justify-center"
            role="alert"
          >
            <Icon
              name="heroicons:exclamation-triangle"
              size="18"
              class="mr-2 text-error"
              id="newsBoundaries-icon-error"
              data-error-icon="newsBoundaries"
              aria-hidden="true"
            />
            Bitte auswählen.
          </div>
        </div>
        <!-- Wortwahl wenig sensibel -->
        <div class="my-12 sm:my-8">
          <div class="mb-2 sm:mb-1">
            Ich bin wenig sensibel für sprachliche Details *
          </div>
          <div class="radioScaleContainer">
            <span>trifft gar nicht zu</span>
            <div class="radioScaleLabelContainer">
              <label
                v-for="(rating, index) in ratingOptions"
                :key="index"
                class="radioScaleLabel"
                id="langLowSensitivity"
              >
                <input
                  type="radio"
                  name="langLowSensitivity"
                  for="langLowSensitivity"
                  :value="rating.value"
                  v-model="langLowSensitivity"
                  class="radioScaleInput"
                />
              </label>
            </div>
            <span>trifft voll und ganz zu</span>
          </div>
          <div
            id="langLowSensitivity-error"
            v-if="langLowSensitivityError"
            class="text-error text-center mt-2 flex items-center justify-center"
            role="alert"
          >
            <Icon
              name="heroicons:exclamation-triangle"
              size="18"
              class="mr-2 text-error"
              id="langLowSensitivity-icon-error"
              data-error-icon="langLowSensitivity"
              aria-hidden="true"
            />
            Bitte auswählen.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const langLowSensitivity = useState<number | null>(
  "langLowSensitivity",
  () => null
);
const langHighSensitivity = useState<number | null>(
  "langHighSensitivity",
  () => null
);
const newsBoundaries = useState<number | null>("newsBoundaries", () => null);
const newsWorry = useState<number | null>("newsWorry", () => null);

// Error States
const langLowSensitivityError = useState<boolean>(
  "langLowSensitivityError",
  () => false
);
const newsBoundariesError = useState<boolean>(
  "newsBoundariesError",
  () => false
);
const langHighSensitivityError = useState<boolean>(
  "langHighSensitivityError",
  () => false
);
const newsWorryError = useState<boolean>("newsWorryError", () => false);

const ratingOptions = ref([
  { value: -2 },
  { value: -1 },
  { value: 0 },
  { value: 1 },
  { value: 2 },
]);
</script>
