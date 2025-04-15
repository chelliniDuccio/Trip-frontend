<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { jwtDecode } from "jwt-decode";
import axios from "@/src/axios";
import { useCookie } from '#app';

import Navbar from "@/components/navbar.vue";
import TravelCard from "~/components/travel/travel-card.vue";
import CircleButton from "~/components/button/circle-button.vue";
import LoadingSpinner from "~/components/loading-spinner.vue";
import { Plus, Calculator } from "lucide-vue-next";

const router = useRouter();
const travels = ref(null);
const error = ref(null);

const checkAuth = () => {
  const token = useCookie('token').value;

  if (!token) {
    router.push('/auth/login');
    return false;
  }

  try {
    const decoded = jwtDecode(token as string);
    const isExpired = decoded.exp * 1000 < Date.now();
    if (isExpired) {
      useCookie('token').value = null;
      router.push('/auth/login');
      return false;
    }
    return true;
  } catch (e) {
    console.error('Token non valido:', e);
    useCookie('token').value = null;
    router.push('/auth/login');
    return false;
  }
};

const fetchTravels = async () => {
  try {
    const userCookie = useCookie('user').value; // Recupera il valore del cookie 'user'
    if (!userCookie) {
      throw new Error("User cookie not found.");
    }

    const userId = userCookie.id; // Estrai l'ID utente

    if (!userId) {
      throw new Error("User ID not found in the cookie.");
    }

    // Effettua la richiesta con l'ID utente
    const response = await axios.get(`Travels/user/${userId}`);
    travels.value = response.data ? response.data : [];
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
    error.value = "Errore nel caricamento dei dati. Riprova più tardi.";
  }
};

onMounted(() => {
  if (checkAuth()) {
    fetchTravels();
  }
});
</script>


<template>
  <Navbar />
  <div class="pt-10">
    <!-- Se sta ancora caricando -->
    <div v-if="travels === null" class="flex items-center justify-center h-screen">
      <LoadingSpinner />
    </div>

    <!-- Se c'è un errore -->
    <div v-if="error" class="text-center text-red-500 font-bold">{{ error }}</div>
    <!-- Se ci sono dati -->
    <div v-else-if="travels" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
      <TravelCard v-for="travel in travels" :key="travel.id" :travel="travel" />
    </div>
    <!-- Se non ci sono viaggi disponibili -->
    <div v-else class="text-center text-gray-500 font-semibold mt-10">
      Nessun viaggio disponibile.
    </div>

    <circle-button :icon="Plus" redirect="travel/form" position="bottom-right" />
    <circle-button :icon="Calculator" redirect="/calculator" position="bottom-left" />

  </div>
</template>
