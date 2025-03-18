<template>
  <div class="section flex justify-center mt-4 md:mt-8">
    <div class="subSection mx-4 md:mx-0">
      <AtomsHeadline level="h2" class="text-bold">Abschluss</AtomsHeadline>
      <div class="mb-12 mt-4 md:mt-8 text-bold">
        Angenommen Sie können zwischen verschiedenen Versionen je nach Ihrer
        Stimmungslage und Kapazitäten wählen, wie bewerten Sie Folgendes?
      </div>
      <!-- I would read -->
      <div class="mb-6 md:mb-12">
        <div>
          Ich kann mir vorstellen, dass folgende Versionen zu lesen eine
          positive Auswirkung auf mich selbst haben könnten: *<br />
          <span>
            Hinweis: Sie können selbst immer einstellen, welche Version Sie
            lesen.
          </span>
        </div>
        <div class="flex flex-col items-center">
          <div class="w-42">
            <div v-for="version in versionOptions" :key="version.value">
              <label
                class="label cursor-pointer justify-start px-0 flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  :name="`iWouldRead-${version.value}`"
                  class="checkbox w-4 h-4 border-black rounded-sm"
                  :value="version.value"
                  v-model="iWouldRead"
                />
                <span>{{ version.label }}</span>
              </label>
            </div>
          </div>
        </div>
        <div
          id="iWouldRead-error"
          v-if="iWouldReadError"
          class="text-error text-center mt-2 flex items-center justify-center"
          role="alert"
        >
          <Icon
            name="heroicons:exclamation-triangle"
            size="18"
            class="mr-2 text-error"
            id="iWouldRead-icon-error"
            data-error-icon="iWouldRead"
            aria-hidden="true"
          />
          <span>Bitte auswählen.</span>
        </div>
      </div>
      <!-- Clients would read-->
      <div class="mb-6 md:mb-12" v-if="showSocialWorkerQuestion">
        <div>
          Nach meiner Einschätzung könnten folgende Versionen für meine
          Klient*innen eine positive Auswirkung haben:
        </div>
        <div class="flex flex-col items-center">
          <div class="w-42">
            <div v-for="version in versionOptions" :key="version.value">
              <label
                class="label cursor-pointer justify-start px-0 flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  class="checkbox w-4 h-4 border-black rounded-sm"
                  :value="version.value"
                  v-model="clientsWouldRead"
                />
                <span>{{ version.label }}</span>
              </label>
            </div>
          </div>
        </div>
        <div
          id="clientsWouldRead-error"
          v-if="clientsWouldReadError"
          class="text-error text-center mt-2 flex items-center justify-center"
          role="alert"
        >
          <Icon
            name="heroicons:exclamation-triangle"
            size="18"
            class="mr-2 text-error"
            id="clientsWouldRead-icon-error"
            data-error-icon="clientsWouldRead"
            aria-hidden="true"
          />
          <span>Bitte auswählen.</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const iWouldRead = useState<versions[]>("iWouldRead", () => []);
const clientsWouldRead = useState<versions[]>("clientsWouldRead", () => []);
const iWouldReadError = useState<boolean>("iWouldReadError", () => false);
const clientsWouldReadError = useState<boolean>(
  "clientsWouldReadError",
  () => false
);

const psychoSocialWorker = useState<boolean | null>("psychoSocialWorker");
const showSocialWorkerQuestion = computed(() => {
  return psychoSocialWorker.value === true ? true : false;
});

const versionOptions = ref([
  { value: "original", label: "Original" },
  { value: "softer", label: "etwas sanfter" },
  { value: "verySoft", label: "sehr sanft" },
  { value: "iDontKnow", label: "ich weiß es nicht" },
  { value: "iDontRead", label: "ich lese keine politischen Nachrichten" },
]);

// valid verySoftDeathInjNums
// const iWouldReadError = useState("iWouldReadError");
// if (iWouldRead.value.length === 0) {
//   if (showErrors) {
//     iWouldReadError.value = true;
//   }
//   if (validity.iWouldRead) {
//     validity.iWouldRead = false;
//     gotUpdated = true;
//   }
// } else {
//   if (!validity.iWouldRead) {
//     validity.iWouldRead = true;
//     gotUpdated = true;
//   }
//   iWouldReadError.value = false;
// }

// // validity clientsWouldRead
// const clientsWouldReadError = useState("clientsWouldReadError");
// if (
//   psychoSocialWorker.value === true &&
//   clientsWouldRead.value.length === 0
// ) {
//   if (showErrors) {
//     clientsWouldReadError.value = true;
//   }
//   if (validity.clientsWouldRead === true) {
//     validity.clientsWouldRead = false;
//     gotUpdated = true;
//   }
// } else {
//   if (validity.clientsWouldRead === false) {
//     validity.clientsWouldRead = true;
//     clientsWouldReadError.value = false;
//     gotUpdated = true;
//   }
// }
</script>
