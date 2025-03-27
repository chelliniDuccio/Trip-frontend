<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Plus, X, Users, Wallet, Link, Pencil } from "lucide-vue-next";
import CircleButton from "@/components/button/circle-button.vue";

const props = defineProps({
    id: String,
});

const showAdditionalButtons = ref(false);
const travel = ref<Record<string, any>>({});
const router = useRouter();

function toggleAdditionalButtons() {
    showAdditionalButtons.value = !showAdditionalButtons.value;
}

function redirectToFormWithTravel(travel: Record<string, any>) {
    router.push({
        path: "/travel/form",
        state: { travel },
    });
}

const buttons = [
    { icon: Link, redirect: `/travel/link/${props.id}` },
    { icon: Users, redirect: `/travel/user/${props.id}` },
    { icon: Wallet, redirect: `/travel/expense/${props.id}` },
];
</script>

<template>
    <div class="floating-container z-50">
        <div class="buttons-wrapper flex flex-col items-center">
            <!-- Bottoni aggiuntivi -->
            <transition-group name="fade" tag="div" class="buttons-group z-50">
                <circle-button v-if="showAdditionalButtons" v-for="(button, index) in buttons" :key="`btn-${index}`"
                    :icon="button.icon" :redirect="button.redirect" stacked class="animated-button"
                    :style="{ transitionDelay: `${index * 100}ms` }" />
                <circle-button v-if="showAdditionalButtons" :key="'btn-pencil'" :icon="Pencil" stacked
                    @click="redirectToFormWithTravel(travel)" class="animated-button mt-2"
                    :style="{ transitionDelay: `${buttons.length * 100}ms` }" />
            </transition-group>

            <!-- Pulsante principale -->
            <button @click="toggleAdditionalButtons" class="main-button z-50 mt-5">
                <X v-if="showAdditionalButtons" class="w-8 h-8 rotate-animation" />
                <Plus v-else class="w-8 h-8 rotate-animation" />
            </button>
        </div>
    </div>
</template>

<style scoped>
.floating-container {
    @apply fixed bottom-8 right-8;
}

.buttons-group {
    @apply flex flex-col items-center space-y-3;
    position: absolute;
    bottom: 110%;
    right: 0;
}

.main-button {
    @apply flex items-center justify-center rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-blue-600 w-16 h-16 text-white;
}

.main-button:hover {
    transform: scale(1.05);
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.4s ease;
}

.fade-enter-from {
    opacity: 0;
    transform: translateY(20px) scale(0.8);
}

.fade-enter-to {
    opacity: 1;
    transform: translateY(0) scale(1);
}

.fade-leave-from {
    opacity: 1;
    transform: translateY(0) scale(1);
}

.fade-leave-to {
    opacity: 0;
    transform: translateY(20px) scale(0.8);
}

.rotate-animation {
    transition: transform 0.4s ease;
}

.main-button:active .rotate-animation {
    transform: rotate(180deg);
}
</style>
