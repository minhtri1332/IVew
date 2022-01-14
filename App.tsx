// @ts-ignore
import React, {memo, useCallback, useEffect, useMemo} from 'react';
import {Alert, StatusBar, YellowBox} from 'react-native';
//@ts-ignore
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import Routes from './src/Routes';
import messaging, {firebase} from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import {requestMessageCheckin} from './src/store/notification/functions';
import Toast from 'react-native-simple-toast';
YellowBox.ignoreWarnings(['']);

export const App = memo(() => {
  useEffect(() => {
    notification().then();
  }, []);

  const createNotification = useCallback(
    async (title: string, value: string) => {
      // Create a channel
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });

      // Display a notification
      await notifee.displayNotification({
        title: title || '',
        body: value || '',
        android: {
          channelId,
        },
      });

      Toast.showWithGravity(`${title} ${value}`, Toast.LONG, Toast.TOP);
    },
    [],
  );

  const notification = useCallback(async () => {
    await requestUserPermission();
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('noti ok');
      createNotification(
        remoteMessage.data?.title || '',
        remoteMessage.data?.value || '',
      ).then();
      //await requestMessageCheckin(remoteMessage.data?.boxID || '');
    });

    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      console.log('noti ok');
      createNotification(
        remoteMessage.data?.title || '',
        remoteMessage.data?.value || '',
      ).then();
      //  await requestMessageCheckin(remoteMessage.data?.boxID || '');
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
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
