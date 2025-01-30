<template>
  <div class="mt-3 flex flex-row justify-center">
    <label class="form-control w-96" :for="`test`">
      <div class="label">
        <AtomsHeadline level="h3" class="mb-1">
          Haben Sie Anmerkungen?
        </AtomsHeadline>
        {{ remark }}
      </div>
      <textarea
        class="textarea textarea-bordered h-24"
        :id="`test`"
        v-model="remark"
        name="remark"
        @input="debouncedSave"
      ></textarea>
    </label>
  </div>
</template>

<script setup lang="ts">
const remark = ref<string>("");

const debouncedSave = useDebounceFn(() => {
  if (remark.value !== "") {
    console.log("save remark");
    // surveyResponse.value.articles[props.content.id].remark = remark.value;
    // console.log(surveyResponse.value.articles[props.content.id]);
  }
}, 300);
</script>
