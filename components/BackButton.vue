<template>
  <button
    class="block px-6 py-3 mt-4 text-lg font-medium leading-5 text-center text-white transition-colors duration-150 bg-gray-600 border border-transparent rounded-lg active:bg-gray-600 hover:bg-gray-700 focus:outline-none focus:shadow-outline-gray"
    type="button"
    @click="$emit('back')"
  >
    <span class="flex items-center"> Voltar </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  customClass: {
    type: String,
    default: "",
  },
});
</script>