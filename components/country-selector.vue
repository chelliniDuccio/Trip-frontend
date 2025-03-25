<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "@/src/axios";
import type { Country } from "~/models/types";

// Stato per i paesi e l'errore
const countries = ref<Country[]>([]);
const error = ref<string | null>(null);
const isDropdownOpen = ref(false); // Stato per il dropdown

// Funzione per caricare i paesi
const fetchCountries = async () => {
  try {
    const response = await axios.get("/Countries");
    countries.value = response.data;
  } catch (err) {
    error.value = "Errore nel caricamento dei paesi.";
  }
};

onMounted(fetchCountries);

const props = defineProps({
  selectedCountryId: {
    type: Number,
    required: true
  },
  onSelect: {
    type: Function,
    required: true
  }
});

// Funzione per selezionare un paese
const selectCountry = (countryId: number) => {
  props.onSelect(countryId);
  isDropdownOpen.value = false; // Chiudi il dropdown
};
</script>

<template>
  <div>
    <label class="block text-sm font-medium">Paese</label>
    <div class="dropdown w-full" :class="{ 'dropdown-open': isDropdownOpen }">
      <label tabindex="0" class="btn btn-outline w-full flex justify-between" @click="isDropdownOpen = !isDropdownOpen">
        <div class="flex items-center">
          {{countries.find(country => country.id === props.selectedCountryId)?.name || 'Seleziona un paese'}}
        </div>
      </label>
      <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full max-h-60 overflow-auto">
        <li v-for="country in countries" :key="country.id">
          <button @click="selectCountry(country.id)" type="button"
            class="flex items-center gap-2 w-full text-left p-2 hover:bg-gray-100 rounded-md">
            <img :src="country.Flag" :alt="'Bandiera di ' + country.name"
              class="w-6 h-4 object-cover border border-gray-300 rounded" />
            {{ country.name }}
          </button>
        </li>
      </ul>
    </div>
    <div v-if="error" class="text-red-500">{{ error }}</div>
  </div>
</template>
