<template>
  <LayoutGuest
    title="Cadastre-se"
    :image="{
      src: '/assets/create-account-office-1.jpg',
      alt: 'Office',
    }"
    @submit="onSubmit"
  >
    <FormInput
      label="Nome"
      type="text"
      v-bind="form.name"
      :errors="errors.name"
      placeholder="Drip Barber"
    />

    <FormInput
      label="Telefone"
      type="text"
      v-bind="form.phone"
      :errors="errors.phone"
      placeholder="+351 999 999 999"
    />

    <FormInput
      label="E-mail"
      type="text"
      v-bind="form.email"
      :errors="errors.email"
      placeholder="example@dripbarber.com"
    />

    <FormInput
      label="Senha"
      type="password"
      v-bind="form.password"
      :errors="errors.password"
      placeholder="*******"
    />

    <FormInput
      label="Confirmar Senha"
      type="password"
      v-bind="form.confirmPassword"
      :errors="errors.confirmPassword"
      placeholder="*******"
    />

    <SubmitButton :loading="loading"> Cadastrar </SubmitButton>

    <hr />

    <p>
      <router-link
        class="text-sm font-medium text-sky-600 hover:underline"
        to="login"
      >
        Você já tem uma conta? Login
      </router-link>
    </p>
  </LayoutGuest>
</template>

<script setup>
import { useUserStore } from "@/stores/userStores";
import { required, email, password } from "@/composable/rules";
import { useForm } from "vee-validate";
import useLoading from "@/composable/useLoading";
import { useNotify } from "@/composable/useNotify";

const router = useRouter();

const { loading, startLoading } = useLoading();

const { defineInputBinds, handleSubmit, errors } = useForm({
  validationSchema: {
    name: [required],
    phone: [required],
    email: [required, email],
    password: [required, password],
    confirmPassword: [required, password],
  },
});

const form = ref({
  name: defineInputBinds("name"),
  phone: defineInputBinds("phone"),
  email: defineInputBinds("email"),
  password: defineInputBinds("password"),
  confirmPassword: defineInputBinds("confirmPassword"),
});

const doSignup = (values) => {
  startLoading(async () => {
    const { error } = await usePostPublic(values, "/signup");

    if (error.value?.data?.message) {
      useNotify(error.value.data.message);
      return;
    }

    useNotify("Usuário criado com sucesso.", "success");
    setTimeout(() => {
      router.push({ path: "/login" });
    }, 1500);
  });
};

const onSubmit = handleSubmit(doSignup);
</script>


<style scoped>
.max-w-4xl {
  max-width: 56rem;
}
</style>