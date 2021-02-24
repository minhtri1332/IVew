import React from 'react';
import {
  NavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

import {TransitionPresets} from "@react-navigation/stack";
import {HistoryDetailProps} from "@/screens/checkin/Screens/HistoryDetail";
import {FaceDetectScreenProps} from '@/screens/FaceDetect/FaceDetect';

export const defaultScreenOptions = TransitionPresets.SlideFromRightIOS;

export const navigationRef = React.createRef<NavigationContainerRef>();

export const navigation = () => navigationRef.current!;

export const createNavigate = <T extends object>(screenName: string) => (
  params?: T,
) => {
  return navigation().navigate(screenName, params);
};

export const createPush = <T extends object>(screenName: string) => (
  params?: T,
) => {
  return navigation().dispatch(StackActions.push(screenName, params))
};


export const createReplace = <T extends object>(screenName: string) => (
  params?: T,
) => {
  return navigation().dispatch(StackActions.replace(screenName, params))
};


export const goBack = () => navigation().goBack();


export const replaceWithMainScreen = createNavigate(
  'HomeScreen'
);

export const navigateToLoginScreen = createPush(
  'LoginScreen'
);

export const navigateToForgotPasswordScreen = createNavigate(
  'ForgotPasswordScreen'
);

export const navigateToHistoryScreen = createNavigate(
  'HistoryScreen'
);
export const navigateToHistoryDetail = createNavigate<HistoryDetailProps>(
  'HistoryDetail'
);
export const navigateToMServiceScreen = createNavigate(
  'MServiceScreen'
);
export const navigateToHeadMapScreen = createNavigate(
  'HeadMapScreen'
);
export const navigateToMScanScreen = createNavigate(
  'MScanScreen'
);
export const navigateToFaceDetectScreen = createNavigate(
  'CameraScreen'
);
export const openModalCreateCustomer = createNavigate(
  'ModalCreateCustomer'
);
export const openFaceDetectScreen = createNavigate<FaceDetectScreenProps>(
  'FaceDetectScreen'
);

export const navigateProfileScreen = createNavigate(
  'ProfileScreen'
)
export const navigateComingSoonScreen = createNavigate(
  'ComingSoon'
);
