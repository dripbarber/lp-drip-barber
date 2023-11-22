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

    <SidebarForm
      :isOpen="isOpen"
      @closeModal="closeForm"
      :isUpdate="!!currentItem?._id"
      title="empresa"
    >
      <form
        class="h-full w-full flex flex-col justify-between"
        @submit="onSubmit"
      >
        <div>
          <label class="block text-sm">
            <span class="text-gray-700">Nome</span>
            <input
              class="block w-full mt-1 text-sm focus:border-sky-400 focus:outline-none focus:shadow-outline-sky form-input"
              v-bind="form.name"
            />
            <span class="text-red-600 text-sm mt-2">{{ errors.name }}</span>
          </label>

          <label class="block text-sm mt-2">
            <span class="text-gray-700">Email</span>
            <input
              class="block w-full mt-1 text-sm focus:border-sky-400 focus:outline-none focus:shadow-outline-sky form-input"
              v-bind="form.email"
            />
            <span class="text-red-600 text-sm mt-2">{{ errors.email }}</span>
          </label>

          <label class="block text-sm mt-2">
            <span class="text-gray-700">Telefone</span>
            <input
              class="block w-full mt-1 text-sm focus:border-sky-400 focus:outline-none focus:shadow-outline-sky form-input"
              v-bind="form.phone"
            />
            <span class="text-red-600 text-sm mt-2">{{ errors.phone }}</span>
          </label>

          <label class="block text-sm mt-2">
            <span class="text-gray-700">Sobre</span>
            <input
              class="block w-full mt-1 text-sm focus:border-sky-400 focus:outline-none focus:shadow-outline-sky form-input"
              v-bind="form.about"
            />
            <span class="text-red-600 text-sm mt-2">{{ errors.about }}</span>
          </label>

          <label class="block text-sm mt-2">
            <span class="text-gray-700">Endereço</span>
            <input
              class="block w-full mt-1 text-sm focus:border-sky-400 focus:outline-none focus:shadow-outline-sky form-input"
              v-bind="form.address"
            />
            <span class="text-red-600 text-sm mt-2">{{ errors.address }}</span>
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
import { useForm } from "vee-validate";
import { useUserStore } from "@/stores/userStores";
import { required, number } from "@/composable/rules";

const userStore = useUserStore();
const plugin = useNuxtApp();
const config = useRuntimeConfig();
const snackbar = useSnackbar();

const $swal: any = plugin.$swal;

const { token } = userStore;

definePageMeta({
  middleware: [
    "auth",
  ],
});

const api_url = config.public.api_url;
const datasource: any = ref([]);
const currentPage = ref(1);
const loading = ref(false);
const isOpen = ref(false);
const currentItem = ref(null as unknown as any);

const { defineInputBinds, handleSubmit, errors, setValues, resetForm } =
  useForm({
    validationSchema: {
      name: [required],
      email: [required],
      phone: [required],
      about: [],
      address: [required],
    },
  });

const form = ref({
  name: defineInputBinds("name"),
  email: defineInputBinds("email"),
  phone: defineInputBinds("phone"),
  about: defineInputBinds("about"),
  address: defineInputBinds("address"),
});

onMounted(async () => {
  try {
    loading.value = true;
    await requestPagination();
    loading.value = false;
  } catch (error) {
    loading.value = false;
  }
});

const handleCreate = (item: any) => {
  resetForm();
  setValues({});
  currentItem.value = null;
  isOpen.value = true;
};

const handleUpdate = async (item: any) => {
  setValues({});
  resetForm();
  currentItem.value = item;
  isOpen.value = true;
  await load(currentItem?.value?._id);
};

const handleDelete = (item: any) => {
  remove(item?._id);
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
    key: "name",
    label: "Nome",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "phone",
    label: "Telefone",
  },
  {
    key: "address",
    label: "Endereço",
  },
  {
    key: "createdBy",
    label: "Criado por",
    type: "user",
  },
  {
    key: "createdAt",
    label: "Criado em",
    type: "date",
  },
];

const requestPagination = async (values: any = {}) => {
  const response: any = await $fetch(`${api_url}/company`, {
    method: "GET",
    query: { ...values },
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (response?.companys) {
    datasource.value = response.companys;
  }
};

const create = async (values: any) => {
  try {
    const response: any = await $fetch(`${api_url}/company`, {
      method: "POST",
      body: { ...values },
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (!response?.company) {
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
      `${api_url}/company/${currentItem?.value?._id}`,
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
    const response: any = await $fetch(`${api_url}/company/${_id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    setValues({
      ...response.company,
    });
  } catch (error) {
    closeForm();
    snackbar.add({
      type: "error",
      text: "Ops! Ocorreu um erro...",
    });
  }
};

const remove = async (_id: string) => {
  try {
    $swal
      .fire({
        title: "Tem certeza?",
        text: "Você não poderá reverter isso!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim, remover!",
        cancelButtonText: "Não, cancelar!",
        reverseButtons: true,
        customClass: {
          confirmButton:
            "ml-4 rounded-lg text-white text-bold px-4 py-2 bg-green-500 ",
          cancelButton: "rounded-lg text-white text-bold px-4 py-2 bg-red-500",
        },
        buttonsStyling: false,
      })
      .then(async (result: any) => {
        if (result.isConfirmed) {
          const response: any = await $fetch(`${api_url}/company/${_id}`, {
            method: "DELETE",
            headers: {
              authorization: `Bearer ${token}`,
            },
          });

          snackbar.add({
            type: "success",
            text: response?.message,
          });

          await requestPagination();
        }
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