<template>
  <AdminLayout>
    <Table
      v-if="isTable"
      :columns="columns"
      :data="datasource"
      @create="handleCreate"
      @update="handleUpdate"
      @delete="handleDelete"
      :loading="loading"
      :sorted="sort"
      hasMultipleView
      @change-view="isTable = !isTable"
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
    <Calendar
      v-else
      @create="handleCreate"
      @update="handleUpdate"
      @change-view="isTable = !isTable"
    />
    <SidebarForm
      :isOpen="isOpen"
      @closeModal="closeForm"
      :isUpdate="!!currentItem?._id"
      title="reserva"
      @submit="onSubmit"
      :loading="loading"
    >
      <div class="grid gap-4">
        <FormInput
          label="Data"
          type="date"
          v-bind="form.date"
          :min="getMinDate"
          :max="getMaxDate"
          :errors="errors.date"
        />

        <FormInput
          label="Hora"
          type="time"
          v-bind="form.startTime"
          :errors="errors.startTime"
        />

        <FormSelect
          label="Cliente"
          v-bind="form.customer"
          :options="
            clients.map((client) => {
              if (!client?.name) {
                client.name = client.email;
              }
              return client;
            })
          "
          :errors="errors.customer"
        />

        <FormSelect
          label="Barbeiro"
          v-bind="form.employee"
          :options="employees"
          :errors="errors.employee"
        />

        <FormMultiselect
          @input="onSelect"
          :value="
            state.services.map((item) =>
              services.find((service) => service._id === item)
            )
          "
          :options="services"
          placeholder="Serviços"
          label="description"
          track-by="_id"
          multiple
        ></FormMultiselect>

        <FormInput
          label="Mensagem"
          type="text"
          v-bind="form.message"
          :errors="errors.message"
        />
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
import Calendar from "@/components/Calendar/Calendar.vue";

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
  key: "date",
  order: 1,
});

const loading = ref(false);
const isOpen = ref(false);
const isTable = ref(false);
const currentItem = ref(null as unknown as any);

const services = ref([]);
const clients = ref([]);
const employees = ref([]);

const state = ref({
  services: [],
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
    date: [required],
    startTime: [required],
    employee: [required],
    customer: [required],
    message: [],
  },
});

const form = ref({
  date: defineInputBinds("date"),
  startTime: defineInputBinds("startTime"),
  employee: defineInputBinds("employee"),
  customer: defineInputBinds("customer"),
  message: defineInputBinds("message"),
});

onMounted(async () => {
  try {
    loading.value = true;
    onlyAdmin();
    await requestPagination();
    await requestPaginationClients();
    await requestPaginationEmployees();
    await requestPaginationServices();
    loading.value = false;
  } catch (error) {
    loading.value = false;
  }
});

const handleCreate = (item: any) => {
  state.value.services = [];
  resetForm();
  setValues({});
  currentItem.value = null;

  if (item) {
    setValues(item);
  }

  isOpen.value = true;
};

const handleUpdate = async (item: any) => {
  state.value.services = [];

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
    key: "date",
    label: "Dia marcado",
    type: "date",
    sort: true,
  },
  {
    key: "startTime",
    label: "Hora marcada",
    sort: true,
  },
  {
    key: "customer",
    label: "Cliente",
    type: "client",
  },
  {
    key: "employee",
    label: "Barbeiro",
    type: "user",
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

const getMinDate = computed(() => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
});

const getMaxDate = computed(() => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 2).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
});

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
  const response: any = await $fetch(`${api_url}/appointment/paginate`, {
    method: "GET",
    query: { ...values },
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (response?.appointments) {
    datasource.value = response.appointments;
    currentPage.value = response.paginate.currentPage;
    itemsPerPage.value = response.paginate.itemsPerPage;
    totalItems.value = response.paginate.totalItems;
    sort.value.key = response?.sort?.key;
    sort.value.order = response?.sort?.order;
  }
};

const requestPaginationClients = async (values: any = {}) => {
  const response: any = await $fetch(`${api_url}/user`, {
    method: "GET",
    query: { ...values, type: "user" },
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (response?.users) {
    clients.value = response.users;
  }
};

const requestPaginationEmployees = async (values: any = {}) => {
  const response: any = await $fetch(`${api_url}/user`, {
    method: "GET",
    query: { ...values, type: "employee" },
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (response?.users) {
    employees.value = response.users;
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

const create = async (values: any) => {
  try {
    loading.value = true;
    const response: any = await $fetch(`${api_url}/appointment`, {
      method: "POST",
      body: { ...values, ...state.value },
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (!response?.appointment) {
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
    loading.value = true;
    const response: any = await $fetch(
      `${api_url}/appointment/${currentItem?.value?._id}`,
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
    loading.value = false;
  } catch (error) {
    loading.value = false;
    snackbar.add({
      type: "error",
      text: "Ops! Ocorreu um erro...",
    });
  }
};

const load = async (_id: string) => {
  try {
    const response: any = await $fetch(`${api_url}/appointment/${_id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    state.value.loadValue = response.appointment;

    setValues({
      startTime: response.appointment.startTime,
      employee: response.appointment.employee,
      customer: response.appointment.customer,
      date: new Date(response.appointment?.date).toISOString().split("T")[0],
    });

    state.value.services = response.appointment?.services ?? [];
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
          const response: any = await $fetch(`${api_url}/appointment/${_id}`, {
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

    await requestPagination();
  } catch (error) {
    closeForm();
    snackbar.add({
      type: "error",
      text: "Ops! Ocorreu um erro...",
    });
  }
};

function onSelect(options: any, id: string) {
  state.value.services = options.map((opt: any) => (opt?._id ? opt._id : opt));
}
</script>