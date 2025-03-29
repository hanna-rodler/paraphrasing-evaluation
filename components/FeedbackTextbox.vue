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
      v-if="articleId"
      :class="[
        'textarea border rounded-md border-black focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition shadow-sm w-full px-2 py-0.5',
        isProfessionalRemark ? 'h-32' : 'h-24',
      ]"
      :id="`remark-${props.articleId}`"
      v-model="articleRemark"
      name="`remark-${props.articleId}`"
      @input="debouncedSave"
    ></textarea>
    <textarea
      v-if="!articleId && !isProfessionalRemark"
      :class="[
        'textarea border rounded-md border-black focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition shadow-sm w-full px-2 py-0.5',
        isProfessionalRemark ? 'h-32' : 'h-24',
      ]"
      :id="`remark-${props.articleId}`"
      v-model="generalRemark"
      name="`remark-${props.articleId}`"
      @input="debouncedSave"
    ></textarea>
    <textarea
      v-if="!articleId && isProfessionalRemark"
      :class="[
        'textarea border rounded-md border-black focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition shadow-sm w-full px-2 py-0.5',
        isProfessionalRemark ? 'h-32' : 'h-24',
      ]"
      :id="`remark-${props.articleId}`"
      v-model="professionalRemark"
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

const articleRemark = ref("");
const clickedRemarks = useState<string[]>("clickedRemarks", () => []);
const generalRemark = ref<string>("");
const professionalRemark = ref<string>("");

const surveyResponse = useState<surveyResponseType>("surveyResponse");

const stopWatcher = watch(
  surveyResponse,
  () => {
    if (props.articleId) {
      articleRemark.value =
        surveyResponse.value.articles[
          props.articleId as keyof typeof surveyResponse.value.articles
        ]?.remark ?? "";
    } else {
      if (!props.isProfessionalRemark) {
        generalRemark.value = surveyResponse.value.generalRemark ?? "";
      } else {
        professionalRemark.value =
          surveyResponse.value.professionalRemark ?? "";
      }
    }
  },
  { deep: true }
);

setTimeout(() => {
  stopWatcher();
  // stop watcher after 2 minutes, because localStorage will have loaded by then. => don't watch the entire time.
}, 120000);

const debouncedSave = useDebounceFn(() => {
  if (!props.articleId) {
    if (props.isProfessionalRemark) {
      surveyResponse.value.professionalRemark = professionalRemark.value;
    } else {
      surveyResponse.value.generalRemark = generalRemark.value;
    }
  } else if (props.articleId) {
    surveyResponse.value.articles[
      props.articleId as keyof typeof surveyResponse.value.articles
    ].remark = articleRemark.value;
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
