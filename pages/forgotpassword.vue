<template>
  <LayoutGuest
    title="Esqueci a senha"
    :image="{
      src: '/assets/forgot-password-office-1.jpg',
      alt: 'Office',
    }"
    @submit="onSubmit"
  >
    <FormInput
      label="E-mail"
      type="text"
      v-bind="form.email"
      :errors="errors.email"
      placeholder="example@dripbarber.com"
    />

    <SubmitButton :loading="loading"> Recuperar senha </SubmitButton>

    <hr />

    <p>
      <router-link
        class="text-sm font-medium text-sky-600 hover:underline"
        to="login"
      >
        Você já tem a senha? Login
      </router-link>
    </p>
  </LayoutGuest>
</template>


<script setup>
import { required, email } from "@/composable/rules";
import { useForm } from "vee-validate";
import { usePostPublic } from "@/composable/useHttp";
import useLoading from "@/composable/useLoading";
import { useNotify } from "@/composable/useNotify";

const router = useRouter();
const config = useRuntimeConfig();
const api_url = config.public.api_url;
const snackbar = useSnackbar();

const { defineInputBinds, handleSubmit, errors } = useForm({
  validationSchema: {
    email: [required, email],
  },
});

const { loading, startLoading } = useLoading();

const form = ref({
  email: defineInputBinds("email"),
});

const doSubmit = async (values) => {
  startLoading(async () => {
    const { error } = await usePostPublic(
      values,
      `/recovery-password/${values.email}`
    );

    if (error.value?.data?.message) {
      useNotify(error.value.data.message);
      return;
    }

    useNotify("Email de recuperação de senha enviado com sucesso.", "success");

    setTimeout(() => {
      router.push({ path: "/login" });
    }, 1000);
  });
};

const onSubmit = handleSubmit(doSubmit);
</script>


<style scoped>
.max-w-4xl {
  max-width: 56rem;
}
</style>