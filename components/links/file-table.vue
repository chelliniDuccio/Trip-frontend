<script setup lang="ts">
import { Pencil, File, Trash2, Download } from "lucide-vue-next";
import type { SharedFile } from "@/models/types";
import axios from "@/src/axios";

const props = withDefaults(defineProps<{
  id: string;
  showEdit?: boolean;
}>(), {
  showEdit: true,
});

const sharedFiles = ref<SharedFile[]>([]);


onMounted(async () => {
  try {
    const sharedFilesResponse = await axios.get(
      `SharedFiles?$filter=travelId eq ${props.id}`
    );
    sharedFiles.value = Array.isArray(sharedFilesResponse.data) ? sharedFilesResponse.data : [];

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
      <table v-if="sharedFiles?.length" class="table w-full bg-base-100">
        <thead class="sticky top-0 bg-base-100 z-10">
          <tr>
            <th class="text-lg font-bold flex items-center space-x-2">
              <file class="w-5 h-5" />
              <span>File condivisi</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="sharedFile in sharedFiles" :key="sharedFile.id">
            <!-- Titole + Icon -->
            <td class="px-4 py-2">
              <div class="flex items-center space-x-2">
                <CategoryDisplay :categoryId="sharedFile.category ?? 6" />
                <span>{{ sharedFile.fileName }}</span>
              </div>
            </td>
            <!-- Buttons -->
            <td class="px-4 py-2">
              <div class="flex justify-end space-x-2">
                <button type="button" class="btn btn-sm btn-outline btn-primary">
                  <download class="w-4 h-4" />
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
      <p v-else class="text-center text-gray-500 p-4">Nessuna spesa registrata</p>
    </div>
  </div>
</template>
