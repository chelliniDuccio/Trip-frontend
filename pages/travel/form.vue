<template>
  <div class="container mx-auto max-w-lg p-6 bg-white shadow-md rounded-lg">
    <h1 class="text-xl font-bold mb-4">
      {{ isUpdate ? "Modifica Viaggio" : "Crea Nuovo Viaggio" }}
    </h1>

    <form @submit.prevent="submitForm" class="space-y-4">
      <!-- Nome -->
      <div>
        <label class="block text-sm font-medium">Nome</label>
        <input
          v-model="travelData.Name"
          type="text"
          class="input input-bordered w-full"
          required
        />
      </div>

      <!-- Data Inizio -->
      <div>
        <label class="block text-sm font-medium">Data Inizio</label>
        <input
          v-model="travelData.StartDate"
          type="date"
          class="input input-bordered w-full"
          required
        />
      </div>

      <!-- Data Fine -->
      <div>
        <label class="block text-sm font-medium">Data Fine</label>
        <input
          v-model="travelData.EndDate"
          type="date"
          class="input input-bordered w-full"
          required
        />
      </div>

      <!-- Selezione Paese con bandiera emoji -->
      <div>
        <label class="block text-sm font-medium">Paese</label>
        <div class="dropdown w-full">
          <label tabindex="0" class="btn btn-outline w-full flex justify-between">
            <div class="flex items-center">
              {{
                selectedCountry
                  ? countryEmoji(selectedCountry.Code) + " " + selectedCountry.Name
                  : "Seleziona un paese"
              }}
            </div>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </label>
          <ul
            tabindex="0"
            class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full max-h-60 overflow-auto"
          >
            <li v-for="country in countries" :key="country.Id">
              <button
                @click="travelData.CountryId = country.Id"
                class="flex items-center gap-2 w-full text-left p-2 hover:bg-gray-100 rounded-md"
              >
                {{ countryEmoji(country.code) }} {{ country.name }}
              </button>
            </li>
          </ul>
        </div>
      </div>

      <!-- Errore -->
      <div v-if="error" class="text-red-500 text-sm font-bold">{{ error }}</div>

      <!-- Pulsanti -->
      <div class="flex justify-between items-center mt-4">
        <button type="submit" class="btn btn-primary" :disabled="isLoading">
          <span v-if="isLoading" class="loading loading-spinner"></span>
          {{ isUpdate ? "Aggiorna" : "Crea" }}
        </button>
        <button type="button" class="btn btn-secondary" @click="router.push('/travels')">
          Annulla
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  travel: Object,
});

const travelData = ref({
  Name: props.travel?.Name || "",
  StartDate: props.travel?.StartDate || "",
  EndDate: props.travel?.EndDate || "",
  CountryId: props.travel?.Country?.Id || "",
});

const countries = ref([]);
const isLoading = ref(false);
const error = ref(null);

// Funzione per ottenere l'emoji della bandiera da un codice ISO alpha-2
const countryEmoji = (code) => {
  return code
    ? [...code.toUpperCase()]
        .map((c) => String.fromCodePoint(127397 + c.charCodeAt(0)))
        .join("")
    : "";
};

// Carica i paesi disponibili
onMounted(async () => {
  try {
    const response = await fetch("https://localhost:44355/api/Countries");
    if (!response.ok) throw new Error("Errore nel recupero dei paesi");
    countries.value = await response.json();
  } catch (err) {
    console.error(err);
    error.value = "Errore nel caricamento dei paesi";
  }
});

// Trova il paese selezionato
const selectedCountry = computed(() => {
  return countries.value.find((c) => c.Id === travelData.value.CountryId) || null;
});

// Gestione submit
const submitForm = async () => {
  isLoading.value = true;
  error.value = null;

  const method = isUpdate.value ? "PUT" : "POST";
  const url = isUpdate.value
    ? `https://localhost:44355/api/Travels/${props.travel.Id}`
    : "https://localhost:44355/api/Travels";

  try {
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(travelData.value),
    });

    if (!response.ok) throw new Error("Errore nel salvataggio del viaggio");

    router.push("/travels");
  } catch (err) {
    console.error(err);
    error.value = "Errore nel salvataggio";
  } finally {
    isLoading.value = false;
  }
};
</script>
