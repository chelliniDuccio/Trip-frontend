<script setup lang="ts">
import { Pencil } from "lucide-vue-next";
import type { Expense } from "@/models/types";
import axios from "@/src/axios";

const props = withDefaults(defineProps<{
  id: string;
  showEdit?: boolean;
}>(), {
  showEdit: true,
});

const expenses = ref<Expense[]>([]);


onMounted(async () => {
  try {
    const expensesResponse = await axios.get(
      `Expenses?$filter=travelId eq ${props.id}&$expand=paidByUser($select=Avatar)`
    );
    expenses.value = Array.isArray(expensesResponse.data) ? expensesResponse.data : [];

  } catch (err) {
    console.error(err);
  }
});

const formatAmount = (amount: number | undefined) => {
  return typeof amount === "number" && !isNaN(amount) ? amount.toFixed(2) : "N/A";
};
</script>

<template>
  <div class="relative z-10 bg-gray-900 rounded-lg shadow-md">
    <div class="rounded-lg shadow-lg border border-gray-700 w-full max-h-64 overflow-y-auto">
      <table v-if="expenses?.length" class="table w-full bg-base-100">
        <thead class="sticky top-0 bg-base-100 z-10">
          <tr>
            <th>Utente</th>
            <th>Descrizione</th>
            <th>Importo</th>
            <th v-if="showEdit !== false"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="expense in expenses" :key="expense.id">
            <td>
              <div
                class="flex items-center justify-center w-7 h-7 bg-neutral text-neutral-content rounded-full border border-neutral-content">
                <span class="text-xs">{{ expense.PaidByUser?.Avatar }}</span>
              </div>
            </td>
            <td class="flex items-center space-x-2">
              <CategoryDisplay :categoryId="expense.Category ?? 6" />
              <span>{{ expense.Description }}</span>
            </td>
            <td class="px-5 py-4 whitespace-nowrap">{{ formatAmount(expense.Amount) }} {{ expense.CurrencySymbol }}</td>
            <td v-if="showEdit !== false" class="px-1 py-1">
              <button class="btn btn-ghost btn-xs items-center justify-center">
                <Pencil class="w-5 h-5 text-blue-500" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else class="text-center text-gray-500 p-4">Nessuna spesa registrata</p>
    </div>
  </div>
</template>
