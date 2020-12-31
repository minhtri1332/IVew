import React, {useEffect} from 'react';
import {translate, useAsyncFn, useLatest, useTheme} from '@/global';
import ToastService from '@/services/ToastService';
import Snackbar from 'react-native-snackbar';
import LoadingModal from '@/components/LoadingModal';
import {RootSiblingPortal} from 'react-native-root-siblings';

export const useAsyncFnSnackBar = (
  fn: (...args: any[]) => Promise<any>,
  options: {
    success?: string;
    error?: string;
    action?: () => void;
    labelAction?: string;
  },
) => {
  const latestOptions = useLatest(options);
  const latestFn = useLatest(fn);
  const theme = useTheme();

  const [{loading, error, value}, start] = useAsyncFn(async (...args) => {
    await latestFn.current(...args);
    const {current: options} = latestOptions;

    Snackbar.show({
      text: options.success || translate('common.updated_successfully'),
      duration: Snackbar.LENGTH_LONG,
      action: {
        text: options.labelAction
          ? options.labelAction || translate('common.go_to_detail')
          : '',
        textColor: theme.blue,
        onPress: options.action,
      },
    });
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

export default useAsyncFnSnackBar;
