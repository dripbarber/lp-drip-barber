<template>
  <header class="w-full bg-gray-950 fixed z-50 text-yellow-50">
    <nav
      class="max-w-7xl mx-auto px-4 py-2 md:flex md:justify-between md:items-center font-semibold"
    >
      <div class="flex justify-between items-center">
        <Logo />
        <!--Mobile Friendly Header-->
        <div class="flex">          
          <div class="md:hidden" @click="showMobileMenu">
            <svg
              v-if="!isMenuVisible"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 text-amber-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 text-amber-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      </div>
      <div
        class="absolute md:relative opacity-90 w-full md:w-auto left-0"
      >
        <ul
          class="md:flex md:items-center z-[-1] md:z-auto md:static md:w-auto pb-6 md:p-auto"
          :class="{ hidden: !isMenuVisible, block: isMenuVisible }"
        >
          <li
            v-for="(item, index) in menuItems"
            :key="index"
            class="mx-6 md:mx-3 lg:mx-6 pt-6 md:my-0"
          >
            <NuxtLink
              class="uppercase relative text-sm lg:text-xl w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-yellow-500 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
              :to="item.link"
              @click="delaydMobileMenuClick"
              >{{ item.name}}</NuxtLink
            >
          </li>
        </ul>
        <div :class="{ 'mb-6': isMenuVisible }" class="md:hidden">
          <NuxtLink
            target="_blank"
            v-if="isMenuVisible"
            to="https://www.thefork.pt/restaurante/jambu-rest-bar-r805263#booking="
            class="uppercase transition duration-100 delay-75 mx-4 px-5 py-1 text-slate-900 bg-indigo-900 hover:bg-indigo-950 rounded-[120px] text-sm"
            >{{ $t("reservation") }}</NuxtLink
          >
        </div>
      </div>
      <div class="hidden md:flex items-center relative">
        <NuxtLink
          to="https://www.thefork.pt/restaurante/jambu-rest-bar-r805263#booking="
          target="_blank"
          class="uppercase transition duration-100 delay-75 text-white hover:text-yellow-500 text-sm lg:text-xl relative"
        >
          <span class="z-10">MARCAÇÃO</span>
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-10 h-4 bg-yellow-500 square"></div>
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-45 w-10 h-4 bg-yellow-500 square"></div>
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>


<script setup lang="ts">
import { ref } from "vue";
interface menuItems {
  name: string;
  link: string;
}

const menuItems: menuItems[] = [
  { name: "home", link: "#home_section" },
  { name: "serviços", link: "#about_section" },
  { name: "sobre nós", link: "#our_drinks_section" },
  { name: "contato", link: "#footer_section" },
];

const isMenuVisible = ref(false);

const showMobileMenu = () => {
  isMenuVisible.value = !isMenuVisible.value;
};

const clickDelay = 600;

const delaydMobileMenuClick = () => {
  setTimeout(() => {
    showMobileMenu();
  }, clickDelay);
};
</script>