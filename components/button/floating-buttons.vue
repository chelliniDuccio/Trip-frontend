<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router"; // Import useRouter
import { Plus, X, Users, Wallet, Link, Pencil } from "lucide-vue-next";
import CircleButton from "@/components/button/circle-button.vue";

const showAdditionalButtons = ref(false);
const travel = ref<Record<string, any>>({}); // Define the travel property
const router = useRouter(); // Initialize router

function toggleAdditionalButtons() {
    showAdditionalButtons.value = !showAdditionalButtons.value;
}

// Function to redirect to the form page with travel data
function redirectToFormWithTravel(travel: Record<string, any>) {
    router.push({
        path: "/travel/form",
        state: { travel }, // Pass the travel object as route state
    });
}
</script>

<template>
    <div class="floating-container">
        <!-- Bottoni aggiuntivi -->
        <transition-group v-if="showAdditionalButtons" name="fade" tag="div" class="buttons-group">
            <div class="fixed bottom-28 right-8 flex flex-col space-y-3">
                <circle-button :icon="Link" redirect="/travel/form" stacked />
                <circle-button :icon="Users" redirect="/expenses/form" stacked />
                <circle-button :icon="Wallet" redirect="/links/form" stacked />
                <circle-button :icon="Pencil" @click="redirectToFormWithTravel(travel)" 
                    stacked
                    />
            </div>
        </transition-group>

        <!-- Pulsante principale -->
        <button @click="toggleAdditionalButtons" class="main-button">
            <X v-if="showAdditionalButtons" class="w-8 h-8" />
            <Plus v-else class="w-8 h-8" />
        </button>
    </div>
</template>

<style scoped>
.floating-container {
    @apply fixed bottom-8 right-8 flex flex-col items-center;
    z-index: 9999;
}

.buttons-group {
    @apply flex flex-col items-center space-y-4;
    /* Più spazio tra i bottoni */
    position: absolute;
    bottom: 110%;
    right: 0;
    z-index: 10000;
}

.floating-button {
    @apply w-14 h-14 transition-all duration-300 ease-out;
    /* Bottoni leggermente più grandi */
}

/* Pulsante principale */
.main-button {
    @apply btn btn-circle swap swap-rotate shadow-lg hover:shadow-xl transition-all duration-300 bg-blue-600 w-16 h-16 text-white;
    z-index: 10001;
}

/* Animazioni */
.fade-enter-active,
.fade-leave-active {
    @apply transition-all duration-300 ease-out;
}

.fade-enter-from {
    @apply opacity-0 translate-y-4;
}

.fade-leave-to {
    @apply opacity-0 translate-y-4;
}
</style>
