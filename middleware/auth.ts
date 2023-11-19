import { useUserStore } from "@/stores/userStores";
import { onMounted } from 'vue';

export default defineNuxtRouteMiddleware((to, from) => {
  onMounted(() => {
    const userStore = useUserStore();
    console.log('Token:', userStore.token);
    console.log('User:', userStore.user);

    if (!userStore.token && !userStore.user?.email) {
      return navigateTo('/login');
    }
  });

})
