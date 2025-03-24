<template>
  <button :class="[
    'shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center',
    circle ? 'btn btn-circle' : 'btn',
    stacked ? '' : 'fixed',
    positionClasses
  ]" :style="{ backgroundColor: color, width: size, height: size, zIndex: 9999 }" @click="handleClick">
    <component :is="icon" class="w-8 h-8 text-white" />
  </button>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  icon: Object,
  color: { type: String, default: "#005de8" },
  action: Function,
  redirect: String,
  size: { type: String, default: "60px" },
  circle: { type: Boolean, default: true },
  stacked: { type: Boolean, default: false }, // Nuova prop per gestire bottoni impilati
  position: {
    type: String,
    default: "",
    validator: (val: string) =>
      ["bottom-left", "bottom-right", "top-left", "top-right"].includes(val)
  },
});

const positionClasses = computed(() => {
  if (props.stacked) return "relative"; // Permette lo stacking senza fixed
  const positions: { [key: string]: string } = {
    "bottom-left": "bottom-8 left-8",
    "bottom-right": "bottom-8 right-8",
    "top-left": "top-8 left-8",
    "top-right": "top-8 right-8"
  };
  return positions[props.position as keyof typeof positions] || "";
});

const handleClick = () => {
  if (props.redirect) {
    router.push(props.redirect);
  } else if (props.action) {
    props.action();
  }
};
</script>
