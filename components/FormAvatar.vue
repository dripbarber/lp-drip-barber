<template>
  <div class="w-24 h-24 mx-auto cursor-pointer">
    <input
      type="file"
      @change="uploadPhoto"
      id="fileUpload"
      hidden
      accept=".jpg, .jpeg, .png, .svg"
    />
    <img
      v-if="value ?? src"
      class="object-cover w-full h-full rounded-full"
      :src="value ?? src"
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

const props = defineProps({
  modelValue: {
    type: File,
    default: null
  },
  src: {
    type: String,
    default: null,
  }
});

const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue ? URL.createObjectURL(props.modelValue) : null;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const uploadPhoto = ({ target }: any) => {
  const maxSize = 200 * 1024; // 200 KB
  if (target.files[0].size > maxSize) {
    snackbar.add({
      type: "error",
      text: "Tamanho da imagem não pode exceder o limite (200 KB).",
    });
    return;
  }
  
  emit("update:modelValue", target.files[0]);
};

const openFileInput = () => {
  document.getElementById("fileUpload")?.click();
};
</script>
