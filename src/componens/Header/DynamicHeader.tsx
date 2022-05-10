import React, { memo, ReactElement, useCallback, useEffect } from "react";
import { styled, useNavigation } from "@/global";
import {
  Platform,
  StatusBar,
  TouchableOpacityProps,
  View,
  ViewProps,
} from "react-native";
import { getStatusBarHeight, isIphoneX } from "react-native-iphone-x-helper";
import { useTheme } from "styled-components/native";
import { Colors } from "@/themes/Colors";
import { IC_BACK, IC_CLOSE, IC_MENU, IC_QR_CODE } from "@/assets";
import { LineSeparator } from "@/common/LineSeperator";
import { navigateToQRCodeScanScreen } from "@/ultils/navigation";

const Wrapper = styled.View`
  background-color: ${Colors.backgroundHeader};
`;

const WrapperHeaderModal = styled.View`
  background-color: ${Colors.backgroundHeader};
`;

const LeftActions = styled.View`
  margin-left: 8px;
`;
const RightActions = styled.View`
  margin-right: 8px;
`;

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  height: 48px;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: ${Colors.colorText};
  line-height: 22px;
  flex: 1;
  padding: 0 16px;
  text-align: center;
`;

const LeftTitle = styled(Title)`
  text-align: left;
  color: ${Colors.white};
`;

const IconBack = styled.Image`
  tint-color: ${Colors.white};
`;

const SIconRight = styled.Image`
  tint-color: ${Colors.white};
  height: 26px;
  width: 26px;
`;

export const HeaderIconWrapper = styled.TouchableOpacity`
  min-width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const RightHeaderIconWrapper = styled(HeaderIconWrapper)`
  padding-right: 8px;
`;

const _HeaderActionText = styled.Text`
  font-size: 16px;
  color: ${Colors.grey6};
`;

const IconClose = styled.Image`
  tint-color: ${Colors.white};
`;

export const HeaderActionText = memo(function HeaderActionText({
  text,
  ...props
}: { text: string } & TouchableOpacityProps) {
  return (
    <RightHeaderIconWrapper {...props}>
      <_HeaderActionText>{text}</_HeaderActionText>
    </RightHeaderIconWrapper>
  );
});

// @ts-ignore
interface DynamicHeaderProps extends ViewProps {
  title: string;
  hideSeparator?: boolean;
  children?: ReactElement | ReactElement[] | null;
  hideGoBack?: boolean;
  onGoBack?: () => void;
  toggleDrawer?: () => void;
}

export const EmptyHeader = memo(function EmptyHeader({
  children,
  hideSeparator,
  hideGoBack,
  onGoBack,
  ...props
}: Omit<DynamicHeaderProps, "title">) {
  const { canGoBack, goBack } = useNavigation();

  useEffect(() => {
    const entry = StatusBar.pushStackEntry({
      barStyle: "light-content",
    });

    return () => {
      StatusBar.popStackEntry(entry);
    };
  }, []);

  const onClose = useCallback(() => {
    onGoBack && onGoBack();
    goBack();
  }, [onGoBack]);

  return (
    <Wrapper {...props}>
      <StatusBarView />
      <Container>
        {!hideGoBack && (
          <LeftActions>
            {canGoBack() ? (
              hideGoBack ? (
                <HeaderIconWrapper />
              ) : (
                <HeaderIconWrapper onPress={onClose}>
                  <IconBack source={IC_BACK} />
                </HeaderIconWrapper>
              )
            ) : null}
          </LeftActions>
        )}
        {children}
      </Container>
      {!hideSeparator ? <LineSeparator /> : null}
    </Wrapper>
  );
});

export const HeaderHome = memo(function HeaderHome({
  children,
  title,
  toggleDrawer,
  ...props
}: DynamicHeaderProps) {
  useEffect(() => {
    const entry = StatusBar.pushStackEntry({
      barStyle: "light-content",
    });
    return () => {
      StatusBar.popStackEntry(entry);
    };
  }, []);

  const gotoScan = useCallback(() => {
    navigateToQRCodeScanScreen();
  }, []);

  return (
    <Wrapper {...props}>
      <StatusBarView />
      <Container>
        <LeftActions>
          <HeaderIconWrapper onPress={toggleDrawer}>
            <IconBack source={IC_MENU} />
          </HeaderIconWrapper>
        </LeftActions>
        <Title numberOfLines={1}>{title}</Title>
        <RightActions>
          <HeaderIconWrapper onPress={gotoScan}>
            <SIconRight source={IC_QR_CODE} />
          </HeaderIconWrapper>
        </RightActions>
      </Container>
      <LineSeparator />
    </Wrapper>
  );
});

export const DynamicHeader = memo(function DynamicHeader({
  title,
  children,
  onGoBack,
  ...props
}: DynamicHeaderProps) {
  const { canGoBack } = useNavigation();
  return (
    <EmptyHeader onGoBack={onGoBack} {...props}>
      <Title numberOfLines={1}>{title}</Title>
      <RightActions>
        {!children && canGoBack() ? <HeaderIconWrapper /> : null}
        {children}
      </RightActions>
    </EmptyHeader>
  );
});

const StatusBarViewIosTransparent = styled.View<{ isSafe?: boolean }>`
  height: ${isIphoneX() ? getStatusBarHeight(true) : 20}px;
  background-color: ${Colors.backgroundHeader};
`;

const StatusBarViewAndroidTransparent = memo(() => {
  return (
    <StatusBar
      barStyle={"light-content"}
      backgroundColor={Colors.backgroundHeader}
    />
  );
});

export const StatusBarViewIos = styled.View<{ isSafe?: boolean }>`
  height: ${isIphoneX() ? getStatusBarHeight(true) : 20}px;
  background-color: ${Colors.backgroundColor};
`;

const StatusBarViewAndroid = memo(() => {
  return (
    <StatusBar
      barStyle={"dark-content"}
      backgroundColor={Colors.backgroundColor}
    />
  );
});

export const StatusBarView = Platform.select({
  ios: StatusBarViewIos as unknown as typeof View,
  default: StatusBarViewAndroid as unknown as typeof View,
});

export const StatusBarViewTransparent = Platform.select({
  ios: StatusBarViewIosTransparent as unknown as typeof View,
  default: StatusBarViewAndroidTransparent as unknown as typeof View,
});

export const LeftModalHeader = memo(function LeftModalHeader({
  title,
  hideSeparator,
  ...props
}: DynamicHeaderProps) {
  const { canGoBack, goBack } = useNavigation();
  const theme = useTheme();

  return (
    <WrapperHeaderModal {...props}>
      <Container>
        <LeftTitle numberOfLines={1}>{title}</LeftTitle>
        <RightActions>
          {canGoBack() ? (
            <HeaderIconWrapper onPress={goBack}>
              <IconClose source={IC_CLOSE} />
            </HeaderIconWrapper>
          ) : (
            <HeaderIconWrapper />
          )}
        </RightActions>
      </Container>
    </WrapperHeaderModal>
  );
});
