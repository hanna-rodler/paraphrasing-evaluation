<template>
  <div class="flex flex-col justify-center items-center w-full my-4 md:my-8">
    <div class="w-full flex flex-col md:space-y-4 2xl:space-x-4 2xl:space-y-0">
      <div class="w-full flex flex-col md:flex-row md:1/2 md:space-x-4 softer">
        <div class="w-full md:w-1/2 p-4 rounded-lg shadow-md">
          <h3 class="paraphrase">
            Original <span v-if="sentenceNum === '0'">- Titel</span>
          </h3>
          <p
            :id="`a-${articleId}-p-${promptId}_s-${sentenceNum}_v-original`"
            v-html="highlightedOriginal"
          ></p>
        </div>

        <div
          class="w-full md:w-1/2 p-4 rounded-lg shadow-md flex flex-col justify-between softer"
        >
          <div>
            <h3 class="paraphrase text-primary">
              Version <span v-if="sentenceNum === '0'">- Titel</span>
            </h3>
            <div
              :id="`a-${articleId}-p-${promptId}_s-${sentenceNum}_v-softer`"
              v-html="highlightedVersionText"
            ></div>
          </div>
          <Factuality
            class="mt-8"
            :article-id="articleId"
            :prompt-id="promptId"
            :sentence-num="sentenceNum"
          />
          <LangIntensity
            :article-id="articleId"
            :prompt-id="promptId"
            :sentence-num="sentenceNum"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  articleId: {
    type: String,
    required: true,
  },
  promptId: {
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
  versionText: {
    type: String,
    required: true,
  },
  highlightedOriginalText: {
    type: String,
    required: false,
    default: "",
  },
});

const highlightedOriginal = ref(props.originalText);
const highlightedVersionText = ref(props.versionText);

const highlightChanges = () => {
  if (props.highlightedOriginalText !== "") {
    highlightedOriginal.value = props.highlightedOriginalText;
  } else {
    highlightedVersionText.value = markHighlights(
      props.originalText,
      props.versionText
    );
    highlightedOriginal.value = markHighlights(
      props.versionText,
      props.originalText
    );
  }
};

function markHighlights(baseVersion, toMarkVersion) {
  const baseVersionWords = baseVersion.split(/\s+/);
  const toMarkVersionWords = toMarkVersion.split(/\s+/);

  let highlightedHTML = "";
  let isHighlighting = false;

  for (let i = 0; i < toMarkVersionWords.length; i++) {
    if (toMarkVersionWords[i] !== baseVersionWords[i]) {
      if (!isHighlighting) {
        highlightedHTML += '<span class="highlight">';
        isHighlighting = true;
      }
      highlightedHTML += toMarkVersionWords[i] + " ";
    } else {
      if (isHighlighting) {
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
  highlightChanges();
});
</script>
