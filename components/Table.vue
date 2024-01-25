<template>
  <div class="w-full mb-4 sm:mb-8 overflow-hidden rounded-lg shadow-xs">
    <div class="w-full">
      <div class="flex gap-2 items-end mb-2">
        <IconButton
          v-if="hasMultipleView"
          class="ml-auto"
          @click="$emit('change-view')"
          icon="mdi:calendar-blank"
        />

        <IconButton
          v-if="!hideCreate"
          :class="{ 'ml-auto': !hasMultipleView }"
          @click="$emit('create', item)"
          label="Criar"
          icon="material-symbols:add"
        />
      </div>
    </div>
    <div class="w-full overflow-x-auto">
      <slot name="content">
        <table class="w-full whitespace-no-wrap">
          <thead>
            <tr
              class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
            >
              <template v-for="column in columns" :key="column">
                <th class="px-4 py-3">
                  <div :class="`flex justify-${column?.align}`">
                    <span class="flex gap-1" style="text-wrap: nowrap">
                      {{ column.label }}
                      <a
                        v-if="column?.sort"
                        class="inline-flex items-center text-sm font-semibold rounded-full cursor-pointer"
                        :class="{ 'opacity-50': sorted?.key !== column.key }"
                      >
                        <Icon
                          v-if="sorted?.order === 1"
                          name="material-symbols:expand-less"
                          class="flex-shrink-0 h-4 w-4"
                          aria-hidden="true"
                          @click="
                            $emit('sort-changed', {
                              sort: {
                                key: column.key,
                                order: -1,
                              },
                            })
                          "
                        />
                        <Icon
                          v-else
                          name="material-symbols:expand-more"
                          class="flex-shrink-0 h-4 w-4"
                          aria-hidden="true"
                          @click="
                            $emit('sort-changed', {
                              sort: {
                                key: column.key,
                                order: 1,
                              },
                            })
                          "
                        />
                      </a>
                    </span>
                  </div>
                </th>
              </template>
              <th
                v-if="!hideUpdate || !hideDelete"
                class="px-4 py-3 text-center"
              >
                Ações
              </th>
            </tr>
          </thead>
          <tbody
            class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
          >
            <template v-if="loading">
              <tr>
                <td
                  :colspan="columns.length"
                  class="text-center py-6 md:py-48 text-gray-500"
                >
                  <div class="loading-container">
                    <div class="loader"></div>
                  </div>
                </td>
              </tr>
            </template>
            <template v-else-if="data.length">
              <tr
                v-for="item in data"
                :key="item"
                class="text-gray-700 dark:text-gray-400"
              >
                <td
                  v-for="column in columns"
                  :key="column"
                  class="px-2 sm:px-4 py-2 sm:py-3 text-sm sm:text-base"
                  :class="`text-${column?.align}`"
                  style="text-wrap: nowrap"
                >
                  <slot
                    :name="`row_${item[column.key]}`"
                    v-bind="{ column, item }"
                  >
                    <span v-if="column?.type === 'user'" class="flex">
                      <div
                        v-if="item[column.key]"
                        class="relative w-8 h-8 mr-3 rounded-full md:block"
                      >
                        <TableAvatar
                          :src="item[column.key]?.picture"
                          :alt="item[column.key]?.name"
                        />
                      </div>
                      <div v-if="item[column.key]">
                        <p
                          class="font-semibold"
                          :class="{ capitalize: item[column.key]?.name }"
                        >
                          {{
                            item[column.key]?.name ?? item[column.key]?.email
                          }}
                        </p>
                        <p class="text-xs text-gray-600 dark:text-gray-400">
                          {{ item[column.key].phone ?? "-" }}
                        </p>
                      </div>
                    </span>
                    <span v-else-if="column?.type === 'client'" class="flex">
                      <div
                        v-if="item[column.key]"
                        class="relative w-8 h-8 mr-3 rounded-full md:block"
                      >
                        <TableAvatar
                          :alt="item[column.key]?.name"
                          :src="item[column.key]?.picture"
                        />
                      </div>
                      <div v-if="item[column.key]">
                        <p class="font-semibold">
                          {{ item[column.key].email }}
                        </p>
                        <p class="text-xs text-gray-600 dark:text-gray-400">
                          {{ item[column.key].phone ?? "-" }}
                        </p>
                      </div>
                    </span>
                    <span
                      v-else-if="column?.type === 'picture'"
                      class="flex items-center"
                    >
                      <div
                        class="relative hidden w-8 h-8 mr-3 rounded-full md:block"
                      >
                        <TableAvatar :alt="item?.name" :src="item?.picture" />
                      </div>
                      <div>
                        <p class="font-semibold">{{ item?.name }}</p>
                      </div>
                    </span>
                    <template v-else-if="column?.type === 'status'">
                      <span
                        v-if="column?.validate(item)?.approved"
                        class="px-3 py-1 font-semibold leading-tight text-black bg-green-500 rounded-full dark:bg-green-700 dark:text-green-100"
                      >
                        <template v-if="!column?.withoutText">
                          {{ getNormalized(item[column.key], column?.type) }}
                        </template>
                      </span>
                      <span
                        v-if="column?.validate(item)?.danger"
                        class="px-3 py-1 font-semibold leading-tight text-black bg-red-500 rounded-full dark:bg-red-700 dark:text-green-100"
                      >
                        <template v-if="!column?.withoutText">
                          {{ getNormalized(item[column.key], column?.type) }}
                        </template>
                      </span>
                      <span
                        v-if="column?.validate(item)?.warning"
                        class="px-3 py-1 font-semibold leading-tight text-black bg-yellow-500 rounded-full dark:bg-yellow-700 dark:text-green-100"
                      >
                        <template v-if="!column?.withoutText">
                          {{ getNormalized(item[column.key], column?.type) }}
                        </template>
                      </span>
                    </template>
                    <span class="" v-else>
                      {{ getNormalized(item[column.key], column?.type) }}
                    </span>
                  </slot>
                </td>
                <td v-if="!hideUpdate || !hideDelete" class="sm:w-32">
                  <div class="flex justify-center w-full gap-1">
                    <button
                      v-if="!hideUpdate"
                      class="inline-flex items-center text-sm font-semibold transition duration-200 ease-in hover:bg-sky-500 hover:text-white rounded-full px-1 py-1 sm:px-2 sm:py-2"
                      @click="$emit('update', item)"
                    >
                      <Icon
                        name="material-symbols:edit-outline"
                        class="flex-shrink-0 h-5 w-5 h-6 w-6"
                        aria-hidden="true"
                      />
                    </button>

                    <button
                      v-if="!hideDelete"
                      class="inline-flex items-center text-sm font-semibold transition duration-200 ease-in hover:bg-sky-500 hover:text-white rounded-full px-1 py-1 sm:px-2 sm:py-2"
                      @click="$emit('delete', item)"
                    >
                      <Icon
                        name="material-symbols:ink-eraser-outline"
                        class="flex-shrink-0 h-5 w-5 sm:h-6 sm:w-6"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
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
      </slot>
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

