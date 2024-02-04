<template>
  <div class="pb-2">
    <div class="flex flex-col">
      <CalendarHeader
        @create="$emit('create')"
        @change-view="$emit('change-view')"
      />
      <div class="flex flex-1">
        <Month
          :multipleUsers="!id"
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
const { token } = userStore;

const config = useRuntimeConfig();
const api_url = config.public.api_url;

const store = useCalendarStore();
const snackbar = useSnackbar();

const props = defineProps({
  id: {
    type: String,
    default: null,
  },
});

watch(
  () => store.monthIndex,
  (newValue, oldValue) => {
    requestAppointment();
  }
);

const requestAppointment = async () => {
  try {
    const index: number = store.monthIndex ?? 0;
    const dates = getMonth(index)
      .flat()
      .map((item) => item.format("YYYY-MM-DD"));

    const response: any = await $fetch(`${api_url}/appointment`, {
      method: "GET",
      query: {
        employee: props.id,
        startDate: dates[0],
        endDate: dates[dates.length - 1],
      },
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    store.setFilteredEvents(response?.appointments);
  } catch (error) {
    snackbar.add({
      type: "error",
      text: "Ops! Ocorreu um erro...",
    });
  }
};

requestAppointment();
</script>
