<template>
  <section class="h-screen overflow-y-auto dark:bg-gray-900">
    <Navigation />
    <main class="overflow-y-auto dark:bg-gray-900 h-full">
      <div class="container max-w-4xl mx-auto h-full">
        <template v-if="!itsThanks">
          <h2
            class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200"
          >
            Reserve um horário
          </h2>
          <!-- CTA -->
          <p class="mb-6 text-gray-600 dark:text-gray-100">
            Serviços no melhor estilo brasileiro, faça uma marcação. Nossos
            barbeiros estão animados para ver você!
          </p>

          <!-- General elements -->
          <form
            class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800"
          >
            <label for="barber" class="block text-sm">
              <span class="text-gray-700 dark:text-gray-400"> Local </span>
              <select
                id="barber"
                name="barber"
                class="block mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-sky-400 focus:outline-none focus:shadow-outline-sky dark:focus:shadow-outline-gray"
                v-model="state.company"
              >
                <option value="" disabled>Escolha uma sede</option>
                <option
                  v-for="(item, index) in optionsCompanys"
                  :key="index"
                  :value="item._id"
                >
                  {{ item.name }} - {{ item.address }}
                </option>
              </select>
            </label>

            <label v-if="state.company" for="barber" class="block text-sm mt-2">
              <span class="text-gray-700 dark:text-gray-400"> Barbeiro </span>
              <select
                id="barber"
                name="barber"
                class="block mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-sky-400 focus:outline-none focus:shadow-outline-sky dark:focus:shadow-outline-gray"
                :disabled="!state.company"
                v-model="state.employee"
              >
                <option value="" disabled>Escolha um barbeiro</option>
                <option
                  v-for="(item, index) in optionsBarbers"
                  :key="index"
                  :value="item._id"
                >
                  {{ item.name }}
                </option>
              </select>
            </label>

            <div v-if="state.employee" class="mt-4 text-sm">
              <span class="text-gray-700 dark:text-gray-400"> Serviços </span>
              <div class="mt-2 flex flex-row space-x-2">
                <div
                  v-for="(service, index) in optionsService"
                  :key="index"
                  class="flex items-center"
                >
                  <input
                    type="checkbox"
                    :id="service._id"
                    class="text-sky-600 focus:border-sky-400 focus:outline-none focus:shadow-outline-sky dark:focus:shadow-outline-gray"
                    :name="service._id"
                    :value="service._id"
                    @click="toggleService(service._id)"
                    :disabled="!state.employee"
                    :checked="state.services.includes(service._id)"
                  />
                  <label
                    :for="service"
                    class="text-gray-600 dark:text-gray-400"
                  >
                    <span class="pl-2">{{ service.description }}</span>
                  </label>
                </div>
              </div>
            </div>
            <div
              v-if="state.services.length"
              class="mt-4 text-sm flex flex-col md:flex-row md:space-x-5 items-center"
            >
              <client-only>
                <VDatePicker
                  v-model="state.date"
                  mode="date"
                  is-required
                  class="v-calendar mb-4 w-full"
                  :is-dark="isDark"
                  :disabled-dates="[
                    { start: null, end: new Date() },
                    ...optionDates,
                    { start: limitDate, end: null },
                  ]"
                />

                <div
                  class="max-h-56 md:max-h-72 w-fit overflow-scroll overflow-x-hidden px-2 flex flex-col items-center md:items-start"
                  v-if="state.date"
                >
                  <label
                    v-for="(time, index) in optionTimes"
                    :key="index"
                    class="flex items-center py-1"
                  >
                    <input
                      type="radio"
                      v-model="state.startTime"
                      :value="time"
                      class="sr-only"
                    />
                    <span
                      class="px-6 py-2 text-sm font-medium hover:text-white transition-colors duration-150 border border-sky-600 hover:border-transparent rounded active:bg-sky-600 hover:bg-sky-700 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray dark:text-white dark:border-white hover:cursor-pointer"
                      :class="{
                        'bg-sky-600 text-white': state.startTime === time,
                      }"
                    >
                      {{ time }}
                    </span>
                  </label>
                </div>
              </client-only>
            </div>

            <label class="block mt-4 text-sm">
              <span class="text-gray-700 dark:text-gray-400">Mensagem</span>
              <textarea
                v-model="state.message"
                class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-sky-400 focus:outline-none focus:shadow-outline-sky dark:focus:shadow-outline-gray resize-none"
                rows="3"
                placeholder="Envie alguma observação"
              ></textarea>
            </label>
            <button
              class="px-4 mt-4 text-sm font-medium leading-7 text-white transition-colors duration-150 bg-sky-600 border border-transparent rounded active:bg-sky-600 hover:bg-sky-700 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray disabled:bg-sky-400"
              :disabled="!state.employee || !state.date || !state.startTime"
              @click="createAppointment"
            >
              Agendar
            </button>
          </form>
        </template>
        <template v-else>
          <div class="h-full flex items-center justify-center">
            <div
              class="p-8 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 grid gap-2"
            >
              <h2
                class="text-2xl font-semibold text-gray-700 dark:text-gray-200 flex gap-2"
              >
                <Icon
                  name="mdi:calendar-text"
                  class="h-7 w-7"
                  aria-hidden="true"
                />
                Agradecemos por sua reserva!
              </h2>
              <p class="mb-6 text-gray-600 dark:text-gray-100">
                Obrigado por escolher a nossa barbearia! Estamos ansiosos para
                recebê-lo em breve.
              </p>

              <div class="grid gap-1">
                <p><b>Local:</b> {{ getCompanyName(state.company) }}</p>
                <p><b>Barbeiro:</b> {{ getBarberName(state.employee) }}</p>
                <p><b>Data:</b> {{ state.date }}</p>
                <p><b>Hora:</b> {{ state.startTime }}</p>
                <p><b>Serviços:</b> {{ getServiceDescriptions() }}</p>
              </div>
            </div>
          </div>
        </template>
      </div>
    </main>
  </section>
