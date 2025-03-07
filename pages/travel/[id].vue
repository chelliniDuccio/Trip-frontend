<script setup>
import { useRoute } from "#app";
import { ref, onMounted } from "vue";

const route = useRoute();
const travel = ref(null);
const error = ref(null);
const isOpen = ref(false); // Stato per il menu FAB

onMounted(async () => {
  try {
    // Recupero dati viaggio
    const travelResponse = await fetch(
      `https://localhost:44355/api/Travels?$filter=id eq ${route.params.id}&$expand=Country`
    );
    if (!travelResponse.ok) throw new Error("Errore nel recupero dei dati");

    const travelData = await travelResponse.json();
    travel.value = travelData.length ? travelData[0] : null;
  } catch (err) {
    console.error(err);
    error.value = "Errore nel caricamento dei dati. Riprova più tardi.";
  }
});

// Funzione per gestire il click sui pulsanti del menu
const handleClick = (message) => {
  alert(message);
};
</script>

<template>
  <Navbar />
  <div class="container mx-auto p-6">
    <div v-if="error" class="text-center text-red-500 font-bold">{{ error }}</div>

    <div v-else-if="travel" class="card bg-base-100 shadow-xl p-6 relative">
      <div
        class="absolute inset-0 bg-cover bg-center blur-lg opacity-20"
        :style="{ backgroundImage: `url(${travel.Country?.Flag})` }"
      ></div>

      <div class="relative z-10">
        <h1 class="text-3xl font-bold">{{ travel.Name }}</h1>
        <p class="text-lg">🌍 Paese: {{ travel.Country?.Name }}</p>
        <p class="text-md">
          📅 Inizio: {{ new Date(travel.StartDate).toLocaleDateString() }}
        </p>
        <p class="text-md">
          📅 Fine: {{ new Date(travel.EndDate).toLocaleDateString() }}
        </p>
        <br />
      </div>

      <div class="card bg-base-200 shadow-lg p-4">
        <iframe
          v-if="travel.StayURL"
          :src="travel.StayURL"
          width="100%"
          height="300"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
        ></iframe>
        <p v-else class="text-center text-gray-500">Indirizzo non aggiunto</p>
      </div>
    </div>

    <div v-else class="flex justify-center items-center h-screen">
      <button class="btn btn-neutral">
        <span class="loading loading-spinner"></span>
        Caricamento...
      </button>
    </div>
  </div>
</template>
