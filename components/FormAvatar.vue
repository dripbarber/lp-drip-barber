<template>
  <div class="w-28 h-28 mx-auto cursor-pointer">
    <input
      type="file"
      @change="uploadPhoto"
      id="fileUpload"
      hidden
      accept=".jpg, .jpeg, .png, .svg"
    />
    <img
      v-if="value ?? pathApi"
      class="object-cover w-full h-full rounded-full"
      :src="value ?? pathApi"
      loading="lazy"
      @click="openFileInput()"
    />
    <Icon
      v-else
      @click="openFileInput()"
      name="ph:user-bold"
      class="object-cover w-full h-full rounded-full"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const snackbar = useSnackbar();
const config = useRuntimeConfig();
const api_url = config.public.api_url;

const props = defineProps({
  modelValue: {
    type: Object,
    default: null,
  },
  src: {
    type: String,
    default: null,
  }
});

const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue ? URL.createObjectURL(props.modelValue as File) : null;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const pathApi = computed(() => {
  if(props.src) {
    return api_url + props.src 
  }
  return props.src
});

const uploadPhoto = ({ target }: any) => {
  const maxSize = 500 * 1024; // 500 KB
  if (target.files[0].size > maxSize) {
    snackbar.add({
      type: "error",
      text: "Tamanho da imagem não pode exceder o limite (500 KB).",
    });
    return;
  }
  
  emit("update:modelValue", target.files[0]);
};

const openFileInput = () => {
  document.getElementById("fileUpload")?.click();
};
</script>
