<script lang="ts" setup>
import { useRoute } from 'vue-router';
import fileTable from '~/components/links/file-table.vue';

const route = useRoute();
</script>

<template>
  <navbar />
  <div class="card bg-base-100 shadow-xl p-6 relative">
    <links-table :id="route.params.id[0]" />
    <br />
    <file-table :id="route.params.id[0]" />
    <br />
    <div class="flex justify-center space-x-4">
      <button class="btn btn-outline btn-info">Aggiungi Link</button>
      <button class="btn btn-outline btn-success" >Aggiungi File</button>
    </div>
  </div>
</template>
