import React, {memo, useCallback} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {NavigationContainer} from '@react-navigation/native';
import {defaultScreenOptions, navigationRef} from '@/utils/navigation';
import {LoginScreen} from '@/screens/Login/LoginScreen';
import {ForgotPasswordScreen} from '@/screens/Login/ForgotPasswordScreen';
import {RegisterScreen} from '@/screens/Login/RegisterScreen';
import {DrawerContent} from "@/screens/DrawerContent";
import {HomeScreen} from "@/screens/Home/HomeScreen";
import {PreloadScreen} from '@/screens/Login/Preload';

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
            <DrawerStack.Screen name={'PreloadScreen'} component={PreloadScreen}/>
            <DrawerStack.Screen name={'ForgotPasswordScreen'} component={ForgotPasswordScreen}/>
            <DrawerStack.Screen name={'RegisterScreen'} component={RegisterScreen}/>

        </MainStack.Navigator>
    );
});


const DrawerStackComponent = memo(function DrawerStackComponent() {
    return (
        <DrawerStack.Navigator
            screenOptions={{
                swipeEnabled: false,
            }}
            drawerContent={(props) => <DrawerContent {...props} />}
            initialRouteName={'Main'}>
            <DrawerStack.Screen name={'Main'} component={MainStackComponent}/>
        </DrawerStack.Navigator>
    );
});

export const ModalStackComponent = memo(function ModalStackComponent() {
    return (
        <ModalStack.Navigator
            initialRouteName={'PreloadScreen'}
            headerMode={'none'}
            mode={'modal'}>
            <ModalStack.Screen name={'Main'} component={DrawerStackComponent}/>
            <RootStack.Screen name={'HomeScreen'} component={HomeScreen}/>
            <RootStack.Screen name={'LoginScreen'} component={LoginScreen}/>
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
                <RootStack.Screen name={'Root'} component={ModalStackComponent}/>
            </RootStack.Navigator>
        </NavigationContainer>
    );
});

export default Routes;
