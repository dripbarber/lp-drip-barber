

type SnackbarType = 'success' | 'error' ;

export function useNotify(message: string, type: SnackbarType = "error") {
    useSnackbar()
    .add({
        type: type,
        text: message,
    });
}