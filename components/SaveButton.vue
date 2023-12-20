<template>
  <button
    class="block px-6 py-3 mt-4 text-lg font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue flex items-center ml-auto"
    type="submit"
    :class="`${customClass}`"
    :disabled="loading"
  >
    <span class="flex items-center gap-2">
      <Icon
        name="material-symbols:save"
        class="flex-shrink-0 h-4 w-4"
        aria-hidden="true"
      />
      Salvar

      <Loading v-if="loading" heightContainer="12px" size="12px" />
    </span>
  </button>

</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  customClass: {
    type: String,
    default: "",
  },
});
</script>