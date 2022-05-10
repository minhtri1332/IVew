import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import React, { memo } from "react";
import { navigationRef } from "@/ultils/navigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "@/screens/Home";
import PreloadScreen from "@/screens/LoginScreen/PreloadScreen";
import { CustomTabBar, TabBarIcon } from "@/componens/CustomTabBar";
import {
  IC_HOME,
  IC_HOME_ACTIVE,
  IC_PRACTICE,
  IC_PRACTICE_ACTIVE,
} from "@/assets";
import PracticeScreen from "@/screens/Practice/PracticeScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import QRCodeScanScreen from "@/screens/QRCodeScan";
import { CustomDrawerContent } from "@/componens/CustomTabBar/DrawerScreen";
import RegisterAccountScreen from "@/screens/LoginScreen/RegisterAccountScreen";
import HitStatisticScreen from "@/screens/Home/HitScreen/HitStatisticScreen";
import StrengthStatisticScreen from "@/screens/Home/StrengthScreen/StrengthStatisticScreen";
import PracticeDetailScreen from "@/screens/Home/PracticeScreen/PracticeDetailScreen";
import PracticingScreen from "@/screens/Home/PracticeScreen/PracticingScreen";

const RootStack = createNativeStackNavigator();
const TabBarStack = createBottomTabNavigator();
const DrawerStack = createDrawerNavigator();

const TabBarStackComponent = memo(function TabBarStackComponent() {
  return (
    <TabBarStack.Navigator
      initialRouteName={"Home1"}
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
      detachInactiveScreens={false}
    >
      <TabBarStack.Screen
        name="tab_bar.Home"
        component={HomeScreen}
        options={{
          title: "tab_bar.Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              isFocused={focused}
              icon={focused ? IC_HOME_ACTIVE : IC_HOME}
            />
          ),
        }}
      />
      <TabBarStack.Screen
        name="tab_bar.practice"
        component={PracticeScreen}
        options={{
          title: "tab_bar.practice",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              isFocused={focused}
              icon={focused ? IC_PRACTICE_ACTIVE : IC_PRACTICE}
            />
          ),
        }}
      />
    </TabBarStack.Navigator>
  );
});

const DrawerStackComponent = memo(function DrawerStackComponent() {
  return (
    <DrawerStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"TabBar"}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <DrawerStack.Screen name={"TabBar"} component={TabBarStackComponent} />
    </DrawerStack.Navigator>
  );
});

export const Routes = memo(function Routes() {
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar barStyle="dark-content" />
      <>
        <RootStack.Navigator>
          <RootStack.Group screenOptions={{ headerShown: false }}>
            <RootStack.Screen name={"Preload"} component={PreloadScreen} />
          </RootStack.Group>

          <RootStack.Group screenOptions={{ headerShown: false }}>
            <RootStack.Screen name={"Main"} component={DrawerStackComponent} />
            <RootStack.Screen
              name={"QRCodeScanScreen"}
              component={QRCodeScanScreen}
            />

            <RootStack.Screen
              name={"StrengthStatisticScreen"}
              component={StrengthStatisticScreen}
            />
            <RootStack.Screen
              name={"PracticeDetailScreen"}
              component={PracticeDetailScreen}
            />
            <RootStack.Screen
              name={"PracticingScreen"}
              component={PracticingScreen}
            />
            <RootStack.Screen
              name={"HitStatisticScreen"}
              component={HitStatisticScreen}
            />
          </RootStack.Group>

          <RootStack.Group
            screenOptions={{ headerShown: false, presentation: "modal" }}
          >
            <RootStack.Screen
              name={"RegisterAccountScreen"}
              component={RegisterAccountScreen}
            />
          </RootStack.Group>
        </RootStack.Navigator>
      </>
    </NavigationContainer>
  );
});

export default Routes;
