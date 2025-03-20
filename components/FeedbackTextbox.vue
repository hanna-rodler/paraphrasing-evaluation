<template>
  <div
    class="mt-3 flex flex-col justify-center w-full px-2 md:px-0"
    :id="`remark-${articleId}`"
  >
    <label class="form-control w-lg" :for="`test`">
      <div class="label mb-2">
        Haben Sie noch allgemeine Anmerkungen<span v-if="articleId">
          zu diesem Artikel? (Sätze, die noch sanfter formuliert gehören oder
          sonstige Anmerkungen)</span
        ><span v-else>?</span>
        <span v-if="psychoSocialWorker === true">
          Gibt es aus Ihrer Erfahrung im psychosozialen Bereich Anmerkungen zum
          Thema?
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
      class="textarea border rounded-md border-black focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition shadow-sm h-24 w-full px-2 py-0.5"
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
});

const remark = ref("");
const generalRemark = useState<string>("generalRemark", () => "");
const clickedRemarks = useState<string[]>("clickedRemarks", () => []);

const surveyResponse = useState<surveyResponseType>("surveyResponse");
const psychoSocialWorker = useState<boolean | null>("psychoSocialWorker");

const debouncedSave = useDebounceFn(() => {
  if (remark.value !== "") {
    if (!props.articleId) {
      generalRemark.value = remark.value;
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
