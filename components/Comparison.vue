<template>
  <div class="section">
    <h2>Kontext Artikel {1}</h2>
    <div class="flex flex-col justify-center items-center w-full px-5 md:px-10">
      <!-- Kontext Section -->
      <div class="mb-b">
        <div>
          <h3>{{ article.context.title }}</h3>
          {{ article.context.body }}
        </div>
      </div>
    </div>
    <Paraphrases
      articleId="story_x"
      softerPromptNum="5"
      verySoftPromptNum="7"
      sentenceNum="1"
      originalText="Die israelische Armee hat bei mehreren Angriffen im Gazastreifen einem Bericht der palästinensischen Nachrichtenagentur WAFA zufolge mindestens 41 Menschen getötet."
      softerText="Die israelische Armee hat in mehreren Aktionen im Gazastreifen mindestens 41 Menschen getötet, wie die palästinensische Nachrichtenagentur WAFA berichtet."
      verySoftText="Die israelische Armee hat bei mehreren Aktionen im Gazastreifen einem Bericht der palästinensischen Nachrichtenagentur WAFA zufolge eine hohe Anzahl von Opfern verursacht."
    ></Paraphrases>
    <!-- <div class="divide-y"></div> -->
    <!-- <Paraphrases
      articleId="story_x"
      softerPromptNum="5"
      verySoftPromptNum="7"
      sentenceNum="2"
      originalText="Zahlreiche weitere Menschen seien bei den Angriffen in Dschabalija im Norden sowie Deir al-Balah im Zentrum und Rafah im Süden des Küstenstreifens verletzt worden, schrieb die Agentur unter Berufung auf Angaben von gestern aus medizinischen Kreisen in dem Küstenstreifen."
      softerText="Viele weitere Menschen wurden bei den Vorfällen in Dschabalija im Norden, Deir al-Balah im Zentrum und Rafah im Süden des Küstenstreifens verletzt, so die Agentur unter Berufung auf medizinische Kreise."
      verySoftText="Viele weitere Menschen seien bei den Aktionen in Dschabalija im Norden sowie Deir al-Balah im Zentrum und Rafah im Süden des Küstenstreifens verletzt worden, schrieb die Agentur unter Berufung auf Angaben von gestern aus medizinischen Kreisen in dem Küstenstreifen."
    ></Paraphrases>
    <Paraphrases
      articleId="story_x"
      softerPromptNum="5"
      verySoftPromptNum="7"
      sentenceNum="3"
      originalText="Von israelischer Seite gab es bisher keine Angaben zum Kampfgeschehen oder zu dem Bericht. "
      softerText="Von israelischer Seite gab es bisher keine offiziellen Angaben zu den Vorfällen."
      verySoftText="Von israelischer Seite gab es bisher keine Angaben zu den Vorgängen oder zu dem Bericht."
    ></Paraphrases> -->
    <!-- <div> -->
    <!-- Loop through each sentence -->
    <!-- <div v-for="(sentence, sentenceKey) in sentences" :key="sentenceKey"> -->
    <!-- Loop through "softer" versions of the sentence -->
    <!-- <div
          v-for="(softerVersion, index) in sentence.versions.softer"
          :key="'softer-' + index"
        >
          <Paraphrases
            :softerPromptNum="softerVersion.prompt_id"
            :verySoftPromptNum="sentence.versions.verySoft[index]?.prompt_id"
            :sentence="sentenceKey"
            :originalText="sentence.original"
            :softerText="softerVersion.sentence"
            :verySoftText="sentence.versions.verySoft[index]?.sentence"
          />
        </div>
      </div> -->
    <!-- </div> -->
  </div>
</template>

<script setup>
const props = defineProps({
  article: {
    type: Object,
    required: true,
  },
});
console.log("Comparison");
</script>

<style scoped>
/* You can add any additional styles here if needed */
</style>
