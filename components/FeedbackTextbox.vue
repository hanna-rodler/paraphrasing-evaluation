<template>
  <div class="mt-3 flex flex-col justify-center w-full">
    <label class="form-control w-lg" :for="`test`">
      <div class="label mb-2">
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
      generalRemark.value = remark.value;
    } else if (props.articleId) {
      surveyResponse.value.articles[props.articleId].remark = remark.value;
      console.log(
        "remark",
        surveyResponse.value.articles[props.articleId].remark
      );
    }
  }
}, 300);
</script>
