<template>
  <div class="flex items-center min-h-screen p-6 bg-gray-50">
    <div
      class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl"
    >
      <div class="flex flex-col overflow-y-auto md:flex-row">
        <div class="h-32 md:h-auto md:w-1/2">
          <img
            aria-hidden="true"
            class="object-cover w-full h-full"
            :src="image.src"
            :alt="image.alt"
          />
        </div>
        <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
          <form>
            <div class="w-full grid gap-4">
              <h1 class="text-xl font-semibold text-gray-700">{{ title }}</h1>
                <slot />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">

const emit = defineEmits(["click"]);
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: Object,
    required: true,
  },
});
</script>


<style scoped>
.max-w-4xl {
  max-width: 56rem;
}
</style>