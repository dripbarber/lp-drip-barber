import { useUserStore } from "@/stores/userStores";

export async function usePostPublic(values: any, path: string) {
    const config = useRuntimeConfig();
    const api_url = config.public.api_url;

    return await useFetch(`${api_url}${path}`, {
        method: "POST",
        body: { ...values },
    });
}


export async function usePost(values: any, path: string) {
    const config = useRuntimeConfig();
    const api_url = config.public.api_url;
    const userStore = useUserStore();

    return await useFetch(`${api_url}${path}`, {
        method: "POST",
        body: values,
        headers: {
            authorization: `Bearer ${userStore.token}`,
          },
    });
}