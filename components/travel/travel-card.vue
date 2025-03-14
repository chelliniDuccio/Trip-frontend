<!-- components/TravelCard.vue -->
<script setup>
import { computed } from "vue";
import { PlaneTakeoff, PlaneLanding, MapPin, Backpack, Info } from "lucide-vue-next";

const props = defineProps({
  travel: Object,
});

const redirectToTravel = (id) => {
  window.location.href = `/travel/${id}`;
};
</script>

<template>
  <div class="p-4 flex justify-center">
    <div
      class="relative w-full max-w-xs shadow-xl rounded-xl overflow-hidden cursor-pointer transition-transform transform hover:scale-105">
      
      <!-- Sfondo bandiera -->
      <div :style="{ backgroundImage: `url(${props.travel.Country.Flag})` }" 
           class="absolute inset-0 bg-no-repeat bg-cover bg-center opacity-30"></div>

      <!-- Contenuto della card -->
      <div class="relative p-6 bg-black bg-opacity-20 text-white rounded-xl flex flex-col gap-2">
        <h1 class="text-2xl font-bold flex items-center">
          <MapPin :size="20" class="mr-2" /> {{ travel.Name }}
        </h1>
        <p class="text-md flex items-center">
          <Backpack :size="20" class="mr-2" /> Nazione: {{ travel.Country.Name }}
        </p>
        <p class="text-md flex items-center">
          <PlaneTakeoff :size="20" class="mr-2" /> Inizio:
          {{ new Date(travel.StartDate).toLocaleDateString() }}
        </p>
        <p class="text-md flex items-center">
          <PlaneLanding :size="20" class="mr-2" /> Fine:
          {{ new Date(travel.EndDate).toLocaleDateString() }}
        </p>

        <!-- Bottone info -->
        <button class="btn btn-ghost absolute bottom-2 right-2 flex items-center gap-1"
          @click="redirectToTravel(travel.Id)">
          <Info :size="20" />
        </button>
      </div>
    </div>
  </div>
</template>

