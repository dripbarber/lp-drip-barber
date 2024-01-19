<template>
  <header class="py-2 flex items-center">
    <button
      @click="handleReset"
      class="border text-sm sm:text-base rounded py-2 px-2 sm:py-2 sm:px-4 mr-2 sm:mr-5"
    >
      Hoje
    </button>
    <button class="flex items-center" @click="handlePrevMonth">
      <Icon
        name="mdi:chevron-left"
        class="cursor-pointer text-lg text-gray-600 mx-2"
        aria-hidden="true"
      />
    </button>
    <h2
      class="ml-2 sm:ml-4 capitalize text-sm sm:text-xl text-gray-500 font-bold"
    >
      {{ formattedDate }}
    </h2>
    <button class="flex items-center" @click="handleNextMonth">
      <Icon
        name="mdi:chevron-right"
        class="text-lg cursor-pointer text-gray-600 mx-2"
        aria-hidden="true"
      />
    </button>

    <IconButton class="ml-auto" @click="$emit('change-view')" icon="mdi:table" />

    <IconButton  class="ml-1" @click="$emit('create')" label="Criar" icon="material-symbols:add" />

  </header>
</template>

<script>
import { useCalendarStore } from "@/stores/calendarStores";

export default {
  setup() {
    const dayjs = useDayjs();
    const store = useCalendarStore();

    const handlePrevMonth = () => {
      store.setMonthIndex(store.monthIndex - 1);
    };

    const handleNextMonth = () => {
      store.setMonthIndex(store.monthIndex + 1);
    };

    const handleReset = () => {
      const randomMonth =
        store.monthIndex === dayjs().month()
          ? store.monthIndex + Math.random()
          : dayjs().month();
      store.setMonthIndex(randomMonth);
    };

    const formattedDate = computed(() => {
      return dayjs(new Date(dayjs().year(), store.monthIndex)).format(
        "MMMM YYYY"
      );
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
