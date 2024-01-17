<template>
  <div
    v-if="showEventModal"
    class="h-screen w-full fixed left-0 top-0 flex justify-center items-center"
  >
    <form
      class="bg-white rounded-lg shadow-2xl w-1/4"
      @submit.prevent="handleSubmit"
    >
      <header class="bg-gray-100 px-4 py-2 flex justify-between items-center">
        <span class="material-icons-outlined text-gray-400">drag_handle</span>
        <div>
          <span
            v-if="selectedEvent"
            @click="handleDelete"
            class="material-icons-outlined text-gray-400 cursor-pointer"
            >delete</span
          >
          <button @click="closeModal">
            <span class="material-icons-outlined text-gray-400">close</span>
          </button>
        </div>
      </header>
      <div class="p-3">
        <div class="grid grid-cols-1/5 items-end gap-y-7">
          <div></div>
          <input
            type="text"
            name="title"
            placeholder="Adicionar título"
            v-model="title"
            required
            class="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
          />
          <span class="material-icons-outlined text-gray-400">schedule</span>
          <p>{{ daySelected.format("dddd, MMMM DD") }}</p>
          <span class="material-icons-outlined text-gray-400">segment</span>
          <input
            type="text"
            name="description"
            placeholder="Adicionar um descrição"
            v-model="description"
            required
            class="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
          />
          <span class="material-icons-outlined text-gray-400"
            >bookmark_border</span
          >
          <div class="flex gap-x-2">
            <span
              v-for="(lblClass, i) in labelsClasses"
              :key="i"
              @click="setSelectedLabel(lblClass)"
              :class="`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`"
            >
              <span
                v-if="selectedLabel === lblClass"
                class="material-icons-outlined text-white text-sm"
                >check</span
              >
            </span>
          </div>
        </div>
      </div>
      <footer class="flex justify-end border-t p-3 mt-5">
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
        >
          Salvar
        </button>
      </footer>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useCalendarStore } from "@/stores/calendarStores";

export default {
  setup() {
    const store = useCalendarStore();
    const showEventModal = ref(false);
    const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

    const title = ref(store.selectedEvent ? store.selectedEvent.title : "");
    const description = ref(
      store.selectedEvent ? store.selectedEvent.description : ""
    );
    const selectedLabel = ref(
      store.selectedEvent
        ? labelsClasses.find((lbl) => lbl === store.selectedEvent.label)
        : labelsClasses[0]
    );

    const closeModal = () => {
      showEventModal.value = false;
    };

    const handleSubmit = () => {
      const calendarEvent = {
        title: title.value,
        description: description.value,
        label: selectedLabel.value,
        day: daySelected.value ? daySelected.value.valueOf() : null,
        id: store.selectedEvent ? store.selectedEvent.id : Date.now(),
      };

      if (store.selectedEvent) {
        store.dispatchCalEvent({ type: "update", payload: calendarEvent });
      } else {
        store.dispatchCalEvent({ type: "push", payload: calendarEvent });
      }

      closeModal();
    };

    const handleDelete = () => {
      if (store.selectedEvent) {
        store.dispatchCalEvent({
          type: "delete",
          payload: store.selectedEvent,
        });
      }
      closeModal();
    };

    const setSelectedLabel = (lblClass) => {
      selectedLabel.value = lblClass;
    };

    return {
      showEventModal,
      closeModal,
      title,
      description,
      selectedLabel,
      labelsClasses,
      daySelected: store.daySelected,
      handleSubmit,
      handleDelete,
      setSelectedLabel,
    };
  },
};
</script>

<style scoped>
/* Adicione seus estilos específicos do componente aqui */
</style>
