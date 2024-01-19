<template>
  <div class="border border-gray-200 flex flex-col">
    <header class="flex flex-col items-center" @click="handleDayClick">
      <p v-if="rowIdx === 0" class="hidden sm:block text-sm mt-1">
        {{ day.format("ddd").toUpperCase() }}
      </p>
      <p class="sm:hidden text-sm mt-1">
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
            '-200 p-1 mx-2 text-gray-600 text-sm rounded mb-1 truncate pl-2',
        ]"
      >
        {{ evt?.startTime }}:
        <span class="capitalize">{{
          evt?.customer?.name ?? evt?.customer?.email
        }}</span
        ><span v-if="multipleUsers"> - {{ evt?.employee?.name }}</span>
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
    required: true,
  },
  rowIdx: {
    type: Number,
  },
  multipleUsers: {
    type: Boolean,
    required: false,
  },
});

const emit = defineEmits(["update", "create"]);

const dayjs = useDayjs();
const store = useCalendarStore();

const getCurrentDayClass = computed(() => {
  return props.day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
    ? "bg-blue-600 text-white rounded-full w-7"
    : "";
});

const handleDayClick = () => {
  emit("create", { date: props.day.format("YYYY-MM-DD") });
  store.setShowEventModal(true);
};

const handleEventClick = (evt) => {
  emit("update", evt);
};

function getRandomLabel() {
  const labelsClasses = [
    "indigo",
    "gray",
    "green",
    "blue",
    "red",
    "purple",
    "slate",
    "purple",
  ];
  const randomIndex = Math.floor(Math.random() * labelsClasses.length);
  return labelsClasses[randomIndex];
}

const dayEvents = computed(() => {
  return store.filteredEvents
    .map((item) => {
      const combinedDateTime = dayjs(
        `${item.date.replace("T00:00:00.000Z", "")}T${item.startTime}`
      );

      if (!store.labelBarber[item.employee.name]) {
        const labelBarber = store.labelBarber;
        labelBarber[item.employee.name] = getRandomLabel();
        store.setLabelBarber(labelBarber);
      }

      return {
        ...item,
        date: combinedDateTime.format("DD-MM-YY"),
        label: store.labelBarber[item.employee.name],
      };
    })
    .filter((evt) => {
      return evt.date === props.day.format("DD-MM-YY");
    })
    .sort((a, b) => {
      const timeA = dayjs(`2000-01-01 ${a.startTime}`);
      const timeB = dayjs(`2000-01-01 ${b.startTime}`);

      return timeA.isBefore(timeB) ? -1 : timeA.isAfter(timeB) ? 1 : 0;
    });
});
</script>
