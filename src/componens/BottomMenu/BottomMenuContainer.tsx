import React, { memo, PropsWithChildren } from "react";
import { styled } from "@/global";
import { StyleSheet, ViewStyle } from "react-native";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import { Colors } from "@/themes/Colors";
import { screenLongDimension, screenShortDimension } from "@/ultils/scale";

interface OwnProps {
  containerStyle?: ViewStyle;
  fullScreen?: boolean;
}

type Props = OwnProps;

const Container = styled.View`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-color: #211919;
  border-top-width: 1px;
  width: 100%;
  overflow: hidden;
  padding-bottom: ${15 + getBottomSpace() / 2}px;
`;

// const ContainerAnimated = Animated.createAnimatedComponent(Container);

export const BottomMenuContainer = memo(
  ({ children, containerStyle, fullScreen }: PropsWithChildren<Props>) => {
    return (
      <Container
        style={[
          styles.portrait,
          fullScreen ? styles.fullScreen : {},
          containerStyle,
        ]}
      >
        {children}
      </Container>
    );
  }
);

const styles = StyleSheet.create({
  portrait: {
    width: "100%",
    maxHeight: screenLongDimension - getStatusBarHeight(true) - 44,
    backgroundColor: Colors.colorBgTitle,
  },
  landscape: {
    width: "100%",
    maxHeight: screenShortDimension,
  },
  fullScreen: {
    width: "100%",
    height: "100%",
    maxHeight: "100%",
  },
});
