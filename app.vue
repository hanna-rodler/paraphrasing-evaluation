<template>
  <div>
    <div
      v-if="isLoading"
      class="fixed inset-0 flex items-center justify-center bg-white z-50 h-full w-full"
    >
      <div
        class="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"
      ></div>
    </div>
    <main class="pt-5 md:p-5 primary-gradient flex justify-center">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
const nuxtApp = useNuxtApp();
const isLoading = ref(true);
nuxtApp.hook("page:start", () => {
  isLoading.value = true;
});
nuxtApp.hook("page:finish", () => {
  isLoading.value = false;
});

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false; // Hide loader after small delay
  }, 50);
});
</script>
