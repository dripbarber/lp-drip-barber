export async function usePostPublic(values: any, path: string) {
    const config = useRuntimeConfig();
    const api_url = config.public.api_url;

    return await useFetch(`${api_url}${path}`, {
        method: "POST",
        body: { ...values },
    });
}