</template>

<script setup lang="ts">
import { ref } from "#imports";
import { useThemeStore } from "@/stores/themeStores";
import { useUserStore } from "@/stores/userStores";

const optionsBarbers = ref([]);
const optionsCompanys = ref([]);
const optionsService = ref([]);
const optionTimes = ref([]);
const optionDates = ref([]);

const userStore = useUserStore();
const config = useRuntimeConfig();
const snackbar = useSnackbar();

const api_url = config.public.api_url;

const state = ref({
  customer: userStore.user._id,
  company: "",
  employee: "",
  date: "",
  startTime: "",
  message: "",
  services: [] as string[],
});

const itsThanks = ref(true);

definePageMeta({
  middleware: "auth",
});

onMounted(async () => {
  try {
    await requestPaginationCompanys();
  } catch (error) {}
});

watch(
  () => state.value.company,
  async (newVal, oldVal) => {
    if (oldVal !== newVal) {
      state.value.employee = "";
      await requestPaginationBarbers();
    }
  }
);

watch(
  () => state.value.employee,
  async (newVal, oldVal) => {
    if (oldVal !== newVal) {
      state.value.services = [];
      optionsService.value = newVal
        ? (
            optionsBarbers.value.find(
              (item) => (item as any)._id === newVal
            ) as any
          )?.services
        : [];
    }
    if (newVal) {
      await requestPaginationDates();
    }
  }
);

watch(
  () => state.value.date,
  async (newVal, oldVal) => {
    if (newVal) {
      await requestPaginationHours();
    }
  }
);

const toggleService = (_id: string) => {
  if (state.value.services.includes(_id)) {
    state.value.services = state.value.services.filter((s) => s !== _id);
  } else {
    state.value.services.push(_id);
  }
};

const createAppointment = async () => {
  try {
    const response: any = await $fetch(`${api_url}/appointment`, {
      method: "POST",
      body: { ...state.value },
      headers: {
        authorization: `Bearer ${userStore.token}`,
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
  } catch (error) {
    snackbar.add({
      type: "error",
      text: "Ops! Ocorreu um erro...",
    });
  }
};

const requestPaginationBarbers = async (values: any = {}) => {
  const response: any = await $fetch(`${api_url}/user`, {
    method: "GET",
    query: { ...values, type: "employee", employer: state.value.company },
    headers: {
      authorization: `Bearer ${userStore.token}`,
    },
  });

  if (response?.users) {
    optionsBarbers.value = response.users;
  }
};

const requestPaginationDates = async (values: any = {}) => {
  const response: any = await $fetch(
    `${api_url}/availability/days-employee/${state.value.employee}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${userStore.token}`,
      },
    }
  );

  if (response?.days) {
    optionDates.value = response.days;
  }
};

const requestPaginationHours = async (values: any = {}) => {
  const response: any = await $fetch(
    `${api_url}/availability/hours-employee/${state.value.employee}`,
    {
      method: "GET",
      query: { ...values, date: new Date(state.value.date) },
      headers: {
        authorization: `Bearer ${userStore.token}`,
      },
    }
  );

  if (response?.hours) {
    optionTimes.value = response?.hours;
  }
};

const requestPaginationCompanys = async (values: any = {}) => {
  const response: any = await $fetch(`${api_url}/company`, {
    method: "GET",
    query: { ...values },
    headers: {
      authorization: `Bearer ${userStore.token}`,
    },
  });

  if (response?.companys) {
    optionsCompanys.value = response.companys;
  }
};

const themeStores = useThemeStore();

const isDark = computed(() => {
  return themeStores.getTheme === "dark";
});

const limitDate = computed(() => {
  const limit = new Date();
  return limit.setMonth(limit.getMonth() + 2);
});

const getBarberName = (barberId: string) => {
  const selectedBarber: any = optionsBarbers.value.find(
    (barber: any) => barber?._id === barberId
  );
  return selectedBarber ? selectedBarber?.name : "";
};

const getServiceDescriptions = () => {
  return state.value.services
    .map((serviceId: any) => {
      const selectedService: any = optionsService.value.find(
        (service: any) => service._id === serviceId
      );
      return selectedService ? selectedService.description : "";
    })
    .join(", ");
};

const getCompanyName = (companyId: string) => {
  const selectedCompany: any = optionsCompanys.value.find(
    (company: any) => company._id === companyId
  );
  return selectedCompany
    ? `${selectedCompany.name} - ${selectedCompany.address}`
    : "";
};
</script>

<style>
::-webkit-scrollbar-track {
  background-color: #fffefe;
}
::-webkit-scrollbar {
  width: 2px;
  background: #f4f4f4;
}
::-webkit-scrollbar-thumb {
  background: #6497b1;
}
</style>