<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "@/src/axios";
import Navbar from "@/components/navbar.vue";
import LoadingSpinner from "~/components/loading-spinner.vue";
import type { Travel } from "~/models/types";
import { Clipboard } from "lucide-vue-next";

const router = useRouter();
const route = useRoute();

// Definizione delle props
const travelFromQuery = route.query.travel ? JSON.parse(route.query.travel as string) : null;

// Stato locale per il viaggio
const travel = ref<Travel>({
  id: travelFromQuery?.id ?? 0,
  name: travelFromQuery?.name ?? "",
  startDate: travelFromQuery?.startDate ?? new Date(),
  endDate: travelFromQuery?.endDate ?? new Date(),
  countryId: travelFromQuery?.countryId ?? 0,
  stayAddress: travelFromQuery?.stayAddress ?? "",
  createdBy: 1,
  creationAt: travelFromQuery?.creationAt ?? new Date()
});

// Stati aggiuntivi per la gestione del caricamento e degli errori
const countries = ref<{ Id: number; name: string; flag: string }[]>([]);
const isLoading = ref(false);
const error = ref<string | null>(null);

// Computed per verificare se è un aggiornamento
const isUpdate = computed(() => travel.value.id !== 0);

// Funzione per caricare i paesi
const fetchCountries = async () => {
  try {
    const response = await axios.get("/Countries");
    countries.value = response.data;
  } catch (err) {
    error.value = "Errore nel caricamento dei paesi.";
  }
};

const selectCountry = (countryId: number) => {
  travel.value.countryId = countryId;
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
    router.push("/");
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

      <date-picker :v-model="travel.startDate" label="Data Inizio" placeholder="Seleziona la data di inizio" />

      <date-picker :v-model="travel.endDate" label="Data Fine" placeholder="Seleziona la data di fine" />

      <div>
        <label class="block text-sm font-medium">Indirizzo</label>
        <div class="relative">
          <input v-model="travel.stayAddress" type="text" class="input input-bordered w-full pr-12" required />
          <button type="button" @click="pasteFromClipboard"
            class="absolute right-2 top-1/2 transform -translate-y-1/2 btn btn-sm btn-outline">
            <clipboard class="w-5 h-5" />
          </button>
        </div>
      </div>

      <country-selector :selectedCountryId="travel.countryId" :onSelect="selectCountry" />

      <!-- Messaggio di errore -->
      <div v-if="error" class="text-red-500">{{ error }}</div>

      <!-- Pulsante di submit -->
      <button type="submit" class="btn btn-primary w-full">
        {{ isUpdate ? "Aggiorna Viaggio" : "Crea Viaggio" }}
      </button>
    </form>
  </div>
</template>