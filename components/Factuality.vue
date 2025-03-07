<template>
  <div class="my-4">
    <div class="font-bold">Faktizität</div>
    <div class="flex items-center space-x-2 md:space-x-4 justify-center mt-2">
      <div class="flex space-x-2">
        <span>inkorrekt</span>
        <label
          v-for="(value, index) in [-1, -2, 1, 2]"
          :key="index"
          class="flex items-center space-x-4"
        >
          <input
            type="radio"
            :name="getRadioGroupName"
            :value="value"
            @click="setRating(value)"
            :checked="selectedRating === value"
            class="form-radio w-4 h-4 text-primary mx-1 md:mx-2"
          />
        </label>
      </div>
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

const getRadioGroupName = () => {
  if (props.softerPromptNum) {
    return `softer-${props.articleId}-${props.sentenceNum}-${props.softerPromptNum}`;
  } else if (props.verySoftPromptNum) {
    return `very-soft-${props.articleId}-${props.sentenceNum}-${props.verySoftPromptNum}`;
  }
};

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
    ][`promptId__${props.verySoftPromptNum}`].factuality = rating;
    console.log("Very soft prompt num:", rating);
    // Send rating to backend
  }
  console.log(surveyResponse.value.articles[props.articleId]);
}
</script>
