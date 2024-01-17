<template>
  <div>
    <p class="text-gray-500 font-bold mt-10">Label</p>
    <label v-for="(item, idx) in labels" :key="idx" class="items-center mt-3 block">
      <input
        type="checkbox"
        :checked="item.checked"
        @change="handleClick(item)"
        class="form-checkbox h-5 w-5"
        :class="'text-' + item.label + '-400 rounded focus:ring-0 cursor-pointer'"
      />
      <span class="ml-2 text-gray-700 capitalize">{{ item.label }}</span>
    </label>
  </div>
</template>

<script>
import { useCalendarStore } from "@/stores/calendarStores";

export default {
  setup() {
    const store = useCalendarStore();

    const labels = computed(() => store.labels)

    const handleClick =(item) => {
        store.updateLabel({ label: item.label, checked: !item.checked })
    }

    return {
      labels,
      handleClick,
    };
  },
};
</script>

<style scoped>
/* Adicione seus estilos específicos do componente aqui */
</style>
