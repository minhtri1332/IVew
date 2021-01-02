import React, {memo, useCallback} from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {ImageSourcePropType, StyleSheet, TouchableOpacity, View,} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {styled} from '@/global';
import {Colors} from "@/themes/Colors";

export interface TabBarIconProps {
    icon: ImageSourcePropType;
    isFocused: boolean;
}


const Icon = styled.Image<{isFocused: boolean}>`
  width: 24px;
  height: 24px;
  tint-color: ${(p) => (p.isFocused ? Colors.backgroundColor : Colors.gray1)};
  margin-top: 2px;
`;

const Label = styled.Text<{focused: boolean}>`
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 13px;
  text-align: center;
  padding-top: 6px;
  color: ${(p) => (p.focused ? Colors.backgroundColor : Colors.gray1)};
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
  background-color: ${Colors.white};
`;

export const CustomTabBar = memo(function CustomTabBar({
                                                           state,
                                                           descriptors,
                                                           navigation,
                                                       }: BottomTabBarProps) {
    return (
        <View>
            <View style={styles.containerAbsolute}>
                <View style={styles.contentContainer}>
                    {state.routes.map((route, index) => {
                        const {options} = descriptors[route.key];

                        const label =
                            options.tabBarLabel !== undefined
                                ? options.tabBarLabel
                                : options.title !== undefined
                                ? options.title
                                : route.name;

                        const isFocused = state.index === index;

                        const onPress = useCallback(() => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });

                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name);
                            }
                        }, [route, isFocused, index]);

                        return (
                            <TouchableOpacity
                                key={'tab-' + index.toString()}
                                accessibilityRole="button"
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                testID={options.tabBarTestID}
                                onPress={onPress}
                                style={styles.bottomBarIcon}>
                                {options &&
                                options.tabBarIcon &&
                                options.tabBarIcon({focused: isFocused, color: '', size: 0})}
                                <Label numberOfLines={1} focused={isFocused}>
                                    {label}
                                </Label>
                            </TouchableOpacity>
                        );
                    })}
                </View>
                <Footer />
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    containerAbsolute: {
        height: 56 + getBottomSpace(),
        backgroundColor: Colors.white,
        borderTopWidth: 1,
        borderTopColor: Colors.grey6
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottomBarIcon: {
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    buttonAdd: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    plusHorizontal: {
        position: 'absolute',
        zIndex: 1,
        width: 3,
        height: 20,
        borderRadius: 2,
    },
    plusVertical: {
        position: 'absolute',
        zIndex: 1,
        width: 20,
        height: 3,
        borderRadius: 2,
    },
});
