<template>
  <div>
    <div class="h-screen flex flex-col">
      <CalendarHeader @create="$emit('create')"  @change-view="$emit('change-view')"/>
      <div class="flex flex-1">
        <Month
          @create="(evt) => $emit('create', evt)"
          @update="(evt) => $emit('update', evt)"
          :month="getMonth(store.monthIndex)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getMonth } from "@/composable/util";
import { useCalendarStore } from "@/stores/calendarStores";
import CalendarHeader from "@/components/Calendar/CalendarHeader";
import Month from "@/components/Calendar/Month";

const userStore = useUserStore();

const config = useRuntimeConfig();
const api_url = config.public.api_url;

const store = useCalendarStore();

const props = defineProps({
  id: {
    type: String,
    default: null
  },
});


watch(
  () => store.monthIndex,
  (newValue, oldValue) => {
    requestAppointment();
  }
);

const requestAppointment = async () => {
  const index: number = store.monthIndex ?? 0;
  const dates = getMonth(index)
    .flat()
    .map((item) => item.format("YYYY-MM-DD"));

    const response: any = await $fetch(`${api_url}/appointment`, {
      method: "GET",
      query: {
        employee: props.id,
        startDate: dates[0],
        endDate: dates[dates.length - 1]
      },
      headers: {
        authorization: `Bearer ${userStore.token}`,
      },
    });

    store.setFilteredEvents([...store.filteredEvents, ...response?.appointments]);};

requestAppointment();
</script>
