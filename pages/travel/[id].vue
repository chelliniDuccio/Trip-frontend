<script setup lang="ts">
import { useRoute } from "#app";
import { ref, onMounted } from "vue";
import { PlaneTakeoff, PlaneLanding, MapPin } from "lucide-vue-next";
import axios from "@/src/axios";
import type { Travel, Expense } from "@/models/types";

const route = useRoute();
const travel = ref<Travel | null>(null);
const expenses = ref<Expense[]>([]);

const error = ref<string | null>(null);

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
</script>

<template>
  <navbar />
  <div class="container mx-auto p-6">
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

      <travel-stay-location :stayURL="travel.StayURL" />

      <expenses-stats :travelId="route.params.id[0]" />

    </div>
    <div v-else class="flex justify-center items-center h-screen">
      <button class="btn btn-neutral">
        <span class="loading loading-spinner"></span>
        Caricamento...
      </button>
    </div>
  </div>
</template>
