<template>
  <div class="w-full mb-8 overflow-hidden rounded-lg shadow-xs">
    <div class="w-full overflow-x-auto">
      <table class="w-full whitespace-no-wrap">
        <thead>
          <tr
            class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
          >
            <template v-for="column in columns" :key="column">
              <th class="px-4 py-3">{{ column.label }}</th>
            </template>
          </tr>
        </thead>
        <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
          <template v-if="data.length">
            <tr
              v-for="item in data"
              :key="item"
              class="text-gray-700 dark:text-gray-400"
            >
              <td v-for="column in columns" :key="column" class="px-4 py-3">
                {{ item[column.key] }}
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td
                :colspan="columns.length"
                class="text-center py-6 md:py-48 text-gray-500"
              >
                Sem registros disponíveis.
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <div
      class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800"
    >
      <slot name="paginate" />
    </div>
  </div>
</template>

<script setup  lang='ts'>
import { onMounted } from "vue";

defineProps({
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    default: () => [],
  },
});
</script>