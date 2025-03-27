<script setup lang="ts">
import { Pencil } from "lucide-vue-next";
import type { UsefulLink } from "@/models/types";
import axios from "@/src/axios";

const props = withDefaults(defineProps<{
  id: string;
  showEdit?: boolean;
}>(), {
  showEdit: true,
});

const usefulLinks = ref<UsefulLink[]>([]);


onMounted(async () => {
  try {
    const usefulLinksResponse = await axios.get(
      `UsefulLinks?$filter=travelId eq ${props.id}`
    );
    usefulLinks.value = Array.isArray(usefulLinksResponse.data) ? usefulLinksResponse.data : [];

  } catch (err) {
    console.error(err);
  }
});

const formatAmount = (amount: number | undefined) => {
  return typeof amount === "number" && !isNaN(amount) ? amount.toFixed(2) : "N/A";
};
</script>

<template>
  <div class="relative z-10 bg-gray-900 rounded-lg shadow-md">
    <div class="rounded-lg shadow-lg border border-gray-700 w-full max-h-64 overflow-y-auto">
      <table v-if="usefulLinks?.length" class="table w-full bg-base-100">
        <thead class="sticky top-0 bg-base-100 z-10">
          <tr>
            <th>Titolo</th>
            <th>Link</th>
            <th>Categotia</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="usefulLink in usefulLinks" :key="usefulLink.id">
            <td>{{ usefulLink.title }}</td>
            <td><a class="link link-primary" :href="usefulLink.url">link</a></td>
            <td>{{ usefulLink.category }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else class="text-center text-gray-500 p-4">Nessuna spesa registrata</p>
    </div>
  </div>
</template>
