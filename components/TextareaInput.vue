<template>
    <label class="block text-sm">
      <span class="text-gray-700 dark:text-gray-400 font-semibold"
        >Mensagem</span
      >
      <textarea
        v-model="value"
        class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-sky-400 focus:outline-none focus:shadow-outline-sky dark:focus:shadow-outline-gray resize-none"
        :rows="rows"
        placeholder="Envie alguma observação"
      ></textarea>
    </label>
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
  rows: {
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
