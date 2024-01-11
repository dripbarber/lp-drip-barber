import { useUserStore } from "@/stores/userStores";

export const onlyAdmin = () => {
    const userStore = useUserStore();

    if(userStore.user.type !== 'admin') {
        navigateTo('/login'); 
    }
}

export const onlyEmployee = () => {
    const userStore = useUserStore();

    if(userStore.user.type !== 'employee') {
        navigateTo('/login'); 
    }
}

export const onlyUser = (value: any) => {
    const userStore = useUserStore();

    if(userStore.user.type !== 'user') {
        navigateTo('/login'); 
    }
}