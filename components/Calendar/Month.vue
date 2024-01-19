<template>
  <div class="flex-1 grid-cols-1 sm:grid-cols-3 grid md:grid-cols-7 md:grid-rows-5">
    <template v-for="(row, i) in month">
      <template v-for="(day, idx) in row" :key="idx">
        <Day
          @create="(evt) => $emit('create', evt)"
          @update="(evt) => $emit('update', evt)"
          :day="day"
          :rowIdx="i"
        />
      </template>
    </template>
  </div>
</template>

<script>
import Day from "@/components/Calendar/Day";

export default {
  props: {
    month: Array,
  },
  components: {
    Day,
  },
};
</script>
