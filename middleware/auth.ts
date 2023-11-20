import { useUserStore } from "@/stores/userStores";
import { onMounted } from 'vue';

export default defineNuxtRouteMiddleware((to, from) => {
  onMounted(() => {
    const userStore = useUserStore();

    if (!userStore.token && !userStore.user?.email) {
      return navigateTo('/login');
    }
  });

})
