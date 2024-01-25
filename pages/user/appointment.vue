<template>
  <UserLayout>
    <template v-if="!itsThanks">
      <h2
        class="my-3 sm:my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200"
      >
        Reserve um horário
      </h2>
      <p class="mb-6 text-gray-600 dark:text-gray-100">
        Serviços no melhor estilo brasileiro, faça uma marcação. Nossos
        barbeiros estão animados para ver você!
      </p>

      <StepForms
        v-model="currentStep"
        :options="['Sede', 'Barbeiro', 'Serviços', 'Data e Hora']"
      >
        <template #step_1>
          <InputSelectCard
            v-model="state.company"
            :options="optionsCompanys"
            title="name"
            text="address"
            label="Escolha uma sede"
            :loading="loading"
          />
        </template>
        <template #step_2>
          <InputSelectAvatar
            v-if="state.company"
            label="Escolha um barbeiro"
            v-model="state.employee"
            :options="optionsBarbers"
            :loading="loadingBarber"
          />
        </template>
        <template #step_3>
          <InputSelectCheckbox
            v-if="state.employee"
            v-model="state.services"
            :options="optionsService"
            title="description"
            text="about"
            label="Escolha os serviços"
          />
        </template>
        <template #step_4>
          <div>
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
                  <InputSelectHour
                    v-model="state.startTime"
                    :options="optionTimes"
                    :loading="loadingHour"
                  />
                </div>
              </client-only>
            </div>

            <TextareaInput
              label="Mensagem"
              type="textar"
              v-model="state.message"
              rows="3"
              placeholder="Envie alguma observação"
            />
          </div>
        </template>

        <template #footer>
          <div class="flex justify-between">
            <StepButton
              :disabled="currentStep === 0"
              @click="currentStep--"
              type="secondary"
            >
              Voltar
            </StepButton>

            <StepButton
              v-if="currentStep < 3"
              @click="currentStep++"
              :disabled="disableContinue"
            >
              Continuar
            </StepButton>

            <StepButton
              v-else
              @click="createAppointment"
              :disabled="!state.employee || !state.date || !state.startTime"
            >
              Agendar
            </StepButton>
          </div>
        </template>
      </StepForms>
    </template>
    <template v-else>
      <div class="h-full flex items-center justify-center">
        <div
          class="p-8 mb-8 mt-10 sm:mt-20 bg-white rounded-lg shadow-md dark:bg-gray-800 grid gap-2"
        >
          <h2
            class="text-2xl font-semibold text-gray-700 dark:text-gray-200 flex gap-2"
          >
            <Icon name="mdi:calendar-text" class="h-7 w-7" aria-hidden="true" />
            Agradecemos por sua reserva!
          </h2>
          <p class="mb-6 text-gray-600 dark:text-gray-100">
            Obrigado por escolher a nossa barbearia!<br />Estamos ansiosos para
            recebê-lo em breve.
          </p>

          <div class="grid gap-1">
            <p><b>Local:</b> {{ getCompanyName(state.company) }}</p>
            <p><b>Barbeiro:</b> {{ getBarberName(state.employee) }}</p>
            <p><b>Data:</b> {{ formatDate(state.date) }}</p>
            <p><b>Hora:</b> {{ state.startTime }}</p>
            <p><b>Serviços:</b> {{ getServiceDescriptions() }}</p>
          </div>
        </div>
      </div>
    </template>
  </UserLayout>
</template>

<script setup lang="ts">
import { useThemeStore } from "@/stores/themeStores";
import { useUserStore } from "@/stores/userStores";
import { onlyUser } from "@/composable/auth";
import { useNotify } from "~/composable/useNotify";
import { usePost } from "~/composable/useHttp";

const optionsBarbers = ref([]);
const optionsCompanys = ref([]);
const optionsService = ref([]);
const optionTimes = ref([]);
const optionDates = ref([]);

const currentStep = ref(0);
const loading = ref(false);
const loadingBarber = ref(false);
const loadingHour = ref(false);

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

const itsThanks = ref(false);

onMounted(async () => {
  onlyUser();
  await requestPaginationCompanys();
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
      state.value.date = "";
      state.value.startTime = "";
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

const createAppointment = async () => {
  try {
    const response: any = usePost(state.value, '/appointment')
    
    if (!response?.appointment) {
      useNotify(response.message);
      return;
    }

    snackbar.add({
      type: "success",
      text: response?.message,
    });

    itsThanks.value = true;
  } catch (error) {
    useNotify("Ops! Ocorreu um erro...");
  }
};

const requestPaginationBarbers = async (values: any = {}) => {
  loadingBarber.value = true;
  try {
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
    loadingBarber.value = false;
  } catch (error) {
    useNotify("Ops! Ocorreu um erro...");
    loadingBarber.value = false;
  }
};

const requestPaginationDates = async (values: any = {}) => {
  loading.value = true;
  try {
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
    loading.value = false;
  } catch (error) {
    useNotify("Ops! Ocorreu um erro...");
    loading.value = false;
  }
};

const requestPaginationHours = async (values: any = {}) => {
  loadingHour.value = true;

  try {
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
    loadingHour.value = false;
  } catch (error) {
    useNotify("Ops! Ocorreu um erro...");
    loadingHour.value = false;
  }
};

const requestPaginationCompanys = async (values: any = {}) => {
  try {
    loading.value = true;
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
    loading.value = false;
  } catch (error) {
    loading.value = false;
    useNotify("Ops! Ocorreu um erro...");
  }
};

const themeStores = useThemeStore();

const isDark = computed(() => {
  return themeStores.getTheme === "dark";
});

const disableContinue = computed(() => {
  if (currentStep.value === 0) {
    return !state.value.company;
  } else if (currentStep.value === 1) {
    return !state.value.employee;
  } else if (currentStep.value === 2) {
    return !state.value.services;
  }
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

function formatDate(dateString: string) {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}
</script>

<style scoped>
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
.form-border-color-btn-secondary {
  border-color: #e2e8f0;
}

.form-bg-btn-secondary {
  background-color: #e2e8f0;
}
.form-color-btn-secondary {
  color: #334155;
}

.form-color-on-primary {
  color: #ffffff;
}
.form-bg-primary {
  background-color: #17c495;
}
.form-shadow-btn {
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
}
.form-border-width-btn {
  border-width: 1px 1px 1px 1px;
  border-style: solid;
}
.form-border-color-btn {
  border-color: #17c495;
}
.form-p-btn-lg {
  padding: 0.625rem 1.25rem;
}
.form-radius-btn-lg {
  border-radius: 0.25rem;
}
.form-text-lg {
  font-size: 1rem;
  line-height: 1.5rem;
  letter-spacing: 0;
}
.transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;
}
</style>