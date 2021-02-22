// @ts-ignore
import React, {memo, useEffect} from 'react';
import {StatusBar, YellowBox, Text, Alert} from 'react-native';
//@ts-ignore
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import Routes from './src/Routes';
import messaging, {firebase} from '@react-native-firebase/messaging';
import {requestTokenDevice} from './src/store/auth/function';
import {requestMessageCheckin} from './src/store/notification/functions';

YellowBox.ignoreWarnings(['']);

export const App = memo(() => {
  useEffect(async () => {
    await requestUserPermission();
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      await requestMessageCheckin(remoteMessage.data?.boxID || '');
    });

    return unsubscribe;
  }, []);

  useEffect(async () => {
    const notificationOpen = messaging().getInitialNotification();
    if (notificationOpen) {
      const {title, body} = notificationOpen.notification;
      Alert.alert('getInitialNotification', title, body);
    }
  }, []);

  useEffect(async () => {
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
  }, []);

  useEffect(async () => {
    const unsubscribe = messaging().onNotificationOpenedApp(
      async (remoteMessage) => {
        Alert.alert('onNotificationOpenedApp', JSON.stringify(remoteMessage));
        await requestMessageCheckin(remoteMessage.data?.boxID || '');
      },
    );

    return unsubscribe;
  }, []);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  return (
    <Provider store={require('@/store').default}>
      <PersistGate persistor={require('@/store').persistor}>
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle="light-content"
        />
        <Routes />
      </PersistGate>
    </Provider>
  );
});

export default App;
