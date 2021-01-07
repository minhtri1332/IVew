import React, {memo, ReactElement, useCallback} from 'react';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Colors} from '@/themes/Colors';
import {styled, useNavigation} from '@/global';
import {IC_BACKGROUND_HOME, IC_LOGO, IC_LOGO_APP} from '@/assets';

interface Props {
  title?: string;
  right?: ReactElement;
}
export const HomeHeader = memo(function HomeHeader(props: Props) {
  return (
    <Container>
      <Left>
        <SLogo source={IC_LOGO_APP} />
        <SText>IView</SText>
        <STextTitle>Nền tảng Camera AI</STextTitle>
      </Left>
      <Right>
        <SImageBackground source={IC_BACKGROUND_HOME} />
      </Right>
    </Container>
  );
});

const Container = styled.View`
  height: 25%;
  padding-top: ${getStatusBarHeight()}px;
  flex-direction: row;
`;

const SText = styled.Text`
  font-family: Roboto-Medium;
  font-size: 24px;
  margin-top: 16px;
  color: ${Colors.white};
`;

const STextTitle = styled.Text`
  font-size: 14px;
  color: ${Colors.white};
`;

const Left = styled.TouchableOpacity`
  padding: 32px 32px;
`;

const Right = styled.View`
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const SLogo = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 40px;
`;

const SImageBackground = styled.Image`
  tint-color: ${Colors.white};
`;
