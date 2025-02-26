<script setup>
import { useRoute } from "#app";
import { ref, onMounted } from "vue";

const route = useRoute();
const travel = ref(null);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await fetch(
      `https://localhost:44355/api/Travels?$filter=id eq ${route.params.id}&$expand=Country`
    );
    if (!response.ok) throw new Error("Errore nel recupero dei dati");

    const data = await response.json();
    travel.value = data.length ? data[0] : null;
  } catch (err) {
    console.error(err);
    error.value = "Errore nel caricamento dei dati. Riprova più tardi.";
  }
});
</script>

<template>
  <Navbar />
  <div class="container mx-auto p-6">
    <div v-if="error" class="text-center text-red-500 font-bold">{{ error }}</div>

    <div v-else-if="travel" class="card bg-base-100 shadow-xl p-6 relative">
      <!-- Sfondo bandiera -->
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
        <p class="text-md">📍 Indirizzo Soggiorno: {{ travel.StayAddress }}</p>
        <br />
        <router-link to="/travel" class="btn btn-neutral mt-4"
          >Torna ai viaggi</router-link
        >
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
