<template>
  <div class="section">
    <h1>Evaluation</h1>
    <p>Results:</p>
  </div>
</template>

<script lang="ts" setup>
const getEvaluation = async () => {
  // const { data, error: fetchError } = await useFetch("/api/flattenResults", {
  const { data, error: fetchError } = await useFetch("/api/evaluatecsv", {
    method: "GET",
  });
  if (data.value) {
    console.log("success", data.value);
  } else {
    console.error("error", fetchError);
  }
};
getEvaluation();
</script>
