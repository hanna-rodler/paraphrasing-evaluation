<template>
  <div class="my-4">
    <div class="font-bold">Faktencheck im Vergleich zum Original</div>
    <div
      class="flex space-x-2 md:space-x-4 mt-2 md:mt-3 items-center justify-center"
    >
      <span>inkorrekt</span>
      <label
        v-for="(value, index) in [-2, -1, 1, 2]"
        :key="index"
        class="flex items-center space-x-4"
      >
        <input
          type="radio"
          :name="`factuality-${props.articleId}-${props.sentenceNum}-${props.softerPromptNum}-${props.verySoftPromptNum}`"
          :value="value"
          @click="setRating(value)"
          :checked="selectedRating === value"
          class="form-radio w-4 h-4 text-primary mx-1 md:mx-2 cursor-pointer"
        />
      </label>
      <span>korrekt</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";
import type { surveyResponseType } from "~/types/survey.type";

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

const surveyResponse = useState<surveyResponseType>("surveyResponse");

const selectedRating = ref<null | number>(null);

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
    ][`promptId__${props.softerPromptNum}`].factuality = rating;

    // Send rating to backend
  }
  if (props.verySoftPromptNum) {
    surveyResponse.value.articles[props.articleId].verySoft ??= {};
    surveyResponse.value.articles[props.articleId].verySoft[
      `sentence__${props.sentenceNum}`
    ] ??= {};
    surveyResponse.value.articles[props.articleId].verySoft[
      `sentence__${props.sentenceNum}`
    ][`promptId__${props.verySoftPromptNum}`] ??= {};
    surveyResponse.value.articles[props.articleId].verySoft[
      `sentence__${props.sentenceNum}`
    ][`promptId__${props.verySoftPromptNum}`].factuality = rating;
    // Send rating to backend
  }
}
</script>
