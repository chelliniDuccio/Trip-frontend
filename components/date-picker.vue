<script setup>
import { ref } from 'vue';

const props = defineProps({
    label: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    placeholder: {
        type: String,
        default: "Seleziona una data"
    },
    modelValue: {
        type: String,
        required: true
    }
});

const isCalendarVisible = ref(false);
const dateText = ref(props.modelValue);

// Funzione per alternare la visibilità del calendario
const toggleCalendar = () => {
    isCalendarVisible.value = !isCalendarVisible.value;
};

// Gestione dell'evento di selezione data
const onDateChange = (event) => {
    dateText.value = event.target.value;
    isCalendarVisible.value = false;
    // Emit the selected date to the parent component
    emit('update:modelValue', dateText.value);
};
</script>

<template>
    <div class="relative">
        <label class="block text-sm font-medium">{{ label }}</label>
        <button @click="toggleCalendar" class="input input-bordered w-full" type="button">
            {{ dateText || placeholder }}
        </button>

        <!-- Calendario Popover -->
        <div v-show="isCalendarVisible"
            class="absolute left-1/2 transform -translate-x-1/2 bg-base-100 rounded-box shadow-lg mt-2 z-50 border border-gray-300">
            <calendar-date class="cally content-center border-slate-400" @change="onDateChange">
            <svg aria-label="Precedente" class="fill-current size-4" slot="previous"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M15.75 19.5 8.25 12l7.5-7.5"></path>
            </svg>
            <svg aria-label="Successivo" class="fill-current size-4" slot="next" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <!-- <path d="m8.25 4.5 7.5 7.5-7.5 7.5"></path> -->
            </svg>
            <calendar-month></calendar-month>
            </calendar-date>
        </div>
    </div>
</template>