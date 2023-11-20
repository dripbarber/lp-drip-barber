<template>
  <AdminLayout>
    <Table :columns="columns" :data="datasource" hide-update hide-delete hide-create>
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
    key: "message",
    label: "Mensagem",
  },
  {
    key: "createdAt",
    label: "Criado em",
    type: "date",
  },
];

const requestPagination = async (values: any = {}) => {
  const response: any = await $fetch(`${api_url}/notification`, {
    method: "GET",
    query: { ...values, user: userStore.user._id },
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (response?.notifications) {
    datasource.value = response.notifications;
  }
};

</script>