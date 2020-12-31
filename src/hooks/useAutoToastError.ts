import {useEffect} from 'react';
import ToastService from '@/services/ToastService';

export const useAutoToastError = (
  error: Error | undefined,
  defaultMessage?: string,
) => {
  useEffect(() => {
    if (!error) return;
    ToastService.showError(error.message, true, true, defaultMessage || '');
  }, [error, defaultMessage]);
};

export default useAutoToastError;