const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  hideCreate: {
    type: Boolean,
    default: false,
  },
  hideUpdate: {
    type: Boolean,
    default: false,
  },
  hideDelete: {
    type: Boolean,
    default: false,
  },
  hasMultipleView: {
    type: Boolean,
    default: false,
  },
  sorted: {
    type: Object,
    default: () => ({}),
  },
});

const getNormalized = (value: any, type: string) => {
  let data = "";
  const dayOfWeek = [
    { label: "Domingo", value: "0" },
    { label: "Segunda-feira", value: "1" },
    { label: "Terça-feira", value: "2" },
    { label: "Quarta-feira", value: "3" },
    { label: "Quinta-feira", value: "4" },
    { label: "Sexta-feira", value: "5" },
    { label: "Sábado", value: "6" },
  ];

  switch (type) {
    case "date":
      if (value) {
        const date = new Date(value);
        date.setHours(date.getHours() + 3);

        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear().toString();

        data = `${day}/${month}/${year}`;
      }
      break;
    case "double":
      data = value?.toFixed(2) ?? "";
      break;
    case "minutes":
      data = value ? `${value} min` : "";
      break;
    case "dayOfWeek":
      data = value ? dayOfWeek[value].label : "";
      break;
    default:
      data = value;
      break;
  }
  return data;
};
</script>


<style scoped>
::-webkit-scrollbar-track {
  background-color: #fffefe;
}
::-webkit-scrollbar {
  height: 5px;
  background: #f4f4f4;
}
::-webkit-scrollbar-thumb {
  background: #6497b1;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.loader {
  border: 6px solid #f3f3f3;
  border-top: 6px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>