<template>
  <div class="flex items-center col-span-3">
    {{ paginationStart }} - {{ paginationEnd }} de {{ data.length }} items
  </div>
  <div class="col-span-2"></div>
  <div class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
    <nav aria-label="Table navigation">
      <ul class="inline-flex items-center">
        <li>
          <button
            @click="previousPage"
            class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-stone"
            :disabled="currentPage === 1"
            aria-label="Previous"
          >
            <svg
              aria-hidden="true"
              class="w-4 h-4 fill-current"
              viewBox="0 0 20 20"
            >
              <path
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
                fill-rule="evenodd"
              ></path>
            </svg>
          </button>
        </li>
        <li v-for="pageNumber in visiblePageNumbers" :key="pageNumber">
          <button
            @click="goToPage(pageNumber)"
            class="px-3 py-1 rounded-md"
            :class="{
              'focus:outline-none focus:shadow-outline-stone': currentPage !== pageNumber,
              'text-white transition-colors duration-150 bg-stone-600 border border-r-0 border-stone-600 rounded-md focus:outline-none focus:shadow-outline-stone': currentPage === pageNumber,
            }"
          >
            {{ pageNumber }}
          </button>
        </li>
        <li>
          <span class="px-3 py-1">...</span>
        </li>
        <li>
          <button
            @click="nextPage"
            class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-stone"
            :disabled="currentPage === totalPages"
            aria-label="Next"
          >
            <svg
              class="w-4 h-4 fill-current"
              aria-hidden="true"
              viewBox="0 0 20 20"
            >
              <path
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
                fill-rule="evenodd"
              ></path>
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, defineProps, defineEmits } from "vue";

const { data, current_page, items_per_page } = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  current_page: {
    type: Number,
    default: 1,
  },
  items_per_page: {
    type: Number,
    default: 10,
  },
});

const emit = defineEmits();

const currentPage = ref(current_page);
const itemsPerPage = ref(items_per_page);

const paginationEnd = computed(() => Math.min(currentPage.value * items_per_page, data.length));
const paginationStart = computed(() => paginationEnd.value ? (currentPage.value - 1 ) * items_per_page + 1 : 0);

const totalPages = computed(() => Math.ceil(data.length / items_per_page));

const visiblePageNumbers = computed(() => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages.value; i++) {
    pageNumbers.push(i);
  }
  return pageNumbers;
});

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    emit("page-changed", { currentPage: currentPage.value, itemsPerPage: itemsPerPage.value });
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    emit("page-changed", { currentPage: currentPage.value,  itemsPerPage: itemsPerPage.value });
  }
};

const goToPage = (pageNumber: any) => {
  currentPage.value = pageNumber;
  emit("page-changed", { currentPage: pageNumber,  itemsPerPage: itemsPerPage.value });
};
</script>
