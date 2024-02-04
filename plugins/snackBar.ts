
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('notify', useSnackbar())
})