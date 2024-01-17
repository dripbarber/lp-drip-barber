<template>
  <header class="px-4 py-2 flex items-center">
    <button @click="handleReset" class="border rounded py-2 px-4 mr-5">
      Hoje
    </button>
    <button @click="handlePrevMonth">
      <span class="material-icons-outlined cursor-pointer text-gray-600 mx-2">
        chevron_left
      </span>
    </button>
    <button @click="handleNextMonth">
      <span class="material-icons-outlined cursor-pointer text-gray-600 mx-2">
        chevron_right
      </span>
    </button>
    <h2 class="ml-4 text-xl text-gray-500 font-bold">
      {{ formattedDate }}
    </h2>
  </header>
</template>

<script>
import { ref } from "vue";
import { useCalendarStore } from "@/stores/calendarStores";

export default {
  setup() {
    const dayjs = useDayjs()
    const store = useCalendarStore();
    const monthIndex = ref(store.monthIndex);

    const handlePrevMonth = () => {
      store.setMonthIndex(monthIndex.value - 1);
    };

    const handleNextMonth = () => {
      store.setMonthIndex(monthIndex.value + 1);
    };

    const handleReset = () => {
      const randomMonth = monthIndex.value === dayjs().month()
        ? monthIndex.value + Math.random()
        : dayjs().month();
      store.setMonthIndex(randomMonth);
    };

    const formattedDate = computed(() => {
      return dayjs(new Date(dayjs().year(), monthIndex.value)).format("MMMM YYYY");
    });

    return {
      handlePrevMonth,
      handleNextMonth,
      handleReset,
      formattedDate,
    };
  },
};
</script>
