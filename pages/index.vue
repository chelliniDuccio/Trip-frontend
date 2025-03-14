<script setup>
import { ref, onMounted } from "vue";
import axios from "@/src/axios"; 
import Navbar from "@/components/navbar.vue";
import TravelCard from "~/components/travel/travel-card.vue";
import LoadingSpinner from "~/components/loading-spinner.vue";

const travels = ref(null);
const error = ref(null);

const fetchTravels = async () => {
  try {
    const response = await axios.get("Travels?$expand=Country"); // Usa l'istanza configurata di Axios
    travels.value = response.data ? response.data : [];
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
    error.value = "Errore nel caricamento dei dati. Riprova più tardi.";
  }
};

onMounted(fetchTravels);
</script>

<template>
  <Navbar />

  <div class="pt-10">
    <!-- Se c'è un errore -->
    <div v-if="error" class="text-center text-red-500 font-bold">{{ error }}</div>

    <!-- Se ci sono dati -->
    <div v-else-if="travels" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
      <TravelCard v-for="travel in travels" :key="travel.Id" :travel="travel" />
    </div>

    <!-- Se non ci sono viaggi disponibili -->
    <div v-else class="text-center text-gray-500 font-semibold mt-10">
      Nessun viaggio disponibile.
    </div>

    <!-- Se sta ancora caricando -->
    <div v-if="travels === null" class="flex items-center justify-center h-screen">
      <LoadingSpinner />
    </div>
  </div>
</template>
