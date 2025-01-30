<template>
  <div class="h-screen w-7/8 md:w-3/4 xl:1/2">
    <div class="section flex justify-center flex-col items-center">
      <AtomsHeadline level="h1"> Vielen Dank für die Teilnahme! </AtomsHeadline>
      <div
        class="flex items-center justify-between w-40 mb-4 mt-2 text-primary border-2 border-primary rounded-md px-5 py-2 cursor-pointer"
        @click="copyUrl()"
      >
        <span>Studie teilen</span>
        <Icon
          name="heroicons:clipboard-document"
          class="cursor-pointer"
          size="18"
        />
      </div>
      <AtomsText
        class="text-center mt-4 mb-6 max-w-xl"
        v-if="!showSuccessMessage"
      >
        Wenn Sie über die Studie am Laufenden gehalten werden wollen oder an
        einer Folgestudie teilnehmen wollen, können Sie hier Ihre E-Mail Adresse
        eintragen.
      </AtomsText>
      <div class="flex flex-col justify-center" v-if="!showSuccessMessage">
        <div
          v-if="emailError"
          class="error-msg text-error text-center mb-2 flex items-center justify-center"
        >
          <Icon name="heroicons:exclamation-triangle" size="18" class="mr-2" />
          <span>Bitte eine gültige E-Mail-Adresse angeben:</span>
        </div>
        <div class="mb-4">
          <label
            class="input input-bordered input-primary flex items-center gap-2 py-2"
            for="email"
          >
            <Icon name="heroicons:envelope" soze="18" />
            <input
              type="text"
              class="grow rounded-md border border-black focus:border-primary focus:ring-2 focus:ring-secondary transition shadow-sm py-2 px-4"
              placeholder="Email"
              v-model="email"
              id="email"
            />
          </label>
        </div>
        <div
          v-if="checkboxError"
          class="error-msg text-error text-center mb-2 flex items-center justify-center"
        >
          <Icon name="heroicons:exclamation-triangle" size="18" class="mr-2" />
          <span>Bitte eine oder zwei der Optionen auswählen:</span>
        </div>
        <div class="form-control">
          <label class="label cursor-pointer justify-start px-0" id="updateMe">
            <input
              type="checkbox"
              class="checkbox w-4 h-4 border-black rounded-sm mr-2"
              for="updateMe"
              v-model="updateMe"
              @keyup.enter="toggleUpdateMe"
            />
            <span class="">Halte mich am Laufen</span>
          </label>
        </div>
        <div class="form-control">
          <label
            class="label cursor-pointer justify-start px-0"
            for="studyParticipation"
          >
            <input
              type="checkbox"
              class="checkbox w-4 h-4 border-black rounded-sm mr-2"
              v-model="studyParticipation"
              id="studyParticipation"
              @keyup.enter="toggleStudyParticipation"
            />
            <span class="">Kontaktiere mich für eine Folgetudie</span>
          </label>
        </div>
        <div>
          <div class="mt-5 flex justify-center flex-row">
            <AtomsButton tag="button" variant="gradient" @click="submitForm()">
              Senden
            </AtomsButton>
          </div>
        </div>
      </div>
      <AtomsText class="text-xs block mt-4 max-w-md" v-if="!showSuccessMessage">
        Die Kontaktdaten werden nur im Zuge dieser Masterarbeit für den Zweck,
        den sie angehakt haben, verwendet. Nach der Vollendung der Masterarbeit,
        spätestens im September 2025, werden die Daten gelöscht.
      </AtomsText>
      <div v-if="showSuccessMessage" class="text-center mt-5">Dankeschön!</div>
      <div class="toast toast-end" v-if="showCopied">
        <div class="alert bg-white text-black">Kopiert</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Registration } from "~/types/registration.type";
const studyParticipation = ref(false);
const updateMe = ref(false);
const email = ref();
const checkboxError = ref(false);
const emailError = ref(false);
const showSuccessMessage = ref(false);
const showCopied = ref(false);

function toggleStudyParticipation() {
  studyParticipation.value = !studyParticipation.value;
}

function toggleUpdateMe() {
  updateMe.value = !updateMe.value;
}

function submitForm() {
  if (
    email.value === undefined ||
    email.value === "" ||
    !email.value.includes("@") ||
    email.value.length < 4
  ) {
    emailError.value = true;
  } else {
    emailError.value = false;
  }

  if (updateMe.value === false && studyParticipation.value === false) {
    checkboxError.value = true;
  } else {
    checkboxError.value = false;
  }

  if (!checkboxError.value && !emailError.value) {
    const registrationData: Registration = {
      email: email.value,
      updateMe: updateMe.value,
      studyParticipation: studyParticipation.value,
    };
    saveToDB(registrationData);
    console.info("can be sent", registrationData);
  }
}

async function saveToDB(registrationData: Registration) {
  try {
    const { data, error: fetchError } = await useFetch(
      "/api/registerFollowUp",
      {
        method: "POST",
        body: registrationData,
      }
    );
    console.log("data", data, "error", fetchError);
    if (data.value) {
      showSuccessMessage.value = true;
      console.log("successful");
      clearForm();
    }
  } catch (error) {
    console.error("Unsuccessful. Error:", error);
  }
}

function clearForm() {
  email.value = "";
  updateMe.value = false;
  studyParticipation.value = false;
}

async function copyUrl() {
  try {
    // Get the base URL from the Nuxt configuration
    const baseUrl = window.location.origin;

    // Use the Clipboard API to copy the URL
    await navigator.clipboard.writeText(baseUrl);

    showCopied.value = true;
    setTimeout(() => {
      showCopied.value = false;
    }, 2000);
  } catch (error) {
    console.error("Failed to copy base URL:", error);
  }
}
</script>
