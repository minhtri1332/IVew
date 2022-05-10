import React, { memo, useCallback, useMemo } from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import {
  ImageSourcePropType,
  InteractionManager,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import _ from "lodash";
import styled from "styled-components/native";
import { screenShortDimension } from "@/ultils/scale";
import { translate } from "@/languages";
import { Colors } from "@/themes/Colors";

export interface TabBarIconProps {
  icon: ImageSourcePropType;
  isFocused: boolean;
}

const Icon = styled.Image<{ isFocused: boolean }>`
  width: 24px;
  height: 24px;
  tint-color: ${Colors.colorText};
`;

const Label = styled.Text<{ focused: boolean }>`
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 13px;
  text-align: center;
  padding-top: 4px;
  color: ${Colors.colorText};
  opacity: ${(p: { focused: any }) => (p.focused ? 1 : 0.54)};
`;

const ContentContainer = styled.View`
  background-color: ${Colors.backgroundColor};
  border-top-width: 1px;
  border-top-color: ${Colors.grey3};
`;

const PlusVertical = styled.View`
  position: absolute;
  height: 16px;
  width: 1.5px;
  background-color: ${Colors.grey3};
  border-radius: 3px;
`;

const PlusHorizontal = styled.View`
  position: absolute;
  height: 1.5px;
  width: 16px;
  background-color: ${Colors.white};
  border-radius: 3px;
`;

export const TabBarIcon = memo(function TabBarIcon({
  icon,
  isFocused,
}: TabBarIconProps) {
  return <Icon source={icon} isFocused={isFocused} />;
});

const Footer = styled.View`
  height: ${getBottomSpace()}px;
  width: 100%;
`;

const ButtonAdd = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  border-width: 1px;
  align-items: center;
  justify-content: center;
`;

export const CustomTabBar = memo(function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const onShowHide = useMemo(() => _.debounce(() => {}, 300), []);
  return (
    <View>
      <ContentContainer style={styles.containerAbsolute}>
        <View style={styles.contentContainer}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];

            if (index === 2) {
              return (
                <View
                  style={styles.viewIconAdd}
                  key={"tab-" + index.toString()}
                >
                  <ButtonAdd activeOpacity={0.9} onPress={onShowHide}>
                    <PlusVertical />
                    <PlusHorizontal />
                  </ButtonAdd>
                </View>
              );
            }

            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = useCallback(() => {
              InteractionManager.runAfterInteractions(() => {
                const event = navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name, { id: route.name });
                }
              });
            }, [route, isFocused, index]);

            return (
              <TouchableOpacity
                activeOpacity={0.6}
                key={"tab-" + index.toString()}
                accessibilityRole="button"
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                style={styles.bottomBarIcon}
              >
                {options &&
                  options.tabBarIcon &&
                  options.tabBarIcon({
                    focused: isFocused,
                    color: "",
                    size: 0,
                  })}
                <Label numberOfLines={1} focused={isFocused}>
                  {label ? translate(`${label}`, `${label}`) : ""}
                </Label>
              </TouchableOpacity>
            );
          })}
        </View>
        <Footer />
      </ContentContainer>
    </View>
  );
});

const styles = StyleSheet.create({
  containerAbsolute: {
    backgroundColor: Colors.backgroundColor,
    bottom: 0,
    left: 0,
    right: 0,
    height: 56 + getBottomSpace(),
  },
  modalStyle: {
    justifyContent: "flex-end",
    alignItems: "center",
    alignSelf: "center",
    margin: 0,
    marginLeft: 16,
    marginRight: 16,
    width: screenShortDimension - 32,
    maxWidth: 400,
    marginBottom: 80 + getBottomSpace(),
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  viewIconAdd: {
    flex: 1,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomBarIcon: {
    marginTop: 6,
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  plusHorizontal: {
    position: "absolute",
    zIndex: 1,
    width: 3,
    height: 20,
    borderRadius: 2,
  },
  plusVertical: {
    position: "absolute",
    zIndex: 1,
    width: 20,
    height: 3,
    borderRadius: 2,
  },
});
