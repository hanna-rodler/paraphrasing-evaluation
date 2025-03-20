<template>
  <div class="mt-4 mb-2">
    <div class="font-bold">Sprachintensität im Vergleich zum Original</div>
    <div
      class="flex w-full space-x-1 xs:space-x-2 mt-3 justify-between xs:justify-center items-center"
    >
      <span>sehr hart</span>
      <label
        v-for="(value, index) in [-2, -1, 0, 1, 2]"
        :key="index"
        class="flex items-center space-x-1 md:space-x-4"
      >
        <input
          type="radio"
          :name="`langIntensity-${articleId}-${sentenceNum}-${promptId}`"
          :value="value"
          @click="setRating(value)"
          :checked="selectedRating === value"
          class="form-radio w-4 h-4 text-primary mx-1 md:mx-2 cursor-pointer"
        />
      </label>
      <span>sehr sanft</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { surveyResponseType, articleSelection } from "~/types/survey.type";
const props = defineProps({
  promptId: {
    type: String,
    required: true,
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

  if (props.promptId) {
    surveyResponse.value.articles[props.articleId][
      `sentence__${props.sentenceNum}`
    ] ??= {};
    surveyResponse.value.articles[props.articleId][
      `sentence__${props.sentenceNum}`
    ][`promptId__${props.promptId}`] ??= {};
    surveyResponse.value.articles[props.articleId][
      `sentence__${props.sentenceNum}`
    ][`promptId__${props.promptId}`].langIntensity = rating;
  }
}
</script>
