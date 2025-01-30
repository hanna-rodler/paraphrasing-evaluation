<template>
  <div class="my-4">
    <div class="font-bold">Faktizität</div>
    <div class="flex items-center space-x-2 md:space-x-4 justify-center mt-2">
      <span>Korrekt</span>
      <div class="flex space-x-2">
        <label
          v-for="(value, index) in [2, 1, -1, -2]"
          :key="index"
          class="flex items-center space-x-4"
        >
          <input
            type="radio"
            name="rating"
            :value="value"
            @change="setRating(value)"
            class="form-radio w-4 h-4 text-primary mx-1 md:mx-2"
          />
        </label>
      </div>
      <span>Inkorrekt</span>
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

function setRating(rating: Number) {
  selectedRating.value = rating;

  if (props.softerPromptNum) {
    surveyResponse.value.articles[props.articleId].softer ??= {};
    surveyResponse.value.articles[props.articleId].softer[
      `promptId-${props.softerPromptNum}`
    ] ??= {};
    surveyResponse.value.articles[props.articleId].softer[
      `promptId-${props.softerPromptNum}`
    ][`sentence-${props.sentenceNum}`] ??= {};
    surveyResponse.value.articles[props.articleId].softer[
      `promptId-${props.softerPromptNum}`
    ][`sentence-${props.sentenceNum}`].factuality = rating;

    console.log("Softer prompt num:", rating);
    // Send rating to backend
  } else if (props.verySoftPromptNum) {
    surveyResponse.value.articles[props.articleId].verySoft ??= {};
    surveyResponse.value.articles[props.articleId].verySoft[
      `promptId-${props.verySoftPromptNum}`
    ] ??= {};
    surveyResponse.value.articles[props.articleId].verySoft[
      `promptId-${props.verySoftPromptNum}`
    ][`sentence-${props.sentenceNum}`] ??= {};
    surveyResponse.value.articles[props.articleId].verySoft[
      `promptId-${props.verySoftPromptNum}`
    ][`sentence-${props.sentenceNum}`].factuality = rating;
    console.log("Very soft prompt num:", rating);
    // Send rating to backend
  }
  console.log(surveyResponse.value.articles[props.articleId]);
}
</script>
