<template>
  <div class="section">
    <h2 class="font-bold">Kontext Artikel {{ index + 1 }}</h2>
    <div class="flex flex-col justify-center items-center w-full px-5 md:px-10">
      <!-- Kontext Section -->
      <div class="mb-b">
        <div>
          <h3>{{ article.context.title }}</h3>
          <!-- // render body as html  -->
          <div v-html="article.context.body"></div>
        </div>
      </div>
    </div>
    <div>
      <!-- Loop through each sentence -->
      <div
        v-for="(sentence, sentenceKey) in article.sentences"
        :key="sentenceKey"
      >
        <!-- Loop through "softer" versions of the sentence -->
        <div
          v-for="(softerVersion, index) in sentence.versions.softer"
          :key="'softer-' + index"
        >
          <Paraphrases
            :articleId="article.id"
            :softerPromptNum="softerVersion.prompt_id"
            :sentenceNum="sentenceKey"
            :originalText="sentence.original"
            :softerText="softerVersion.sentence"
            :originalSofter="
              softerVersion.original ? softerVersion.original : ''
            "
            :isLast="index === sentence.versions.softer.length - 1"
          />
          <!-- todo. DIESER Satz kann im Original bleiben -->
        </div>
        <div
          v-if="article.sentences.length > 0"
          class="w-full flex justify-center my-6 md:my-12"
        >
          <hr class="border-t-2 border-gray-300 w-1/5" />
        </div>
        <!-- Loop through "very soft" versions of that sentence-->
        <div
          v-for="(verySoftVersion, index) in sentence.versions.verySoft"
          :key="'verySoft-' + index"
        >
          <Paraphrases
            :articleId="article.id"
            :verySoftPromptNum="verySoftVersion.prompt_id"
            :sentenceNum="sentenceKey"
            :originalText="sentence.original"
            :verySoftText="verySoftVersion.sentence"
            :originalVerySoft="
              verySoftVersion.original ? verySoftVersion.original : ''
            "
            :isLast="index === sentence.versions.verySoft.length - 1"
          />
          <!-- Short divider after each paraphrase -->
          <!-- TODO: Dieser Satz kann im Original bleiben. -->
        </div>
        <div
          class="w-full flex justify-center my-8 md:my-16"
          v-if="
            Object.keys(article.sentences).indexOf(sentenceKey) !==
            Object.keys(article.sentences).length - 1
          "
        >
          <hr class="border-t-2 border-gray-400 w-3/4" />
        </div>
      </div>
    </div>
    <FeedbackTextbox :article-id="article.id"></FeedbackTextbox>
  </div>
</template>

<script setup>
const props = defineProps({
  article: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});
</script>

<style scoped>
/* You can add any additional styles here if needed */
</style>
