<template>
  <div class="flex flex-col justify-center items-center w-full">
    <div
      class="w-full flex flex-col md:flex-col 2xl:flex-row md:space-y-4 2xl:space-x-4 2xl:space-y-0"
    >
      <!-- Original Section -->
      <div
        class="w-full flex flex-col md:flex-row md:1/2 2xl:w-1/2 md:space-x-4 softer"
      >
        <div class="w-full md:w-1/2 p-4 rounded-lg shadow-md">
          <h2>Original</h2>
          <p
            :id="`a-${articleId}-p-${softerPromptNum}-${verySoftPromptNum}_s-${sentenceNum}_v-original-softer`"
            v-html="highlightedOriginal"
          ></p>
        </div>

        <!-- Sanftere Version Section -->
        <div
          class="w-full md:w-1/2 p-4 rounded-lg shadow-md flex flex-col justify-between softer"
        >
          <div>
            <h2>Sanftere Version</h2>
            <div
              :id="`a-${articleId}-p-${softerPromptNum}_s-${sentenceNum}_v-softer`"
              v-html="highlightedSofter"
            ></div>
          </div>
          <Factuality
            class="mt-8"
            :articleId="articleId"
            :softerPromptNum="softerPromptNum"
            :sentenceNum="sentenceNum"
          />
          <RatingButtons
            :articleId="articleId"
            :softerPromptNum="softerPromptNum"
            :sentenceNum="sentenceNum"
          />
        </div>
      </div>

      <div
        class="w-full flex flex-col md:flex-row md:1/2 2xl:w-1/2 md:space-x-4 very-soft"
      >
        <div class="w-full md:w-1/2 p-4 rounded-lg shadow-md">
          <h2>Original</h2>
          <p
            :id="`a-${articleId}-p-${softerPromptNum}-${verySoftPromptNum}_s-${sentenceNum}_v-original-verySoft`"
            v-html="highlightedOriginalVerySoft"
          ></p>
        </div>
        <!-- Sehr Sanfte Version Section -->
        <div
          class="w-full md:w-1/2 p-4 rounded-lg shadow-md flex flex-col justify-between very-soft"
        >
          <div>
            <h2>Sehr Sanfte Version</h2>
            <p
              :id="`a-${articleId}-p-${verySoftPromptNum}_s-${sentenceNum}_v-very-soft`"
              v-html="highlightedVerySoft"
            ></p>
          </div>
          <Factuality
            :articleId="articleId"
            :verySoftPromptNum="verySoftPromptNum"
            :sentenceNum="sentenceNum"
          />
          <RatingButtons
            :articleId="articleId"
            :verySoftPromptNum="verySoftPromptNum"
            :sentenceNum="sentenceNum"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import RatingButtons from "./RatingButtons.vue";
import { ref, onMounted } from "vue";

const props = defineProps({
  softerPromptNum: {
    type: String,
    required: true,
  },
  verySoftPromptNum: {
    type: String,
    required: true,
  },
  articleId: {
    type: String,
    required: true,
  },
  sentenceNum: {
    type: String,
    required: true,
  },
  originalText: {
    type: String,
    required: true,
  },
  softerText: {
    type: String,
    required: true,
  },
  verySoftText: {
    type: String,
    required: true,
  },
});

const highlightedOriginal = ref(props.originalText);
const highlightedOriginalVerySoft = ref(props.originalText);
const highlightedSofter = ref(props.softerText);
const highlightedVerySoft = ref(props.verySoftText);

const highlightChanges = () => {
  const originalId = `a-${props.articleId}-p-${props.softerPromptNum}-${props.verySoftPromptNum}_s-${props.sentenceNum}_v-original-softer`;
  const originalId2 = `a-${props.articleId}-p-${props.softerPromptNum}-${props.verySoftPromptNum}_s-${props.sentenceNum}_v-original-verySoft`;
  const softerId = `a-${props.articleId}-p-${props.softerPromptNum}_s-${props.sentenceNum}_v-softer`;
  const verySoftId = `a-${props.articleId}-p-${props.verySoftPromptNum}_s-${props.sentenceNum}_v-very-soft`;

  const originalText = document.getElementById(originalId).textContent;
  const softerText = document.getElementById(softerId).textContent;
  const verySoftText = document.getElementById(verySoftId).textContent;

  highlightedOriginal.value = markHighlights(softerText, originalText);
  highlightedSofter.value = markHighlights(originalText, softerText);
  highlightedVerySoft.value = markHighlights(originalText, verySoftText);
  highlightedOriginalVerySoft.value = markHighlights(
    verySoftText,
    originalText
  );
};

function markHighlights(baseVersion, toMarkVersion) {
  const baseVersionWords = baseVersion.split(/\s+/);
  const toMarkVersionWords = toMarkVersion.split(/\s+/);

  let highlightedHTML = "";
  let isHighlighting = false;

  for (let i = 0; i < toMarkVersionWords.length; i++) {
    console.log(
      "to mark ",
      toMarkVersionWords[i],
      "base ",
      baseVersionWords[i]
    );
    if (toMarkVersionWords[i] !== baseVersionWords[i]) {
      if (!isHighlighting) {
        console.log("!isHighlighting, so beign span");
        highlightedHTML += '<span class="highlight">';
        isHighlighting = true;
      }
      highlightedHTML += toMarkVersionWords[i] + " ";
    } else {
      if (isHighlighting) {
        console.log("isHighlighting, so end span");
        highlightedHTML += "</span>";
        isHighlighting = false;
      }
      highlightedHTML += toMarkVersionWords[i] + " ";
    }
  }

  if (isHighlighting) {
    highlightedHTML += "</span>";
  }

  return highlightedHTML.trim();
}

onMounted(() => {
  // You can call highlightChanges automatically if needed
  highlightChanges();
});
</script>

<style scoped></style>
