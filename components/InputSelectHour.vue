<template>
  <Loading v-if="loading" />
  <template v-else>
    <label
      v-for="(hour, index) in options"
      :key="index"
      class="flex items-center py-1"
    >
      <input
        type="radio"
        v-model="value"
        :value="hour"
        class="sr-only"
      />
      <span
        class="px-6 py-2 text-sm font-medium hover:text-white transition-colors duration-150 border border-sky-600 hover:border-transparent rounded active:bg-sky-600 hover:bg-sky-700 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray dark:text-white dark:border-white hover:cursor-pointer"
        :class="{
          'bg-sky-600 text-white': value === hour,
        }"
      >
        {{ hour }}
      </span>
    </label>
  </template>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    default: "",
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>
