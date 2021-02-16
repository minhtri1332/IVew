import React, {useEffect} from 'react';

import ToastService from '@/services/ToastService';
import LoadingModal from '@/components/LoadingModal';
import {RootSiblingPortal} from 'react-native-root-siblings';
import {useLatest} from 'react-use';
import {useAsyncFn} from '@/hooks/useAsyncFn';

interface ToastType {
  message?: string; // for success is required, for error is optional
  keyboardAvoid?: boolean;
  atRoot?: boolean;
}

export const useAsyncFnToastHandled = (
  fn: (...args: any[]) => Promise<any>,
  options: {success?: ToastType; error?: ToastType},
) => {
  const latestOptions = useLatest(options);
  const latestFn = useLatest(fn);

  const [{loading, error, value}, start] = useAsyncFn(async (...args) => {
    await latestFn.current(...args);
    const {current: options} = latestOptions;
    const success = {
      keyboardAvoid: true,
      atRoot: true,
      ...options.success,
    };
    options.success &&
      ToastService.show(
        options.success.message,
        success.keyboardAvoid,
        success.atRoot,
      );
  }, []);

  useEffect(() => {
    if (!error) return;
    const {current: _options} = latestOptions;
    const errorConfig = {
      message: error.message,
      keyboardAvoid: true,
      atRoot: true,
      ..._options.error,
    };
    ToastService.showError(
      errorConfig.message,
      errorConfig.keyboardAvoid,
      errorConfig.atRoot,
      error.message,
    );
  }, [error]);

  const element = (
    <RootSiblingPortal>
      <LoadingModal isVisible={loading} coverScreen={false} />
    </RootSiblingPortal>
  );

  return {
    loading,
    error,
    value,
    start,
    element,
  };
};

export default useAsyncFnToastHandled;
