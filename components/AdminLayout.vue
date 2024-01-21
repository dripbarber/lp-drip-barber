<template>
  <main class="flex">
    <Sidebar :isSideMenuOpen="isOpen" @closeSideMenu="isOpen = !isOpen" :pages="pages" />

    <div class="w-full">
      <Navigation @open-menu="isOpen = !isOpen" route="admin" />

      <div class="mx-8 mt-4">
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
    to: "admin/appointment",
  },
  {
    name: "Disponibilidade",
    icon: "mdi:timetable",
    to: "admin/availability",
  },
  {
    name: "Serviços",
    icon: "mdi:toolbox-outline",
    to: "admin/services",
  },
  {
    name: "Barbeiros",
    icon: "mdi:account-multiple-outline",
    to: "admin/employee",
  },
  {
    name: "Empresa",
    icon: "mdi:domain",
    to: "admin/company",
  },
  {
    name: "Feedbacks",
    icon: "mdi:comment-quote-outline",
    to: "admin/feedbacks",
  },
];

</script>