import { useUserStore } from "@/stores/userStores";

export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore();
    
    if (!userStore.token && !userStore.user?.email) {
      return navigateTo('/login')
    }
  })
  