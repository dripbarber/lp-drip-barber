<template>
  <LayoutGuest
    title="Login"
    :image="{
      src: '/assets/login-office-1.jpg',
      alt: 'Office',
    }"
    @submit="onSubmit"
  >
    <FormInput
      label="E-mail"
      type="text"
      v-bind="form.email"
      placeholder="example@dripbarber.com"
      :errors="errors.email"
    />

    <FormInput
      label="Senha"
      type="password"
      v-bind="form.password"
      placeholder="******"
      :errors="errors.password"
    />

    <SubmitButton :loading="loading" />

    <hr />

    <div class="grid gap-2">
      <p v-for="link in links" :key="link.to">
        <router-link
          class="text-sm font-medium text-sky-600 hover:underline"
          :to="link.to"
        >
          {{ link.label }}
        </router-link>
      </p>
    </div>
  </LayoutGuest>
</template>

<script setup>
import { useUserStore } from "@/stores/userStores";
import { required, email, password } from "@/composable/rules";
import { useForm } from "vee-validate";
import { makeLoginSuccesful, redirectUser } from "@/composable/auth";
import { useNotify } from "@/composable/useNotify";
import { usePostPublic } from "@/composable/useHttp";
import useLoading from "@/composable/useLoading";

const userStore = useUserStore();
const { loading, startLoading } = useLoading();

const links = ref([
  {
    to: "forgotpassword",
    label: "Esqueceu a senha?",
  },
  {
    to: "register",
    label: "Cadastre-se",
  },
]);

const { defineInputBinds, handleSubmit, errors } = useForm({
  validationSchema: {
    email: [required, email],
    password: [required, password],
  },
});

const form = ref({
  email: defineInputBinds("email"),
  password: defineInputBinds("password"),
});

onMounted(() => {
  redirectUser(userStore.token, userStore.user);
});

const doLogin = (values) => {
  startLoading(async () => {
    const { data, error } = await usePostPublic(values, "/login");

    if (error?.data?.message) {
      useNotify(error.data.message);
      return;
    }

    makeLoginSuccesful(data);
  });
};

const onSubmit = handleSubmit(doLogin);
</script>


<style scoped>
.max-w-4xl {
  max-width: 56rem;
}
</style>