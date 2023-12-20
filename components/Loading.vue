<template>
  <div :style="`height: ${heightContainer}`" class="loading-container">
    <div :style="`height: ${size}; width: ${size}`" class="loader"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  heightContainer: {
    type: String,
    default: '100px',
  },
  size: {
    type: String,
    default: '40px',
  },
});


</script>

<style scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader {
  border: 6px solid #f3f3f3;
  border-top: 6px solid #3498db;
  border-radius: 50%;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>