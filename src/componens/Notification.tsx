import React, { memo, useCallback, useEffect, useMemo } from "react";
import notifee from "@notifee/react-native";
import _ from "lodash";
import ToastService from "@/services/ToastService";
import messaging from "@react-native-firebase/messaging";
import {
  navigateToPracticeDetailScreen,
  navigateToPracticingScreen,
} from "@/ultils/navigation";

export const Notification = memo(() => {
  useEffect(() => {
    notification().then();
  }, []);

  console.log("messaging", messaging);
  const createNotification = useCallback(
    async (title: string, value: string) => {
      // Create a channel
      const channelId = await notifee.createChannel({
        id: "default",
        name: "Default Channel",
      });

      // Display a notification
      await notifee.displayNotification({
        title: title || "",
        body: value || "",
        android: {
          channelId,
        },
      });
    },
    []
  );

  const showToast = useMemo(
    () =>
      _.debounce((title, body) => {
        ToastService.show(`${title} ${body}`);
      }, 1000),
    []
  );

  const notification = useCallback(async () => {
    await requestUserPermission();
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      if (!remoteMessage?.data) {
        await createNotification(
          remoteMessage.notification?.title || "",
          remoteMessage.notification?.body || ""
        ).then();
        showToast(
          remoteMessage.notification?.title || "",
          remoteMessage.notification?.body || ""
        );
      } else {
        console.log("remoteMessage", remoteMessage);
        if (remoteMessage?.data) {
          navigateToPracticeDetailScreen({
            practiceId: "",
            data: JSON.parse(remoteMessage?.data?.practice_data || ""),
          });
        }
      }

      //await requestMessageCheckin(remoteMessage.data?.boxID || '');
    });

    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      await createNotification(
        remoteMessage.notification?.title || "",
        remoteMessage.notification?.body || ""
      ).then();
      showToast(
        remoteMessage.notification?.title || "",
        remoteMessage.notification?.body || ""
      );
      //  await requestMessageCheckin(remoteMessage.data?.boxID || '');
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
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
      console.log("Authorization status:", authStatus);
    }
  }

  return null;
});
