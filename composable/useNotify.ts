
type SnackbarType = 'success' | 'error' ;

export function useNotify(message: string, type: SnackbarType = "error") {
    const { $notify }: any = useNuxtApp();

    $notify
    .add({
        type: type,
        text: message,
    });
}