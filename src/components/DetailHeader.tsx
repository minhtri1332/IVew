import React, {memo} from 'react';
import styled from "styled-components/native";
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Colors} from "@/themes/Colors";
import {IC_BACK} from "@/assets";
import {Dimensions} from "react-native";
import {goBack} from "@/utils/navigation";

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: ${Dimensions.get("window").width}px;
  height: ${getStatusBarHeight() + 56}px;
  z-index: 1;
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

const Icon = styled.Image`
  width: 24px;
  height: 24px;
  tint-color: ${Colors.white};
`;
export const DetailHeader = memo(function HomeHeader() {
    return (
        <Container>
            <Left onPress={goBack}>
                <Icon source={IC_BACK} />
            </Left>
        </Container>
    )
});
