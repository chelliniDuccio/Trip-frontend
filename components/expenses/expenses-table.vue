<script setup lang="ts">
import { Pencil } from "lucide-vue-next";
import type { Expense } from "@/models/types";

defineProps<{
  expenses: Expense[];
}>();

const formatAmount = (amount: number | undefined) => {
  if (typeof amount === 'number' && !isNaN(amount)) {
    return amount.toFixed(2); // Formatta il numero con due decimali
  } else {
    return 'N/A'; // Mostra "N/A" se il valore non è un numero valido
  }
};
</script>

<template>
  <div class="relative z-10 bg-gray-900 rounded-lg shadow-md">
    <!-- Added wrapper div with same styling as stay location -->
    <div class="overflow-y-auto rounded-lg shadow-lg border border-gray-700 w-full"> <!-- Updated styling -->
      <table v-if="expenses?.length" class="table w-full bg-base-100">
        <thead class="sticky top-0 bg-base-100 z-10">
          <tr>
            <th>Utente</th>
            <th>Descrizione</th>
            <th>Importo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="expense in expenses" :key="expense.id">
            <td>
              <div class="flex items-center justify-center w-8 h-8 bg-neutral text-neutral-content rounded-full border border-neutral-content">
                <span class="text-xs">{{ expense.PaidByUser?.Avatar }}</span>
              </div>
            </td>
            <td>{{ expense.Description }}</td>
            <td class="px-5 py-4 whitespace-nowrap">{{ formatAmount(expense.Amount) }} {{ expense.CurrencySymbol }}</td>
            <td class="px-1 py-1">
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
