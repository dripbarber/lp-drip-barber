<template>
  <AdminLayout>
    <Table :columns="columns" :data="datasource">
      <template v-slot:paginate>
        <Pagination
          :data="datasource"
          :current_page="currentPage"
          @page-changed="requestPagination"
        />
      </template>
    </Table>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/userStores";
const userStore = useUserStore();
const { token } = userStore;

definePageMeta({
  middleware: 'auth'
});

const config = useRuntimeConfig();
const api_url = config.public.api_url;
const datasource: any = ref([]);
const currentPage = ref(1);

onMounted(async () => {
  requestPagination()
});

const columns = [
  {
    key: "createdBy",
    label: "Criado por",
  },
  {
    key: "note",
    label: "Nota de Atendimento",
  },
  {
    key: "message",
    label: "Motivo",
  },
  {
    key: "createdAt",
    label: "Criado em",
  },
];

const requestPagination = async (values: any = {}) => {
  const response: any = await $fetch(`${api_url}/feedback`, {
    method: "GET",
    query: { ...values },
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (response?.feedbacks) {
    datasource.value = response.feedbacks;
  }
};

</script>