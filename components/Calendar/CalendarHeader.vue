<template>
  <header class="py-2 flex items-center">
    <button @click="handleReset" class="border rounded py-2 px-4 mr-5">
      Hoje
    </button>
    <button class="flex items-center" @click="handlePrevMonth">
      <Icon
        name="mdi:chevron-left"
        class="cursor-pointer text-lg text-gray-600 mx-2"
        aria-hidden="true"
      />
    </button>
    <h2 class="ml-4 capitalize text-xl text-gray-500 font-bold">
      {{ formattedDate }}
    </h2>
    <button class="flex items-center" @click="handleNextMonth">
      <Icon
        name="mdi:chevron-right"
        class="text-lg cursor-pointer text-gray-600 mx-2"
        aria-hidden="true"
      />
    </button>

    <button
      class="block items-center text-sm font-semibold transition duration-200 ease-in bg-sky-500 hover:bg-sky-600 text-white py-2 px-4 rounded-sm ml-auto mr-2"
      @click="$emit('change-view')"
    >
      <Icon
        name="mdi:table"
        class="flex-shrink-0 h-6 w-6"
        aria-hidden="true"
      />
    </button>

    <button
      class="block items-center text-sm font-semibold transition duration-200 ease-in bg-sky-500 hover:bg-sky-600 text-white py-2 px-4 rounded-sm"
      @click="$emit('create')"
    >
      Criar
      <Icon
        name="material-symbols:add"
        class="flex-shrink-0 h-6 w-6"
        aria-hidden="true"
      />
    </button>
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
