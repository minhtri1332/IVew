import React, {memo, useCallback} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {NavigationContainer} from '@react-navigation/native';
import {defaultScreenOptions, navigationRef} from '@/utils/navigation';
import {LoginScreen} from '@/screens/Login/LoginScreen';
import {ForgotPasswordScreen} from '@/screens/Login/ForgotPasswordScreen';
import {RegisterScreen} from '@/screens/Login/RegisterScreen';
import {HomeScreen} from '@/screens/Home/HomeScreen';
import {PreloadScreen} from '@/screens/Login/Preload';
import {HistoryScreen} from '@/screens/checkin/HistoryScreen';
import {HistoryDetail} from '@/screens/checkin/Screens/HistoryDetail';
import MServiceScreen from '@/screens/MService';
import MScanScreen from '@/screens/MScan';
import HeadMapScreen from '@/screens/Headmap';
import ModalCreateCustomer from '@/screens/MService/Modal/ModalCreateCustomer';
import CameraScreen from '@/screens/FaceDetect';
import {FaceDetectScreen} from '@/screens/FaceDetect/FaceDetect';
import {ProfileScreen} from '@/screens/Home/ProfileScreen';
import ComingSoon from '@/screens/ComingSoon';

const RootStack = createStackNavigator();
const ModalStack = createStackNavigator();
const DrawerStack = createDrawerNavigator();
const MainStack = createStackNavigator();

const MainStackComponent = memo(function MainStackComponent() {
  return (
    <MainStack.Navigator
      initialRouteName={'PreloadScreen'}
      headerMode={'none'}
      screenOptions={defaultScreenOptions}>
      <MainStack.Screen name={'PreloadScreen'} component={PreloadScreen} />
      <MainStack.Screen name={'HomeScreen'} component={HomeScreen} />
      <MainStack.Screen name={'LoginScreen'} component={LoginScreen} />
      <MainStack.Screen
        name={'ForgotPasswordScreen'}
        component={ForgotPasswordScreen}
      />
      <MainStack.Screen name={'RegisterScreen'} component={RegisterScreen} />
      <MainStack.Screen name={'HistoryScreen'} component={HistoryScreen} />
      <MainStack.Screen name={'HistoryDetail'} component={HistoryDetail} />
      <MainStack.Screen name={'MServiceScreen'} component={MServiceScreen} />
      <MainStack.Screen name={'HeadMapScreen'} component={HeadMapScreen} />
      <MainStack.Screen name={'MScanScreen'} component={MScanScreen} />
      <MainStack.Screen name={'CameraScreen'} component={CameraScreen} />
      <MainStack.Screen
        name={'FaceDetectScreen'}
        component={FaceDetectScreen}
      />
      <MainStack.Screen name={'ProfileScreen'} component={ProfileScreen} />
      <MainStack.Screen name={'ComingSoon'} component={ComingSoon} />
    </MainStack.Navigator>
  );
});

const DrawerStackComponent = memo(function DrawerStackComponent() {
  return (
    <DrawerStack.Navigator
      screenOptions={{
        swipeEnabled: false,
      }}
      drawerContent={(props) => <ComingSoon {...props} />}
      initialRouteName={'Main'}>
      <DrawerStack.Screen name={'Main'} component={MainStackComponent} />
    </DrawerStack.Navigator>
  );
});

export const ModalStackComponent = memo(function ModalStackComponent() {
  return (
    <ModalStack.Navigator
      initialRouteName={'PreloadScreen'}
      headerMode={'none'}
      mode={'modal'}>
      <ModalStack.Screen name={'Main'} component={DrawerStackComponent} />
      <ModalStack.Screen
        name={'ModalCreateCustomer'}
        component={ModalCreateCustomer}
      />
    </ModalStack.Navigator>
  );
});

export const Routes = memo(function Routes() {
  const routeNameRef = React.useRef<string>('');
  const onStateChange = useCallback(() => {
    const previousRouteName = routeNameRef.current;
    // @ts-ignore
    const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

    if (currentRouteName && previousRouteName !== currentRouteName) {
      // analytics().setCurrentScreen(currentRouteName);
      routeNameRef.current = currentRouteName;
    }
  }, []);

  return (
    <NavigationContainer ref={navigationRef} onStateChange={onStateChange}>
      <RootStack.Navigator initialRouteName={'Root'} headerMode={'none'}>
        <RootStack.Screen name={'Root'} component={ModalStackComponent} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
});

export default Routes;
