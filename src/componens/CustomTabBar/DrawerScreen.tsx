import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Linking, Text } from "react-native";
import React, { memo } from "react";
import { styled } from "@/global";
import { CssImage } from "@/componens/View";
import { IC_EMAIL, IC_USER_Fill } from "@/assets";
import { Colors } from "@/themes/Colors";
import Avatar from "@/componens/View/Avatar";

export const CustomDrawerContent = memo(function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <SViewHeader>
        <Avatar />
        <SText>xcxc</SText>
      </SViewHeader>
      {/*<DrawerItemList {...props} />*/}
      <DrawerItem
        label="Help"
        onPress={() => Linking.openURL("https://mywebsite.com/help")}
      />
    </DrawerContentScrollView>
  );
});

const SText = styled.Text`
  align-self: center;
  font-size: 20px;
  padding-top: 4px;
  font-family: Roboto-Medium;
`;

const SViewHeader = styled.View`
  border-bottom-width: 1px;
  padding: 16px 0;
`;
