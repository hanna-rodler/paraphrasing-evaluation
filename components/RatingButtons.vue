<template>
  <div class="flex justify-center space-x-4 py-4 px-2">
    <!-- Button with Green Checkmark Emoji -->
    <button
      class="rating-btn"
      :class="{ 'border-2 border-black': selectedRating === 1 }"
      @click="setRating(1)"
    >
      ✔️
    </button>

    <!-- Button with "~" Emoji -->
    <button
      class="rating-btn"
      :class="{ 'border-2 border-black': selectedRating === 0 }"
      @click="setRating(0)"
    >
      <span class="font-bold">~</span>
    </button>

    <!-- Button with "X" Emoji -->
    <button
      class="rating-btn"
      :class="{ 'border-2 border-black': selectedRating === -1 }"
      @click="setRating(-1)"
    >
      ❌
    </button>
  </div>
</template>

<script setup lang="ts">
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
    ][`sentence-${props.sentenceNum}`] = rating;

    console.log("Softer prompt num:", rating);
    // Send rating to backend
  } else if (props.verySoftPromptNum) {
    surveyResponse.value.articles[props.articleId].softer ??= {};
    surveyResponse.value.articles[props.articleId].softer[
      `promptId-${props.verySoftPromptNum}`
    ] ??= {};
    surveyResponse.value.articles[props.articleId].softer[
      `promptId-${props.verySoftPromptNum}`
    ][`sentence-${props.sentenceNum}`] = rating;
    console.log("Very soft prompt num:", rating);
    // Send rating to backend
  }
  console.log(surveyResponse.value.articles[props.articleId]);
}
</script>
