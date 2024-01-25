import { ref } from 'vue';
import { useNotify } from './useNotify';

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
      useNotify("Ops! Ocorreu um erro...")
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
