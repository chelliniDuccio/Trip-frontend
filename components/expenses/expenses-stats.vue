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
      <div class="stat-value text-primary">{{ expenseStats?.totalAmount }}{{ expenseStats?.travelExpenses.currencySymbol
        }}</div>
    </div>
    <div class="stat">
      <div class="stat-title">Spesa Maggiore</div>
      <div class="avatar-group -space-x-6">
        <div v-for="user in expenseStats?.users" :key="user.id" class="avatar">
          <div class="avatar avatar-placeholder">
            <div
              class="flex items-center justify-center w-8 h-8 bg-neutral text-neutral-content">
              <span class="text-xs">{{ user.avatar }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="stat-value">{{ expenseStats?.travelExpenses.amountSum }}{{ expenseStats?.travelExpenses.currencySymbol
        }}</div>
    </div>
  </div>
</template>
