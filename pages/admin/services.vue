<template>
  <AdminLayout>
    <Table
      :columns="columns"
      :data="datasource"
      @create="handleCreate"
      @update="handleUpdate"
      @delete="handleDelete"
      :loading="loading"
    >
      <template v-slot:paginate>
        <Pagination
          :data="datasource"
          :current_page="currentPage"
          @page-changed="requestPagination"
        />
      </template>
    </Table>

    <SidebarForm :isOpen="isOpen" @closeModal="closeForm" title="serviço">
      <form
        class="h-full w-full flex flex-col justify-between"
        @submit="onSubmit"
      >
        <div>
          <label class="block text-sm">
            <span class="text-gray-700">Descrição</span>
            <input
              class="block w-full mt-1 text-sm focus:border-stone-400 focus:outline-none focus:shadow-outline-stone form-input"
              v-bind="form.description"
            />
            <span class="text-red-600 text-sm mt-2">{{
              errors.description
            }}</span>
          </label>

          <label class="block text-sm mt-2">
            <span class="text-gray-700">Valor</span>
            <input
              class="block w-full mt-1 text-sm focus:border-stone-400 focus:outline-none focus:shadow-outline-stone form-input"
              v-bind="form.price"
            />
            <span class="text-red-600 text-sm mt-2">{{ errors.price }}</span>
          </label>
        </div>

        <div class="flex justify-center">
          <button
            class="block px-6 py-3 mt-4 text-lg font-medium leading-5 text-center text-white transition-colors duration-150 bg-gray-600 border border-transparent rounded-lg active:bg-gray-600 hover:bg-gray-700 focus:outline-none focus:shadow-outline-gray"
            type="button"
            @click="closeForm"
          >
            <span class="flex items-center"> Voltar </span>
          </button>

          <button
            class="block px-6 py-3 mt-4 text-lg font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue flex items-center ml-auto"
            type="submit"
          >
            <span class="flex items-center">
              <Icon
                name="material-symbols:save"
                class="flex-shrink-0 h-4 w-4 mr-2"
                aria-hidden="true"
              />
              Salvar
            </span>
          </button>
        </div>
      </form>
    </SidebarForm>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/userStores";

import { required, number } from "@/composable/rules";
import { useForm } from "vee-validate";

const userStore = useUserStore();
const { token } = userStore;

definePageMeta({
  //middleware: 'auth'
});

const config = useRuntimeConfig();
const snackbar = useSnackbar();
const api_url = config.public.api_url;
const datasource: any = ref([]);
const currentPage = ref(1);
const loading = ref(false);
const isOpen = ref(false);
const currentItem = ref(null as unknown as any);

const { defineInputBinds, handleSubmit, errors, setValues } = useForm({
  validationSchema: {
    description: [required],
    price: [required, number],
  },
});

const form = ref({
  description: defineInputBinds("description"),
  price: defineInputBinds("price"),
});

onMounted(async () => {
  loading.value = true;
  await requestPagination();
  loading.value = false;
});

const handleCreate = (item: any) => {
  currentItem.value = null;
  isOpen.value = true;
  setValues({
    description: "",
    price: 0,
  });
};

const handleUpdate = async (item: any) => {
  currentItem.value = item;
  isOpen.value = true;
  await load(currentItem?.value?._id);
};

const handleDelete = (item: any) => {
  currentItem.value = item;
};

const closeForm = () => {
  isOpen.value = false;
};

const doAction = async (values: any) => {
  if (!currentItem.value) {
    create(values);
  } else if (currentItem.value._id) {
    update(values);
  }
};

const onSubmit = handleSubmit(doAction);

const columns = [
  {
    key: "description",
    label: "Nome",
  },
  {
    key: "price",
    label: "Preço",
    type: "double",
  },
  {
    key: "createdBy",
    label: "Criado por",
    type: "user",
  },
  {
    key: "createdAt",
    label: "Atualizado em",
    type: "date",
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

const create = async (values: any) => {
  try {
    const response: any = await $fetch(`${api_url}/service`, {
      method: "POST",
      body: { ...values },
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (!response?.service) {
      snackbar.add({
        type: "error",
        text: response.message,
      });
    }

    snackbar.add({
      type: "success",
      text: response?.message,
    });

    closeForm();

    await requestPagination();
  } catch (error) {
    snackbar.add({
      type: "error",
      text: "Ops! Ocorreu um erro...",
    });
  }
};

const update = async (values: any) => {
  try {
    const response: any = await $fetch(
      `${api_url}/service/${currentItem?.value?._id}`,
      {
        method: "PUT",
        body: { ...values },
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    snackbar.add({
      type: "success",
      text: response?.message,
    });

    closeForm();

    await requestPagination();
  } catch (error) {
    snackbar.add({
      type: "error",
      text: "Ops! Ocorreu um erro...",
    });
  }
};

const load = async (_id: string) => {
  try {
    const response: any = await $fetch(`${api_url}/service/${_id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    setValues({
      description: response.service?.description ?? "",
      price: response.service?.price ?? 0,
    });
  } catch (error) {
    closeForm();
    snackbar.add({
      type: "error",
      text: "Ops! Ocorreu um erro...",
    });
  }
};
</script>