<template>
  <button
    class="blockpx-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-sky-600 border border-transparent rounded-lg active:bg-sky-600 hover:bg-sky-700 focus:outline-none focus:shadow-outline-sky"
    :class="`${customClass}`"
    type="submit"
    :disabled="loading"
  >
    <span class="flex justify-center items-center gap-2">
      Login
      <Loading v-if="loading" heightContainer="12px" size="12px" />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  customClass: {
    type: String,
    default: ' w-full '
  }

});


</script>