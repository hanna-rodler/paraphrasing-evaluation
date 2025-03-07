<template>
  <div class="flex flex-col justify-center items-center w-full my-4 md:my-8">
    <div class="w-full flex flex-col md:space-y-4 2xl:space-x-4 2xl:space-y-0">
      <!-- Softer Version Section -->
      <div
        v-if="softerPromptNum && softerText"
        class="w-full flex flex-col md:flex-row md:1/2 md:space-x-4 softer"
      >
        <div class="w-full md:w-1/2 p-4 rounded-lg shadow-md">
          <h2 class="text-black">Original</h2>
          <p
            :id="`a-${articleId}-p-${softerPromptNum}-${verySoftPromptNum}_s-${sentenceNum}_v-original-softer`"
            v-html="originalText"
          ></p>
          <div v-if="isLast">
            Dieser Satz braucht nicht umgeschrieben zu werden
          </div>
        </div>

        <div
          class="w-full md:w-1/2 p-4 rounded-lg shadow-md flex flex-col justify-between softer"
        >
          <div>
            <h2>Sanftere Version</h2>
            <div
              :id="`a-${articleId}-p-${softerPromptNum}_s-${sentenceNum}_v-softer`"
              v-html="softerText"
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

      <!-- Sehr Sanfte Version Section -->
      <div
        v-if="verySoftPromptNum && verySoftText"
        class="w-full flex flex-col md:flex-row md:1/2 md:space-x-4 very-soft"
      >
        <div class="w-full md:w-1/2 p-4 rounded-lg shadow-md">
          <h2 class="text-black">Original</h2>
          <p
            :id="`a-${articleId}-p-${softerPromptNum}-${verySoftPromptNum}_s-${sentenceNum}_v-original-verySoft`"
            v-html="originalText"
          ></p>
          <div v-if="isLast">
            Dieser Satz braucht nicht umgeschrieben zu werden
          </div>
        </div>
        <div
          class="w-full md:w-1/2 p-4 rounded-lg shadow-md flex flex-col justify-between very-soft"
        >
          <div>
            <h2>Sehr Sanfte Version</h2>
            <p
              :id="`a-${articleId}-p-${verySoftPromptNum}_s-${sentenceNum}_v-very-soft`"
              v-html="verySoftText"
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
    required: false,
  },
  verySoftPromptNum: {
    type: String,
    required: false,
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
    required: false,
  },
  verySoftText: {
    type: String,
    required: false,
  },
  isLast: {
    type: Boolean,
    required: true,
  },
});

const highlightedOriginal = ref(props.originalText);
const highlightedOriginalVerySoft = ref(props.originalText);
const highlightedSofter = ref(props.softerText);
const highlightedVerySoft = ref(props.verySoftText);

const highlightChanges = () => {
  const originalId = `a-${props.articleId}-p-${props.softerPromptNum}-${props.verySoftPromptNum}_s-${props.sentenceNum}_v-original-softer`;
  const originalText = document.getElementById(originalId).textContent;
  if (props.verySoftPromptNum) {
    const verySoftId = `a-${props.articleId}-p-${props.verySoftPromptNum}_s-${props.sentenceNum}_v-very-soft`;
    console.log("original Id", originalId, "very soft Id", verySoftId);

    const verySoftText = document.getElementById(verySoftId).textContent;
    highlightedVerySoft.value = markHighlights(originalText, verySoftText);
    highlightedOriginalVerySoft.value = markHighlights(
      verySoftText,
      originalText
    );
  }
  if (props.softerPromptNum) {
    const softerId = `a-${props.articleId}-p-${props.softerPromptNum}_s-${props.sentenceNum}_v-softer`;
    console.log("original Id", originalId, "softer Id", softerId);
    const softerText = document.getElementById(softerId).textContent;
    highlightedOriginal.value = markHighlights(softerText, originalText);
    highlightedSofter.value = markHighlights(originalText, softerText);
  }
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
  // highlightChanges();
});
</script>
