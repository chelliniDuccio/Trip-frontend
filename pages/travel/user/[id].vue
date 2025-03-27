<script lang="ts" setup>
const route = useRoute();
</script>

<template>
  <navbar />
  <div class="card bg-base-100 shadow-xl p-6 relative">
    <expenses-table :id="route.params.id[0]" />
    <br>
    <expenses-stats :travelId="route.params.id[0]" />
  </div>
</template>
