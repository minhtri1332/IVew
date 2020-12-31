import React, {memo, useCallback, useEffect} from 'react';
import {View} from 'react-native';
import OneSignal from 'react-native-onesignal';
import {setOneSignalIdAction} from '@/store/constant';
import {
  navigateToDetailCustomNotify,
  navigateToDetailHistoryScreen,
} from '@/utils/navigation';

export const InitOnesignal = memo(() => {
  const onOpened = (openResult: any) => {
    const {additionalData} = openResult?.notification?.payload || {};
    const {details} = additionalData || {};
    if (details) {
      const {
        id,
        type,
        notifiId,
      }: {
        id: string;
        type: 'orderdetails' | 'customnotifi';
        notifiId: string;
      } = details ? JSON.parse(details) : '';
      if (id && type === 'orderdetails') {
        navigateToDetailHistoryScreen({
          id,
          isNotify: true,
          notifyId: notifiId,
          title: 'Chi tiết đơn hàng',
        });
      } else {
        navigateToDetailCustomNotify({id, notificationIdSeen: notifiId});
      }
    }
  };

  const onReceived = (openResult: any) => {
    console.log('on receive ', openResult);
  };

  const onIds = useCallback((device: any) => {
    if (!device) {
      return;
    }
    const userId = device.userId;
    setOneSignalIdAction(userId);
  }, []);

  useEffect(() => {
    OneSignal.addEventListener('received', onReceived);
    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);
    OneSignal.inFocusDisplaying(2);
    return () => {
      OneSignal.removeEventListener('opened', onOpened);
      OneSignal.removeEventListener('received', onReceived);
      OneSignal.removeEventListener('ids', onIds);
    };
  }, []);

  return <View />;
});
