<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "@/src/axios";
import Navbar from "@/components/navbar.vue";
import LoadingSpinner from "~/components/loading-spinner.vue";
import type { Travel } from "~/models/types";

const router = useRouter();

// Definizione delle props
const props = defineProps<{ travel?: Travel }>();

// Stato locale per travel
const travel = ref<Travel>({
  id: props.travel?.id ?? undefined,
  name: props.travel?.name ?? "",
  startDate: props.travel?.startDate ?? "",
  endDate: props.travel?.endDate ?? "",
  countryId: props.travel?.countryId ?? undefined,
  stayAddress: props.travel?.stayAddress ?? ""
});

const countries = ref<{ Id: number; name: string; flag: string }[]>([]);
const isLoading = ref(false);
const error = ref<string | null>(null);

// Computed per verificare se è un aggiornamento
const isUpdate = computed(() => travel.value.id !== undefined);

// Funzione per caricare i paesi
const fetchCountries = async () => {
  try {
    const response = await axios.get("/Countries");
    countries.value = response.data;
  } catch (err) {
    error.value = "Errore nel caricamento dei paesi.";
  }
};

// Carica i paesi quando il componente è montato
onMounted(fetchCountries);

// Computed per trovare il paese selezionato
const selectedCountry = computed(() => {
  return countries.value.find((c) => c.Id === travel.value.countryId) || null;
});

// Funzione per incollare l'indirizzo dalla clipboard
const pasteFromClipboard = async () => {
  try {
    const text = await navigator.clipboard.readText();
    travel.value.stayAddress = text;
  } catch (err) {
    error.value = "Impossibile accedere agli appunti.";
  }
};

// Gestione submit
const submitForm = async () => {
  isLoading.value = true;
  error.value = null;

  const method = isUpdate.value ? "put" : "post";
  const url = isUpdate.value ? `/Travels/${travel.value.id}` : "/Travels";

  try {
    await axios.request({ method, url, data: travel.value });
    router.push("/travels");
  } catch (err) {
    error.value = "Errore nel salvataggio del viaggio.";
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <Navbar />

  <div class="container mx-auto max-w-lg p-6 shadow-md rounded-lg mt-10">
    <h1 class="text-xl font-bold mb-4">
      {{ isUpdate ? "Modifica Viaggio" : "Crea Nuovo Viaggio" }}
    </h1>

    <!-- Mostra spinner se in caricamento -->
    <div v-if="isLoading" class="flex justify-center py-4">
      <LoadingSpinner />
    </div>

    <!-- Form -->
    <form v-else @submit.prevent="submitForm" class="space-y-4">
      <!-- Nome -->
      <div>
        <label class="block text-sm font-medium">Nome</label>
        <input v-model="travel.name" type="text" class="input input-bordered w-full" required />
      </div>

      <!-- Data Inizio -->
      <div>
        <label class="block text-sm font-medium">Data Inizio</label>
        <input v-model="travel.startDate" type="date" class="input input-bordered w-full" required />
      </div>

      <!-- Data Fine -->
      <div>
        <label class="block text-sm font-medium">Data Fine</label>
        <input v-model="travel.endDate" type="date" class="input input-bordered w-full" required />
      </div>

      <!-- Selezione Paese -->
      <div>
        <label class="block text-sm font-medium">Paese</label>
        <div class="dropdown w-full">
          <label tabindex="0" class="btn btn-outline w-full flex justify-between">
            <div class="flex items-center">
              {{ selectedCountry ? selectedCountry.name : "Seleziona un paese" }}
            </div>
          </label>
          <ul tabindex="0"
            class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full max-h-60 overflow-auto">
            <li v-for="country in countries" :key="country.Id">
              <button @click="travel.countryId = country.Id" type="button"
                class="flex items-center gap-2 w-full text-left p-2 hover:bg-gray-100 rounded-md">
                <img :src="country.flag" :alt="'Bandiera di ' + country.name"
                  class="w-6 h-4 object-cover border border-gray-300 rounded" /> 
                {{ country.name }}
              </button>
            </li>
          </ul>
        </div>
      </div>

      <!-- Indirizzo con pulsante per incollare -->
      <div>
        <label class="block text-sm font-medium">Indirizzo</label>
        <div class="relative">
          <input v-model="travel.stayAddress" type="text" class="input input-bordered w-full pr-12" required />
          <button type="button" @click="pasteFromClipboard"
            class="absolute right-2 top-1/2 transform -translate-y-1/2 btn btn-sm btn-outline">
            📋
          </button>
        </div>
      </div>

      <!-- Messaggio di errore -->
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
