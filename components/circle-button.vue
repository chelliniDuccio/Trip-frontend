<script setup lang="ts">
import { defineProps, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  icon: Object, // L'icona dinamica
  color: { type: String, default: "#005de8" }, // Colore del bottone
  action: Function, // Azione personalizzata
  redirect: String, // URL di redirect opzionale
  size: { type: String, default: "60px" }, // Dimensione personalizzabile
  circle: { type: Boolean, default: true }, // Se true, rende il bottone circolare
  fixed: { type: Boolean, default: true }, // Se true, lo posiziona in pagina
  position: { 
    type: String, 
    default: "bottom-left", 
    validator: (val: string) => 
      ["bottom-left", "bottom-right", "top-left", "top-right"].includes(val) 
  }, // Gestisce la posizione
});

// Mappa per il posizionamento dinamico
const positionClasses = computed(() => {
  if (!props.fixed) return ""; // Se fixed è false, non applichiamo posizionamento
  const positions: Record<string, string> = {
    "bottom-left": "bottom-8 left-8",
    "bottom-right": "bottom-8 right-8",
    "top-left": "top-8 left-8",
    "top-right": "top-8 right-8"
  };
  return positions[props.position] || "";
});

const handleClick = () => {
  if (props.redirect) {
    router.push(props.redirect);
  } else if (props.action) {
    props.action();
  }
};
</script>

<template>
  <button
    :class="[
      'shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center',
      circle ? 'btn btn-circle' : 'btn',
      fixed ? ['fixed', positionClasses] : ''
    ]"
    :style="{ backgroundColor: color, width: size, height: size }"
    @click="handleClick"
  >
    <component :is="icon" class="w-8 h-8 text-white" />
    <slot v-if="!circle"></slot> 
  </button>
</template>
