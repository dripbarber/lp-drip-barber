<template>
  <button
    :class="`form-border-width-btn form-shadow-btn focus:form-ring focus:outline-zero disabled:pointer-events-none disabled:opacity-60 disabled:cursor-not-allowed form-p-btn-lg form-radius-btn-lg form-text-lg form-bg-${type} form-bg-btn-${type} form-color-btn-${type} form-color-on-${type} form-border-color-btn-${type} transition-transform transform hover:scale-105`"
    :disabled="disabled"
    type="button"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const { type, disabled } = defineProps({
  type: {
    type: String,
    default: "primary",
  },
  disabled: {
    type: Boolean,
    required: true,
  },
});
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