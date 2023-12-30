<template>
    <img
      v-if="src"
      class="object-cover w-full h-full rounded-full"
      :src="api_url + src"
      loading="lazy"
    />
    <Icon
      v-else
      name="ph:user-bold"
      class="object-cover w-full h-full rounded-full"
    />
    <div
      class="absolute inset-0 rounded-full shadow-inner"
      aria-hidden="true"
    ></div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const config = useRuntimeConfig();
const api_url = config.public.api_url;

const props = defineProps({
  src: {
    type: String,
    default: '',
  },
});
</script>
