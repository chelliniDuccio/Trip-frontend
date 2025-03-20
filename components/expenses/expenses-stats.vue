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
<div class="stats shadow">
  <div class="stat">
    <div class="stat-figure text-primary">
    </div>
    <div class="stat-title">Spesa Totale</div>
    <div class="stat-value text-primary">{{expenseStats?.totalAmount}}{{ expenseStats?.travelExpenses.currencySymbol }}</div>
  </div>
  <div class="stat">
    <div class="stat-figure text-secondary">
      <div class="avatar online">
        <div class="w-16 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
    </div>
    <div class="stat-title">Spesa Maggiore</div>
    <div class="stat-value">{{ expenseStats?.travelExpenses.amountSum }}{{ expenseStats?.travelExpenses.currencySymbol }}</div>
  </div>
</div>
</template>
