import React, { memo } from "react";
import { Image, TouchableOpacity, ViewStyle } from "react-native";
import styled from "styled-components/native";
import { Colors } from "@/themes/Colors";
import { IC_CLOSE } from "@/assets";

const Container = styled.View`
  width: 100%;
`;

const ContentContainer = styled.View`
  width: 100%;
  height: 44px;
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
`;

const SText = styled.Text`
  flex: 1;
  font-size: 17px;
  color: ${Colors.colorText};
  padding-right: 8px;
`;

const SImage = styled.Image`
  height: 18px;
  width: 18px;
  tint-color: ${Colors.white};
  padding-right: 8px;
`;

const SDivider = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${Colors.grey1}1A;
`;

interface OwnProps {
  title: string;
  onClose?: () => void;
  onPressRight?: () => void;
  noDivider?: boolean;
  containerStyle?: ViewStyle;
}

type Props = OwnProps;

export const BottomMenuHeader = memo(
  ({ title, onPressRight, noDivider, containerStyle }: Props) => {
    return (
      <Container>
        <ContentContainer style={containerStyle}>
          <SText numberOfLines={1} ellipsizeMode="tail">
            {title}
          </SText>
          {onPressRight && (
            <TouchableOpacity onPress={onPressRight}>
              <SImage source={IC_CLOSE} />
            </TouchableOpacity>
          )}
        </ContentContainer>
        {!noDivider && <SDivider />}
      </Container>
    );
  }
);
