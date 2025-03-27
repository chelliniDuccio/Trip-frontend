<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <navbar />
  <div class="card bg-base-100 shadow-xl p-6 relative">
    <links-table :id="route.params.id[0]" />

  </div>
</template>
