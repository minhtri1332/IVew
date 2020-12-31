import React from 'react';
import {
  NavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

import {TransitionPresets} from "@react-navigation/stack";
import {DetailScreenProps} from "@/screens/Detail/DetailScreen";

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


export const replaceWithMainScreen = createReplace(
  'Main'
);

export const navigateToDetailScreen = createNavigate<DetailScreenProps>(
  'DetailScreen'
);

export const navigateToLoginScreen = createNavigate(
  'LoginScreen'
);

export const navigateToForgotPasswordScreen = createNavigate(
  'ForgotPasswordScreen'
);

export const navigateToRegisterScreen = createNavigate(
  'RegisterScreen'
);

export const openAddCameraScreen = createNavigate(
  'AddCameraScreen'
);

export const openNotifyScreen = createNavigate(
  'NotifyScreen'
);


/**
 * USAGE EXAMPLE:
 *
 * type-safe NAVIGATE to EditUser screen with required userId props
 * const navigateToEditUser = createNavigate<{userId: string}>('EditUser');
 * -> use: navigateToEditUser({userId: '123'});
 *
 *
 * type-safe NAVIGATION to multiple screens
 * const profileNavigation = createNavigation<{EditUser: {userId: string}, Profile: undefined}>();
 *
 * -> use
 * - navigate to EditUser screen
 * profileNavigation().navigate('EditUser', {userId: '123'});
 * - navigate to Profile screen
 * profileNavigation().navigate('Profile');
 *
 * It's all auto completed. Enjoy!
 */
