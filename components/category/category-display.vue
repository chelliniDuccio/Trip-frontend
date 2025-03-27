<script setup lang="ts">
import { computed } from "vue";
import { CategoryMap } from "~/models/types";

interface Props {
  categoryId: number;
}

const props = defineProps<Props>();

const category = computed(() => CategoryMap[props.categoryId] ?? null);
</script>

<template>
    <component :is="category?.icon" class="w-5 h-5 text-blue-500" />
</template>
