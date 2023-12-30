<template>
  <label class="block text-sm">
    <span class="text-gray-700">{{ label }}</span>
    <select
      class="block w-full mt-1 text-sm focus:border-sky-400 focus:outline-none focus:shadow-outline-sky form-input"
      v-model="value"
      :multiple="multiple"
    >
      <option v-for="option in options" :key="option" :value="option[valueField]">
        {{ option[labelField] }}
      </option>
    </select>
    <span class="text-red-600 text-sm mt-2 transition-opacity duration-300">{{ errors }}</span>
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
  multiple: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: [Array, String, Number],
    default: () => [],
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
