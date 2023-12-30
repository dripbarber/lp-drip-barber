<template>
  <div class="flex justify-between align-center w-full">
    <BackButton @back="$emit('back')" />

    <SaveButton :loading="loading" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>