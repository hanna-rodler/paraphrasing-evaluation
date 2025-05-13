<template>
  <div class="section">
    <h1>Count Prompt Occurences</h1>
  </div>
</template>

<script lang="ts" setup>
const getPromptOccurences = async () => {
  const { data, error: fetchError } = await useFetch(
    "/api/count-prompt-occurences",
    {
      method: "GET",
    }
  );
  if (data.value) {
    console.log("success", data.value);
  } else {
    console.error("error", fetchError);
  }
};

getPromptOccurences();
</script>
