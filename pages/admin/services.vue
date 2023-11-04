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
    key: "description",
    label: "Nome",
  },
  {
    key: "price",
    label: "Preço",
  },
    {
    key: "createdAt",
    label: "Atualizado em",
  },
];

const requestPagination = async (values: any = {}) => {
  const response: any = await $fetch(`${api_url}/service`, {
    method: "GET",
    query: { ...values },
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (response?.services) {
    datasource.value = response.services;
  }
};

</script>