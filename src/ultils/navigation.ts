import React from "react";
import {
  NavigationContainerRef,
  ParamListBase,
  StackActions,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import RegisterAccountScreen, {
  RegisterAccountProps,
} from "@/screens/LoginScreen/RegisterAccountScreen";
import StrengthStatisticScreen from "@/screens/Home/StrengthScreen/StrengthStatisticScreen";
import PracticeDetailScreen, {
  PracticeDetailProps,
} from "@/screens/Home/PracticeScreen/PracticeDetailScreen";
import { PracticingScreenProps } from "@/screens/Home/PracticeScreen/PracticingScreen";

export const navigationRef = React.createRef<NavigationContainerRef<any>>();

export const navigation = () => navigationRef.current!;

export const createNavigation = <T extends ParamListBase>() => {
  return navigation as unknown as () => NativeStackNavigationProp<T>;
};

export const createReplace =
  <T extends object>(screenName: string) =>
  (params?: T) => {
    return navigation().dispatch(StackActions.replace(screenName, params));
  };

export const createNavigate =
  <T extends object>(screenName: string) =>
  (params?: T) =>
    navigation().navigate(screenName, params);

export const createPush =
  <T extends object>(screenName: string) =>
  (params?: T) =>
    navigation().dispatch(StackActions.push(screenName, params));

export const mainNavigation = createNavigation();

export const goBack = () => navigation().goBack();

export const navigateToHome = createReplace("Main");

export const navigateToQRCodeScanScreen = createNavigate("QRCodeScanScreen");

export const navigateToHitStatisticScreen =
  createNavigate("HitStatisticScreen");

export const navigateToStrengthStatisticScreen = createNavigate(
  "StrengthStatisticScreen"
);
export const navigateToRegisterAccountScreen =
  createNavigate<RegisterAccountProps>("RegisterAccountScreen");

export const navigateToPracticingScreen =
  createNavigate<PracticingScreenProps>("PracticingScreen");

export const navigateToPracticeDetailScreen =
  createNavigate<PracticeDetailProps>("PracticeDetailScreen");
