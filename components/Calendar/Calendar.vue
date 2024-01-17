<template>
  <div>
    <EventModal v-if="showEventModal" />
    <div class="h-screen flex flex-col">
      <CalendarHeader />
      <div class="flex flex-1">
        <Month :month="currentMonth" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { getMonth } from '@/composable/util';
import { useCalendarStore } from "@/stores/calendarStores";

import CalendarHeader from '@/components/Calendar/CalendarHeader';
import Month from '@/components/Calendar/Month';
import EventModal from '@/components/Calendar/EventModal';

export default {
  components: {
    CalendarHeader,
    SidebarCalendar,
    Month,
    EventModal,
  },
  setup() {
    const store = useCalendarStore();
    const currentMonth = ref(getMonth());

    watch(store.monthIndex, (newVal) => {
      currentMonth.value = getMonth(newVal);
    });

    const showEventModal = computed(() => store.showEventModal) 

    return {
      currentMonth,
      showEventModal,
    };
  },
};
</script>

<style scoped>
/* Adicione seus estilos específicos do componente aqui */
</style>
