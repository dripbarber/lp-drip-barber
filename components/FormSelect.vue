<template>
  <label class="block text-sm">
    <span class="text-gray-700 font-semibold">{{ label }}</span>
    <select
      class="block w-full mt-1 text-sm focus:border-sky-400 focus:outline-none focus:shadow-outline-sky form-input"
      v-bind="$attrs"
    >
      <option
        v-for="option in options"
        :key="option"
        :value="option[valueField]"
      >
        {{ option[labelField] }}
      </option>
    </select>
    <Transition>
      <span v-if="errors" class="text-red-600 text-sm mt-2 transition-opacity duration-300">{{
        errors
      }}</span>
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
  options: {
    type: Array,
    default: () => [],
  },
  valueField: {
    type: String,
    default: "_id",
  },
  labelField: {
    type: String,
    default: "name",
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