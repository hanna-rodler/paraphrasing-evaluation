<template>
  <div class="mt-4 mb-2">
    <div class="font-bold">Sprachintensität</div>
    <div
      class="flex justify-center items-center space-x-2 md:space-x-4 mt-2 px-2"
    >
      <span>zu hart</span>
      <button
        class="rating-btn"
        :class="{ 'border-black': selectedRating === -1 }"
        @click="setRating(-1)"
      >
        <img
          src="/public/images/rock.png"
          width="24px"
          height="24px"
          class="w-7 h-7 md:w-8 md:h-8"
        />
      </button>

      <button
        class="rating-btn"
        :class="{ 'border-black': selectedRating === 0 }"
        @click="setRating(0)"
      >
        <img
          src="/public/images/checked.png"
          width="24px"
          height="24px"
          class="w-6 h-6 md:w-7 md:h-7"
        />
      </button>

      <button
        class="rating-btn"
        :class="{ 'border-black': selectedRating === 1 }"
        @click="setRating(1)"
      >
        <img
          src="/public/images/ink-bottle.png"
          width="24px"
          height="24px"
          class="w-7 h-7 md:w-8 md:h-8"
        />
      </button>
      <span>zu sanft</span>

      <!-- <NuxtImg src="/images/rock.png" /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";
const props = defineProps({
  softerPromptNum: {
    type: String,
    required: false,
    default: undefined,
  },
  verySoftPromptNum: {
    type: String,
    required: false,
    default: undefined,
  },
  sentenceNum: {
    type: String,
    required: true,
  },
  articleId: {
    type: String,
    required: true,
  },
});

const surveyResponse = useState("surveyResponse");
const selectedRating = ref(null);

function setRating(rating: number) {
  selectedRating.value = rating;

  if (props.softerPromptNum) {
    surveyResponse.value.articles[props.articleId].softer ??= {};
    surveyResponse.value.articles[props.articleId].softer[
      `sentence__${props.sentenceNum}`
    ] ??= {};
    surveyResponse.value.articles[props.articleId].softer[
      `sentence__${props.sentenceNum}`
    ][`promptId__${props.softerPromptNum}`] ??= {};
    surveyResponse.value.articles[props.articleId].softer[
      `sentence__${props.sentenceNum}`
    ][`promptId__${props.softerPromptNum}`].langIntensity = rating;

    console.log("Softer prompt num:", rating);
    // Send rating to backend
  } else if (props.verySoftPromptNum) {
    surveyResponse.value.articles[props.articleId].verySoft ??= {};
    surveyResponse.value.articles[props.articleId].verySoft[
      `sentence__${props.sentenceNum}`
    ] ??= {};
    surveyResponse.value.articles[props.articleId].verySoft[
      `sentence__${props.sentenceNum}`
    ][`promptId__${props.verySoftPromptNum}`] ??= {};
    surveyResponse.value.articles[props.articleId].verySoft[
      `sentence__${props.sentenceNum}`
    ][`promptId__${props.verySoftPromptNum}`].langIntensity = rating;
    console.log("Very soft prompt num:", rating);
    // Send rating to backend
  }
  console.log(surveyResponse.value.articles[props.articleId]);
}
</script>
