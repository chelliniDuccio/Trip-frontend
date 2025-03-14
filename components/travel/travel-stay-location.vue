<script setup lang="ts">
defineProps<{
  stayURL: string | null
}>();
</script>

<template>
  <div class="relative z-10 bg-gray-900 rounded-lg shadow-md">
    <iframe v-if="stayURL" :src="stayURL" width="100%" height="300" class="rounded-lg shadow-lg border border-gray-700"
      allowfullscreen="true" loading="lazy" />
    <p v-else class="text-center text-gray-500">
      Indirizzo non aggiunto
    </p>
  </div>
</template>