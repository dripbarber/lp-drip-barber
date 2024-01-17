<template>
  <button @click="handleClick" class="border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl">
    <img :src="'plusImg'" alt="create_event" class="w-7 h-7" />
    <span class="pl-3 pr-7">Criar</span>
  </button>
</template>

<script>
//import plusImg from '@/assets/plus.svg';
import { useCalendarStore } from "@/stores/calendarStores";

export default {
  setup() {
    const store = useCalendarStore();

    const handleClick = () => {
      store.setShowEventModal(true);
    };

    return {
      //plusImg,
      handleClick,
    };
  },
};
</script>

<style scoped>
/* Adicione seus estilos específicos do componente aqui */
</style>
