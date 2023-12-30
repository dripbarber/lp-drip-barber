<template>
  <label class="block text-sm">
    <span class="text-gray-700">{{ label }}</span>
    <input
      :type="type"
      class="block w-full mt-1 text-sm focus:border-sky-400 focus:outline-none focus:shadow-outline-sky form-input"
      v-bind="$attrs"
    />
    <Transition>
      <span v-if="errors" class="text-red-600 text-sm mt-2">{{ errors }}</span>
    </Transition>
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
  },
});
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>