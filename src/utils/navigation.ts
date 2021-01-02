import React from 'react';
import {
  NavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

import {TransitionPresets} from "@react-navigation/stack";

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
  'HomeScreen'
);

export const navigateToLoginScreen = createNavigate(
  'LoginScreen'
);

export const navigateToForgotPasswordScreen = createNavigate(
  'ForgotPasswordScreen'
);
