<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { ArrowRightLeft, HandCoins } from "lucide-vue-next";
import axios from "@/src/axios";
import type { CurrencyTableDTO } from "~/models/types";

// API keys & URL
const exchangerateKey = "eed2c806f87fa8f7e4ef7ce6";
const baseCurrency = "EUR";
const exchangeApiUrl = `https://v6.exchangerate-api.com/v6/${exchangerateKey}/latest/${baseCurrency}`;
const currencyApiUrl = "Expenses/currency-tables";

// Stati reattivi
const amount = ref<number | string>("1.00");
const fromCurrency = ref("USD");
const toCurrency = ref(baseCurrency);
const result = ref(0);
const currency = ref<CurrencyTableDTO[]>([]);
const rates = ref<Record<string, number>>({});
const error = ref<string | null>(null);

// Carica le valute disponibili
const fetchCurrency = async () => {
    try {
        const response = await axios.get(currencyApiUrl);
        currency.value = response.data ?? [];
    } catch (err) {
        console.error("Errore nel recupero delle valute:", err);
        error.value = "Errore nel caricamento delle valute.";
    }
};

// Carica i tassi di cambio
const fetchRates = async () => {
    try {
        const response = await fetch(exchangeApiUrl);
        const data = await response.json();
        if (data.result === "success") {
            rates.value = data.conversion_rates;
            convertCurrency(); // Calcola il valore iniziale
        }
    } catch (err) {
        console.error("Errore nel recupero dei tassi di cambio:", err);
        error.value = "Errore nel caricamento dei tassi di cambio.";
    }
};

// Calcolo della conversione
const convertCurrency = () => {
    if (amount.value && rates.value[fromCurrency.value] && rates.value[toCurrency.value]) {
        const amountNumber = parseFloat(amount.value.toString()) || 0;
        result.value = (amountNumber / rates.value[fromCurrency.value]) * rates.value[toCurrency.value];
    } else {
        result.value = 0;
    }
};

const swapCurrencies = () => {
    [fromCurrency.value, toCurrency.value] = [toCurrency.value, fromCurrency.value];
    convertCurrency(); // Ricalcola il risultato dopo lo scambio
};

// Ricalcola automaticamente ogni volta che cambia una delle dipendenze
watch([amount, fromCurrency, toCurrency], convertCurrency);

// Carica dati all'avvio
onMounted(async () => {
    await fetchCurrency();
    await fetchRates();
});
</script>

<template>
    <div class="p-6 rounded-lg shadow-lg w-96">
        <!-- Errore -->
        <p v-if="error" class="text-red-500 text-center mb-3">{{ error }}</p>

        <!-- Input Importo -->
        <input v-model="amount" type="number" placeholder="Inserisci importo" step="0.01"
            class="input input-bordered w-full mb-3 border-gray-300" />

        <!-- Selezione valute -->
        <div class="flex space-x-4 mb-4 items-center justify-center">
            <div class="dropdown w-1/3">
                <label tabindex="0" class="btn m-1 w-full">{{ fromCurrency }}</label>
                <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full">
                    <li v-for="rate in currency" :key="rate.currency">
                        <a @click="fromCurrency = rate.currency">{{ rate.currency }}</a>
                    </li>
                </ul>
            </div>

            <arrow-right-left class="cursor-pointer text-blue-500 transition-transform transform hover:scale-110"
                @click="swapCurrencies" />

            <div class="dropdown w-1/3">
                <label tabindex="0" class="btn m-1 w-full">{{ toCurrency }}</label>
                <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full">
                    <li v-for="rate in currency" :key="rate.currency">
                        <a @click="toCurrency = rate.currency">{{ rate.currency }}</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="text-lg font-semibold text-center flex items-center justify-center">
             {{ result.toFixed(2) }} {{ toCurrency }}
        </div>
    </div>
</template>
