<template>
  <div
    class="mt-3 flex flex-col justify-center w-full px-2 md:px-0"
    :id="`remark-${articleId}`"
  >
    <label class="form-control w-lg" :for="`test`">
      <div class="label mb-2">
        <span v-if="articleId">
          Haben Sie noch allgemeine Anmerkungen zu diesem Artikel? (Sätze, die
          noch sanfter formuliert gehören oder sonstige Anmerkungen)
        </span>
        <span v-if="!articleId && !isProfessionalRemark">
          <span> Haben Sie noch allgemeine Anmerkungen? </span>
        </span>
        <span v-if="!articleId && isProfessionalRemark">
          Bitte beschreiben Sie, welche Themen im Zusammenhang mit
          Nachrichtenkonsum aus Ihrer Erfahrung im psychosozialen Bereich
          wichtig sind. Dies könnte Überforderung durch zu viele Nachrichten,
          Stress beim Nachrichten lesen oder andere Erfahrungen im Umgang mit
          Medieninhalten umfassen.
        </span>
        <span
          v-if="articleId"
          class="ml-2 link-secondary cursor-pointer"
          @click="scrollToArticle()"
        >
          zum Artikel
        </span>
      </div>
    </label>
    <textarea
      :class="[
        'textarea border rounded-md border-black focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition shadow-sm w-full px-2 py-0.5',
        isProfessionalRemark ? 'h-32' : 'h-24',
      ]"
      :id="`remark-${props.articleId}`"
      v-model="remark"
      name="`remark-${props.articleId}`"
      @input="debouncedSave"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";
import type { surveyResponseType } from "~/types/survey.type";
import { wasRemarkLinkClicked } from "~/utils/utils";

const props = defineProps({
  articleId: {
    type: String,
    required: false,
    default: null,
  },
  isProfessionalRemark: {
    type: Boolean,
    default: false,
  },
});

const remark = ref("");
const clickedRemarks = useState<string[]>("clickedRemarks", () => []);

const surveyResponse = useState<surveyResponseType>("surveyResponse");

const debouncedSave = useDebounceFn(() => {
  if (remark.value !== "") {
    if (!props.articleId) {
      if (props.isProfessionalRemark) {
        surveyResponse.value.professionalRemark = remark.value;
      } else {
        surveyResponse.value.generalRemark = remark.value;
      }
    } else if (props.articleId) {
      surveyResponse.value.articles[props.articleId].remark = remark.value;
    }
  }
}, 300);

function clickedRemarkLink() {
  if (!wasRemarkLinkClicked(clickedRemarks.value, props.articleId)) {
    clickedRemarks.value.push(props.articleId);
  }
}

function scrollToArticle() {
  clickedRemarkLink();
  const articleElement = document.getElementById(`article-${props.articleId}`);
  if (articleElement !== null) {
    const top = articleElement.getBoundingClientRect().top;
    window.scrollBy(0, top - 40);
  }
}
</script>
