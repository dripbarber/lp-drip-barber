import { useUserStore } from "@/stores/userStores";

export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore();
    const { token, user } = userStore;
    
    if (!token && !user?.email) {
      return navigateTo('/login')
    }
  })
  