<script setup lang="ts">
import { Pencil, ExternalLink, Trash2, Link, Link2 } from "lucide-vue-next";
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

const openLink = (url: string) => {
  if (url) {
    window.open(url, "_blank");
  }
};
</script>

<template>
  <div class="relative z-10 bg-gray-900 rounded-lg shadow-md">
    <div class="rounded-lg shadow-lg border border-gray-700 w-full max-h-64 overflow-y-auto">
      <table v-if="usefulLinks?.length" class="table w-full bg-base-100">
        <thead class="sticky top-0 bg-base-100 z-10">
          <tr>
            <th class="text-lg font-bold flex items-center space-x-2">
              <Link class="w-5 h-5" />
              <span>Link utili</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="usefulLink in usefulLinks" :key="usefulLink.id">
            <!-- Titole + Icon -->
            <td class="px-4 py-2">
              <div class="flex items-center space-x-2">
                <CategoryDisplay :categoryId="usefulLink.category ?? 6" />
                <span>{{ usefulLink.title }}</span>
              </div>
            </td>
            <!-- Buttons -->
            <td class="px-4 py-2">
              <div class="flex justify-end space-x-2">
                <button type="button" class="btn btn-sm btn-outline btn-info" @click="openLink(usefulLink.url)">
                  <external-link class="w-4 h-4" />
                </button>
                <button type="button" class="btn btn-sm btn-outline btn-success">
                  <pencil class="w-4 h-4" />
                </button>
                <button type="button" class="btn btn-sm btn-outline btn-error">
                  <trash2 class="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else class="text-center text-gray-500 p-4">Nessuna link registrato</p>
    </div>
  </div>
</template>
