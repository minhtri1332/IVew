import React, {memo, ReactElement, useCallback} from 'react';
import styled from "styled-components/native";
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Colors} from "@/themes/Colors";
import {IC_BELL_FILL, IC_MENU, IC_NOTIFICATION, IC_PLUS} from "@/assets";
import {useNavigation} from "@/global";
import {TouchableOpacity} from "react-native";
import {openAddCameraScreen, openNotifyScreen} from "@/utils/navigation";

const Container = styled.View`
  height: ${getStatusBarHeight() + 56}px;
  background-color: ${Colors.backgroundColor};
  padding-top: ${getStatusBarHeight()}px;
  flex-direction: row;
`;

const Left = styled.TouchableOpacity`
  width: 60px;
  height: 100%;
  flex-direction: row;
  align-items: center;
  padding-left: 16px;
`;

const Center = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Right = styled.View`
  width: 60px;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-right: 16px;
`;

const Icon = styled.Image`
  width: 24px;
  height: 24px;
  tint-color: ${Colors.white};
`;
const IconBell = styled.Image`
  width: 20px;
  height: 20px;
  tint-color: ${Colors.white};
`;
const BannerText = styled.Text`
  font-size: 18px;
  color: ${Colors.white};
`;

const BtnAdd = styled.TouchableOpacity`
  padding-left: 8px;
`;

interface Props {
    title?: string,
    right?: ReactElement
}
export const HomeHeader = memo(function HomeHeader(props: Props) {
    const {title, right} = props;
    const navigation = useNavigation();
    const openMenu = useCallback(() => {
        // @ts-ignore
        navigation.openDrawer();
    }, []);
    return (
        <Container>
            <Left onPress={openMenu}>
                <Icon source={IC_MENU} />
            </Left>
            <Center>
                <BannerText>
                    {title || 'Tên ứng dụng'}
                </BannerText>
            </Center>
            <Right>
                <TouchableOpacity onPress={openNotifyScreen}>
                    <IconBell source={IC_BELL_FILL} />
                </TouchableOpacity>
                <BtnAdd onPress={openAddCameraScreen}>
                    <Icon source={IC_PLUS} />
                </BtnAdd>
            </Right>
        </Container>
    )
});
