<template>
  <div class="w-full mb-8 overflow-hidden rounded-lg shadow-xs">
    <div class="w-full overflow-x-auto">
      <table class="w-full whitespace-no-wrap">
        <thead>
          <tr
            class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
          >
            <template v-for="column in columns" :key="column">
              <th class="px-4 py-3" :class="`text-${column?.align}`">{{ column.label }}</th>
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
                <span v-if="column?.type === 'user'" class="flex">
                  <div
                    class="relative hidden w-8 h-8 mr-3 rounded-full md:block"
                  >
                    <img
                      v-if="item[column.key]?.picture"
                      class="object-cover w-full h-full rounded-full"
                      :src="item[column.key]?.picture"
                      :alt="item[column.key]?.name"
                      loading="lazy"
                    />
                    <Icon
                      name="ph:user-bold"
                      class="object-cover w-full h-full rounded-full"
                    />
                    <div
                      class="absolute inset-0 rounded-full shadow-inner"
                      aria-hidden="true"
                    ></div>
                  </div>
                  <div>
                    <p class="font-semibold">{{ item[column.key].name }}</p>
                    <p class="text-xs text-gray-600 dark:text-gray-400">
                      {{ item[column.key].phone ?? '-' }}
                    </p>
                  </div>
                </span>
                <span class="capitalize" :class="`text-${column?.align}`" v-else>
                  {{ getNormalized(item[column.key], column?.type) }}
                </span>
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

const getNormalized = (value: any, type: string) => {
  let data = "";
  switch (type) {
    case "date":
      const date = new Date(value);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear().toString();

      data = `${day}/${month}/${year}`;
      break;
    case "double":
      data = value.toFixed(2);
      break;
    default:
      data = value;
      break;
  }
  console.log(data);
  return data;
};
</script>