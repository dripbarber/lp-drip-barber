import { useUserStore } from "@/stores/userStores";

export default defineNuxtPlugin((nuxt) => {
    const userStore = useUserStore(nuxt.$pinia);

    addRouteMiddleware('auth', async (to, from) => {
        if ((!userStore.token && !userStore.user?.email)) {
            return navigateTo('/login');
        }
    });
});