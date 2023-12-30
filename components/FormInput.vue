<template>
  <label class="block text-sm">
    <span class="text-gray-700">{{ label }}</span>
    <input
      :type="type"
      class="block w-full mt-1 text-sm focus:border-sky-400 focus:outline-none focus:shadow-outline-sky form-input"
      v-bind="$attrs"
    />
    <span class="text-red-600 text-sm mt-2">{{ errors }}</span>
  </label>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  errors: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  }
});
</script>
