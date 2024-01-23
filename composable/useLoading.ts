import { ref } from 'vue';

const loading = ref(false);

type AsyncFunction = () => Promise<void>;

export default function useLoading() {
  const stopLoading = () => {
    loading.value = false;
  };

  const startLoading = async (asyncFunction: AsyncFunction): Promise<void> => {
    try {
      loading.value = true;
      await asyncFunction();
    } catch (error) {
      console.error('Erro durante a operação:', error);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    startLoading,
    stopLoading,
  };
}
