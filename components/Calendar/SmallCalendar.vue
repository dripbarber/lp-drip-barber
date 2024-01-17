<template>
  <div class="mt-9">
    <header class="flex justify-between">
      <p class="text-gray-500 font-bold">
        {{ dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY") }}
      </p>
      <div>
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
      </div>
    </header>
    <div class="grid grid-cols-7 grid-rows-6">
      <span v-for="(day, i) in currentMonth[0]" :key="i" class="text-sm py-1 text-center">
        {{ day.format("dd").charAt(0) }}
      </span>
      <template v-for="row in currentMonth">
        <button
          v-for="(day, idx) in row"
          :key="idx"
          @click="handleDayClick(day)"
          class="py-1 w-full"
          :class="getDayClass(day)"
        >
          <span class="text-sm">{{ day.format("D") }}</span>
        </button>
      </template>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { getMonth } from '@/composable/util';
import { useCalendarStore } from "@/stores/calendarStores";

export default {
  setup() {
    const dayjs = useDayjs()
    const store = useCalendarStore();
    const currentMonthIdx = ref(dayjs().month());
    const currentMonth = ref(getMonth());

    watch(currentMonthIdx, () => {
      currentMonth.value = getMonth(currentMonthIdx.value);
    });

    watch(() => store.monthIndex, (newVal) => {
      currentMonthIdx.value = newVal;
    });

    const handlePrevMonth = () => {
      currentMonthIdx.value -= 1;
    };

    const handleNextMonth = () => {
      currentMonthIdx.value += 1;
    };

    const handleDayClick = (day) => {
      store.setSmallCalendarMonth(currentMonthIdx.value);
      store.setDaySelected(day);
    };

    const getDayClass = (day) => {
      const format = "DD-MM-YY";
      const nowDay = dayjs().format(format);
      const currDay = day.format(format);
      const slcDay = store.daySelected && store.daySelected.format(format);

      if (nowDay === currDay) {
        return "bg-blue-500 rounded-full text-white";
      } else if (currDay === slcDay) {
        return "bg-blue-100 rounded-full text-blue-600 font-bold";
      } else {
        return "";
      }
    };

    return {
      dayjs,
      currentMonthIdx,
      currentMonth,
      handlePrevMonth,
      handleNextMonth,
      handleDayClick,
      getDayClass,
    };
  },
};
</script>

<style scoped>
/* Adicione seus estilos específicos do componente aqui */
</style>
