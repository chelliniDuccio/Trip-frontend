<script setup>
import { ref, onMounted } from "vue";
import Navbar from "@/components/navbar.vue";
import TravelCard from "~/components/travel-card.vue";

const travels = ref(null);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await fetch("https://localhost:44355/api/Travels?$expand=Country");
    if (!response.ok) throw new Error("Errore nel recupero dei dati");

    const data = await response.json();
    travels.value = data.length ? data : null; // Se non ci sono viaggi, rimane null
  } catch (err) {
    console.error(err);
    error.value = "Errore nel caricamento dei dati. Riprova più tardi.";
  }
});
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
    <div v-else class="flex items-center justify-center h-screen">
      <button class="btn btn-neutral">
        <span class="loading loading-spinner"></span>
        Caricamento...
      </button>
    </div>
    <!-- Se sta caricando -->
  </div>
</template>
