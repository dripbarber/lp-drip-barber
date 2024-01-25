<template>
  <main class="flex">
    <Sidebar :isSideMenuOpen="isOpen" @closeSideMenu="isOpen = !isOpen" :pages="pages" />

    <div class="w-scren sm:w-full">
      <Navigation @open-menu="isOpen = !isOpen"  route="employee" />

      <div class="mx-2 sm:mx-8 mt-4">
        <slot />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isOpen = ref(false);

const pages = [
  {
    name: "Reservas",
    icon: "mdi:calendar-text",
    to: "employee/appointment",
  },
  {
    name: "Disponibilidade",
    icon: "mdi:timetable",
    to: "employee/availability",
  }
];

</script>