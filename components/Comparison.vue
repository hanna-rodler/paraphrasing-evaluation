<template>
  <div class="section">
    <h2 :id="`article-${article.id}`">Kontext Artikel {{ index + 1 }}</h2>
    <div
      class="flex flex-col justify-center items-center w-full px-2 sm:px-5 md:px-10"
    >
      <!-- Kontext Section -->
      <div class="mb-2 md:mb-4 subSection">
        <div>
          <h3 class="mb-0">{{ article.context.title }}</h3>
          <div class="text-gray-800 text-sm mb-2">
            Artikel von {{ article.context.date }}
          </div>
          <!-- // render body as html  -->
          <div v-html="article.context.body"></div>
          <div
            v-if="showJumpToRemarkBtn()"
            @click="scrollToRemark()"
            class="mt-3 link-secondary cursor-pointer"
          >
            zu den Anmerkungen
          </div>
        </div>
      </div>
    </div>
    <div>
      <!-- Loop through each sentence -->
      <div
        v-for="(sentence, index) in article.sentences"
        :key="'sentence' + index"
      >
        <!-- Loop through versions of the sentence -->
        <div
          v-for="(version, index) in sentence.versions"
          :key="'version-' + index"
        >
          <Paraphrases
            :article-id="article.id"
            :sentence-num="sentence.orig_sentence_num"
            :original-text="sentence.original"
            :prompt-id="version.prompt_id ? version.prompt_id : ''"
            :version-text="version.sentence"
            :highlighted-original-text="
              version.original ? version.original : ''
            "
          />
        </div>
        <!-- Loop through "very soft" versions of that sentence-->
        <div
          class="w-full flex flex-col items-center my-8 md:mt-16 md:mb-10"
          v-if="
            Object.keys(article.sentences).indexOf(index) !==
            Object.keys(article.sentences).length - 1
          "
        >
          <hr class="border-t-2 border-gray-400 w-3/4" />
          <h2 class="mt-6">Nächster Satz</h2>
        </div>
      </div>
    </div>
    <FeedbackTextbox :article-id="article.id"></FeedbackTextbox>
  </div>
</template>

<script setup>
import { wasRemarkLinkClicked } from "~/utils/utils";
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
const clickedRemarks = useState("clickedRemarks");

const showJumpToRemarkBtn = () => {
  return wasRemarkLinkClicked(clickedRemarks.value, props.article.id);
};

function scrollToRemark() {
  const remarkElement = document.getElementById(`remark-${props.article.id}`);
  if (remarkElement !== null) {
    const top = remarkElement.getBoundingClientRect().top;
    window.scrollBy(0, top - 40);
  }
}
</script>
