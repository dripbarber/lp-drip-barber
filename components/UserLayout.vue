<template>
  <section class="h-screen overflow-y-auto dark:bg-gray-900">
    <Navigation :showMenu="false" :showNotification="false" />
    <main class="overflow-y-auto dark:bg-gray-900">
      <div class="container max-w-4xl mx-auto h-full p-4 sm:p-0">
        <slot />
      </div>
    </main>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
</script>