<template>
  <div class="border border-gray-200 flex flex-col">
    <header class="flex flex-col items-center">
      <p v-if="rowIdx === 0" class="text-sm mt-1">
        {{ day.format("ddd").toUpperCase() }}
      </p>
      <p :class="['text-sm p-1 my-1 text-center', getCurrentDayClass]">
        {{ day.format("DD") }}
      </p>
    </header>
    <div class="flex-1 cursor-pointer" @click="handleDayClick">
      <div
        v-for="(evt, idx) in dayEvents"
        :key="idx"
        @click="handleEventClick(evt)"
        :class="[
          'bg-' +
            evt.label +
            '-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate',
        ]"
      >
        {{ evt.title }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useCalendarStore } from "@/stores/calendarStores";

const props = defineProps({
  day: {
    type: Object,
    required: true
  },
  rowIdx: {
    type: Number
  },
})

const dayEvents = ref([]);
const dayjs = useDayjs();
const store = useCalendarStore();

const getCurrentDayClass = computed(() => {
  return props.day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
    ? "bg-blue-600 text-white rounded-full w-7"
    : "";
});

const handleDayClick = () => {
  store.setDaySelected(props.day);
  store.setShowEventModal(true);
};

const handleEventClick = (evt) => {
  store.setSelectedEvent(evt);
};

onMounted(() => {
  updateDayEvents();
});

watch(() => props.day, () => {
  updateDayEvents();
});

watch(() => store.filteredEvents, () => {
  updateDayEvents();
});

const updateDayEvents = () => {
  const events = store.filteredEvents.filter(
    (evt) => dayjs(evt.day).format("DD-MM-YY") === props.day.format("DD-MM-YY")
  );
  dayEvents.value = events;
};
</script>
