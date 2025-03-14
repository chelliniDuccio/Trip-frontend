<script setup lang="ts">
import { ref, onMounted, defineProps } from "vue";
import axios from "@/src/axios";
import type { ExpenseStats } from "@/models/types";

const props = defineProps<{ travelId: string }>();
const expenseStats = ref<ExpenseStats | null>(null);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const response = await axios.get(`/expenses/stats/${props.travelId}`);
    expenseStats.value = response.data;
  } catch (err) {
    console.error(err);
    error.value = "Errore nel caricamento delle statistiche di spesa.";
  }
});
</script>

<template>
  <div v-if="error" class="text-center text-red-500 font-bold">{{ error }}</div>
  <div v-else-if="expenseStats" class="relative z-10">
    <div class="stat">
      <div class="stat-title">Spesa Totale</div>
      <div class="stat-value text-primary">
        {{ expenseStats.totalAmount }}{{ expenseStats.travelExpenses.currencySymbol }}
      </div>
    </div>
    <div class="stat">
      <div class="stat-title">Spesa Maggiore</div>
      <div class="stat-value text-secondary">
        {{ expenseStats.travelExpenses.amountSum }}{{ expenseStats.travelExpenses.currencySymbol }}
      </div>
    </div>
    <div class="stat">
      <div class="stat-title">Top Pagatore</div>
      <div class="stat-value" v-if="expenseStats.users.length">
        <img :src="expenseStats.users[0].avatar" alt="Avatar" class="w-10 h-10 rounded-full inline-block" />
        {{ expenseStats.users[0].username }}
      </div>
      <div v-else class="stat-desc text-secondary">Nessun dato disponibile</div>
    </div>
  </div>
  <div v-else class="flex justify-center items-center h-20">
    <span class="loading loading-spinner"></span>
  </div>
</template>
