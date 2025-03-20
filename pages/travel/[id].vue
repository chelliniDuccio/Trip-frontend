<script setup lang="ts">
import { useRoute } from "#app";
import { ref, onMounted } from "vue";
import { PlaneTakeoff, PlaneLanding, MapPin, Plus, X } from "lucide-vue-next";
import axios from "@/src/axios";
import type { Travel, Expense } from "@/models/types";

const route = useRoute();
const travel = ref<Travel | null>(null);
const expenses = ref<Expense[]>([]);

const error = ref<string | null>(null);
const showAdditionalButtons = ref(false);

onMounted(async () => {
  try {
    const travelResponse = await axios.get(
      `Travels?$filter=id eq ${route.params.id}&$expand=Country`
    );
    if (travelResponse.data.length) {
      travel.value = travelResponse.data[0];
    }

    const expensesResponse = await axios.get(
      `Expenses?$filter=travelId eq ${route.params.id}&$expand=paidByUser($select=Avatar)`
    );
    expenses.value = Array.isArray(expensesResponse.data) ? expensesResponse.data : [];

  } catch (err) {
    console.error(err);
    error.value = "Errore nel caricamento dei dati. Riprova più tardi.";
  }
});

function toggleAdditionalButtons() {
  showAdditionalButtons.value = !showAdditionalButtons.value;
}
</script>

<template>
  <navbar />
  <div class="container mx-auto p-6 relative min-h-screen">
    <div v-if="error" class="text-center text-red-500 font-bold">{{ error }}</div>

    <div v-else-if="travel" class="card bg-base-100 shadow-xl p-6 relative">
      <div class="absolute inset-0 bg-cover bg-center blur-lg opacity-20"
        :style="{ backgroundImage: `url(${travel.Country?.Flag})` }" />

      <div class="relative z-10">
        <h1 class="text-3xl font-bold flex items-center">
          <map-pin class="w-5 h-5 mr-2" />{{ travel.Name }}
        </h1>
        <p class="text-md flex items-center">
          <plane-takeoff class="w-5 h-5 mr-2" /> Inizio: {{ new Date(travel.StartDate).toLocaleDateString() }}
        </p>
        <p class="text-md flex items-center">
          <plane-landing class="w-5 h-5 mr-2" /> Fine: {{ new Date(travel.EndDate).toLocaleDateString() }}
        </p>
      </div>

      <br />
      <expenses-table :expenses="expenses" />
      <br />
      <travel-stay-location :stayURL="travel.StayURL" />
      <br />
      <expenses-stats :travelId="route.params.id[0]" />
    </div>

    <div v-else class="flex justify-center items-center h-screen">
      <button class="btn btn-neutral">
        <span class="loading loading-spinner"></span>
        Caricamento...
      </button>
    </div>

    <!-- Bottoni fluttuanti -->
    <div class="fixed bottom-8 right-8 flex flex-col items-end space-y-3">
      <!-- Bottoni aggiuntivi -->
      <transition-group name="fade" tag="div" class="flex flex-col items-end space-y-2">
        <button v-if="showAdditionalButtons" class="btn btn-primary w-48 shadow-md">Aggiungi Spesa</button>
        <button v-if="showAdditionalButtons" class="btn btn-secondary w-48 shadow-md">Modifica Viaggio</button>
        <button v-if="showAdditionalButtons" class="btn btn-accent w-48 shadow-md">Statistiche</button>
      </transition-group>

      <!-- Pulsante principale -->
      <button @click="toggleAdditionalButtons"
        class="btn btn-circle swap swap-rotate shadow-lg hover:shadow-xl transition-all duration-300 bg-blue-600 w-16 h-16 text-white">
        <input type="checkbox" />
        <Plus class="swap-off w-8 h-8" />
        <X class="swap-on w-8 h-8" />
      </button>
    </div>
  </div>
</template>

<style>
/* Animazione Tailwind */
.fade-enter-active, .fade-leave-active {
  @apply transition-all duration-300 ease-out;
}
.fade-enter-from, .fade-leave-to {
  @apply opacity-0 translate-y-2;
}
</style>
