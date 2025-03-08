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
  <div class="overflow-x-auto p-4">
    <div class="max-h-56 overflow-y-auto rounded-lg shadow-md">
      <table v-if="expenses?.length" class="table w-full bg-base-100">
        <thead>
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
              <div
                class="flex items-center justify-center w-8 h-8 bg-neutral text-neutral-content rounded-full border border-neutral-content"
              >
                <span class="text-xs">{{ expense.PaidByUser?.Avatar }}</span>
              </div>
            </td>
            <td>{{ expense.Description }}</td>
            <td class="px-6 py-4 text-right whitespace-nowrap">
              {{ formatAmount(expense.Amount) }} {{ expense.CurrencySymbol }}
            </td>
            <td>
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
