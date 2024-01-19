<template>
  <button
    class="block items-center text-sm font-semibold transition duration-200 ease-in bg-sky-500 hover:bg-sky-600 text-white py-1 px-2 sm:py-2 sm:px-4 rounded-sm"
    @click="$emit('click')"
  >
    <span class="hidden sm:inline-block"> {{ label }} </span>
    <Icon
      v-if="icon && !loading"
      :name="icon"
      class="w-6 h-6 text-white "
    />
    <Loader class="w-6 h-6 text-white mr-2" v-if="loading" />
  </button>
</template>

<script setup lang="ts">
import Loader from "./Loader.vue";

const emit = defineEmits(["click"]);
const { size, loading, disabled } = defineProps({
  size: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: null,
  },
  loading: {
    type: Boolean,
    required: true,
  },
  disabled: {
    type: Boolean,
    required: true,
  },
});
</script>