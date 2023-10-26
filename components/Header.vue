<template>
  <header class="w-full bg-slate-900 fixed z-50 text-white">
    <nav
      class="max-w-7xl mx-auto px-4 py-2 md:flex md:justify-between md:items-center font-semibold"
    >
      <div class="flex justify-between items-center">
        <Logo />
        <!--Mobile Friendly Header-->
        <div class="flex">
          <lang-selector v-if="!isMenuVisible" class="md:hidden" />
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
        class="bg-slate-900 absolute md:relative opacity-90 w-full md:w-auto left-0"
      >
        <ul
          class="bg-slate-900 md:flex md:items-center z-[-1] md:z-auto md:static md:w-auto pb-6 md:p-auto"
          :class="{ hidden: !isMenuVisible, block: isMenuVisible }"
        >
          <li
            v-for="(item, index) in menuItems"
            :key="index"
            class="mx-6 md:mx-3 lg:mx-6 pt-6 md:my-0"
          >
            <NuxtLink
              class="uppercase relative text-sm lg:text-xl w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-amber-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
              :to="item.link"
              @click="delaydMobileMenuClick"
              >{{ $t(item.name) }}</NuxtLink
            >
          </li>
        </ul>
        <div :class="{ 'mb-6': isMenuVisible }" class="md:hidden">
          <NuxtLink
            target="_blank"
            v-if="isMenuVisible"
            to="https://www.thefork.pt/restaurante/jambu-rest-bar-r805263#booking="
            class="uppercase transition duration-100 delay-75 mx-4 px-5 py-1 text-slate-900 bg-amber-600 hover:bg-amber-500 rounded-[120px] text-sm"
            >{{ $t("reservation") }}</NuxtLink
          >
        </div>
      </div>
      <div class="hidden md:flex items-center">
        <div class="mr-2 lg:mr-4"></div>
        <lang-selector />
        <div class="border-solid border-white border-l-2">
          <span class="mx-2 lg:mx-4 text-xs lg:text-sm whitespace-nowrap">+351 910 444 333</span>
        </div>
        <NuxtLink
          to="https://www.thefork.pt/restaurante/jambu-rest-bar-r805263#booking="
          target="_blank"
          class="uppercase transition duration-100 delay-75 px-5 lg:px-8 py-1 lg:py-2 text-slate-900 bg-amber-600 hover:bg-amber-500 rounded-[120px] text-sm lg:text-xl"
          >{{ $t("reservation") }}</NuxtLink
        >
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
  { name: "about", link: "#about_section" },
  { name: "menu", link: "#menu_section" },
  { name: "gallery", link: "#our_drinks_section" },
  { name: "information", link: "#footer_section" },
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