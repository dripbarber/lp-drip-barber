<template>
  <aside class="border p-5 w-64">
    <CreateEventButton />
    <SmallCalendar />
    <Labels />
  </aside>
</template>

<script>
import CreateEventButton from '@/components/Calendar/CreateEventButton';
import SmallCalendar from '@/components/Calendar/SmallCalendar';
import Labels from '@/components/Calendar/Label';

export default {
  components: {
    CreateEventButton,
    SmallCalendar,
    Labels,
  },
};
</script>

<style scoped>
/* Adicione seus estilos específicos do componente aqui */
</style>
