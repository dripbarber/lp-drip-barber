<template>
  <AdminLayout>
    <Table
      :columns="columns"
      :data="datasource"
      @create="handleCreate"
      @update="handleUpdate"
      @delete="handleDelete"
      :loading="loading"
      :sorted="sort"
      @sort-changed="requestSorted"
    >
      <template v-slot:paginate>
        <Pagination
          :data="datasource"
          :items_per_page="itemsPerPage"
          :current_page="currentPage"
          :total_items="totalItems"
          @page-changed="requestPaginated"
        />
      </template>
    </Table>

    <SidebarForm
      :isOpen="isOpen"
      :isUpdate="!!currentItem?._id"
      title="barbeiro"
      @closeModal="closeForm"
      @submit="onSubmit"
      :loading="loading"
    >
      <div>
        <FormAvatar v-model="state.attachment" :src="state.picture" />

        <div class="grid gap-4">
          <FormInput label="Nome" v-bind="form.name" :errors="errors.name" />

          <FormInput label="Email" v-bind="form.email" :errors="errors.email" />

          <FormInput
            v-if="!currentItem"
            label="Password"
            v-bind="form.password"
            type="password"
            :errors="errors.password"
          />

          <FormInput
            label="Telefone"
            v-bind="form.phone"
            :errors="errors.phone"
          />

          <FormInput label="Sobre" v-bind="form.about" :errors="errors.about" />

          <FormSelect
            label="Empresa"
            v-bind="form.employer"
            :options="companys"
            :errors="errors.employer"
          />

          <FormMultiselect
            @input="onSelect"
            :value="state.services.map(item => services.find(service => service._id === item))"
            :options="services"
            labelTitle="Serviços"
            placeholder="Escolha uma opção"
            label="description"
            track-by="_id"
            multiple
          ></FormMultiselect>

          <FormInput
            label="Endereço"
            v-bind="form.address"
            :errors="errors.address"
          />
        </div>
      </div>
    </SidebarForm>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useForm, useFieldArray } from "vee-validate";
import { useUserStore } from "@/stores/userStores";
import { required, number } from "@/composable/rules";
import { onlyAdmin } from "@/composable/auth";

const userStore = useUserStore();
const plugin = useNuxtApp();
const config = useRuntimeConfig();
const snackbar = useSnackbar();

const $swal: any = plugin.$swal;

const { token } = userStore;

const api_url = config.public.api_url;

const datasource: any = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const totalItems = ref(0);

const sort = ref({
  key: "email",
  order: 1,
});

const loading = ref(false);
const isOpen = ref(false);
const currentItem = ref(null as unknown as any);

const companys = ref([]);
const services = ref([]);
const state = ref({
  services: [],
  picture: "" as unknown as any,
  attachment: "" as unknown as any,
  loadValue: {},
});

const {
  defineInputBinds,
  defineComponentBinds,
  handleSubmit,
  errors,
  setValues,
  resetForm,
} = useForm({
  validationSchema: {
    name: [required],
    email: [required],
    password: [required],
    phone: [required],
    about: [],
    address: [required],
    employer: [required],
  },
});

const form = ref({
  name: defineInputBinds("name"),
  email: defineInputBinds("email"),
  phone: defineInputBinds("phone"),
  about: defineInputBinds("about"),
  password: defineInputBinds("password"),
  employer: defineInputBinds("employer"),
  address: defineInputBinds("address"),
});

onMounted(async () => {
  try {
    loading.value = true;
    onlyAdmin()
    await requestPagination();
    await requestPaginationCompanys();
    await requestPaginationServices();
    loading.value = false;
  } catch (error) {
    loading.value = false;
  }
});

const handleCreate = (item: any) => {
  state.value.services = [];
  state.value.picture = "";
  state.value.attachment = "";

  resetForm();
  setValues({});
  currentItem.value = null;
  isOpen.value = true;
};

const handleUpdate = async (item: any) => {
  state.value.services = [];
  state.value.picture = "";
  state.value.attachment = "";

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
    key: "picture",
    label: "Nome",
    type: "picture",
  },
  {
    key: "email",
    label: "Email",
    sort: true,
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
    sort: true,
  },
];

const requestSorted = async (values: any = {}) => {
  await requestPagination({
    ...values,
    paginate: {
      currentPage: currentPage.value,
      itemsPerPage: itemsPerPage.value,
    },
  });
};

const requestPaginated = async (values: any = {}) => {
  await requestPagination({
    ...values,
    sort: {
      key: sort.value.key,
      order: sort.value.order,
    },
  });
};

const requestPagination = async (values: any = {}) => {
  const response: any = await $fetch(`${api_url}/user/paginate`, {
    method: "GET",
    query: { ...values, type: "employee" },
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (response?.users) {
    datasource.value = response.users;
    currentPage.value = response.paginate.currentPage;
    itemsPerPage.value = response.paginate.itemsPerPage;
    totalItems.value = response.paginate.totalItems;
    sort.value.key = response?.sort?.key;
    sort.value.order = response?.sort?.order;
  }
};

const requestPaginationCompanys = async (values: any = {}) => {
  const response: any = await $fetch(`${api_url}/company`, {
    method: "GET",
    query: { ...values },
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (response?.companys) {
    companys.value = response.companys;
  }
};

const requestPaginationServices = async (values: any = {}) => {
  const response: any = await $fetch(`${api_url}/service`, {
    method: "GET",
    query: { ...values },
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (response?.services) {
    services.value = response.services;
  }
};

const uploadAvatar = async () => {
  try {
    if (!state.value.attachment) {
      return;
    }

    let formData = new FormData();
    formData.append("avatar", state.value.attachment);

    const response: any = await $fetch(`${api_url}/avatar`, {
      method: "POST",
      body: formData,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (!response?.avatar) {
      snackbar.add({
        type: "error",
        text: response.message,
      });
    }

    state.value.picture = response.avatar.url;
  } catch (error) {
    snackbar.add({
      type: "error",
      text: "Ops! Ocorreu um erro ao fazer upload da imagem...",
    });
  }
};

const create = async (values: any) => {
  try {
    loading.value = true;

    await uploadAvatar();

    const response: any = await $fetch(`${api_url}/user`, {
      method: "POST",
      body: { ...values, ...state.value, type: "employee" },
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (!response?.user) {
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
    loading.value = false;
  } catch (error) {
    loading.value = false;

    snackbar.add({
      type: "error",
      text: "Ops! Ocorreu um erro...",
    });
  }
};

const update = async (values: any) => {
  try {
    await uploadAvatar();

    const response: any = await $fetch(
      `${api_url}/user/${currentItem?.value?._id}`,
      {
        method: "PUT",
        body: { ...state.value.loadValue, ...values, ...state.value },
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
    const response: any = await $fetch(`${api_url}/user/${_id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    state.value.loadValue = response.user;

    setValues({
      name: response.user.name,
      email: response.user.email,
      phone: response.user.phone,
      about: response.user.about,
      password: response.user.password,
      employer: response.user.employer,
      address: response.user.address,
    });

    state.value.picture = response.user?.picture ?? "";
    state.value.services = response.user?.services ?? [];
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
          const response: any = await $fetch(`${api_url}/user/${_id}`, {
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

function onSelect(options: any, id: string) {
  state.value.services = options.map((opt: any) => opt?._id ? opt._id : opt )
}
</script>