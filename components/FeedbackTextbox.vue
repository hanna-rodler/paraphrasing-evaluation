<template>
  <div class="mt-3 flex flex-col justify-center w-full">
    <label class="form-control w-lg" :for="`test`">
      <div class="label">
        Haben Sie noch Anmerkungen<span v-if="articleId">
          zu diesem Artikel? (Sätze, die noch sanfter formuliert gehören oder
          sonstige Anmerkungen)</span
        ><span v-else>?</span>
      </div>
    </label>
    <textarea
      class="textarea border rounded-md border-black focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition shadow-sm h-24 w-full"
      :id="`remark-${props.articleId}`"
      v-model="remark"
      name="`remark-${props.articleId}`"
      @input="debouncedSave"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";
import { defineProps } from "vue";
import type { surveyResponseType } from "~/types/survey.type";

const props = defineProps({
  articleId: {
    type: String,
    required: false,
    default: null,
  },
});

const remark = ref("");
const generalRemark = useState<string>("generalRemark", () => "");

const articleRemarks = useState<string[] | null[]>("articleRemarks", () => []);
const surveyResponse = useState<surveyResponseType>("surveyResponse");

const debouncedSave = useDebounceFn(() => {
  if (remark.value !== "") {
    if (!props.articleId) {
      console.log("save to general remarks:");
      generalRemark.value = remark.value;
    } else if (props.articleId) {
      console.log("save to article remarks :", props.articleId);
      surveyResponse.value.articles[props.articleId].remark = remark.value;
      console.log(surveyResponse.value.articles[props.articleId].remark);
      // surveyResponse.value.articles[props.content.id].generalRemark = generalRemark.value;
      // console.log(surveyResponse.value.articles[props.content.id]);
    }
  }
}, 300);
</script>
