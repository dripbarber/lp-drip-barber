

export function useNotify(message: string, type = "error") {
    useSnackbar()
    .add({
        type: type,
        text: message,
    });
}