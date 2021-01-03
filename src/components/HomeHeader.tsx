import React, {memo, ReactElement, useCallback} from 'react';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Colors} from '@/themes/Colors';
import {styled, useNavigation} from '@/global';
import {IC_BACKGROUND_HOME, IC_LOGO} from '@/assets';

interface Props {
  title?: string;
  right?: ReactElement;
}
export const HomeHeader = memo(function HomeHeader(props: Props) {
  return (
    <Container>
      <Left>
        <SLogo source={IC_LOGO} />
        <SText>App Name</SText>
        <STextTitle>Nền tẳng app</STextTitle>
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
  flex: 1;
  height: 100%;
  padding: 32px 32px;
`;

const Right = styled.View`
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-right: 16px;
`;

const SLogo = styled.Image`
  width: 50px;
  height: 50px;
  tint-color: ${Colors.white};
`;

const SImageBackground = styled.Image`
  tint-color: ${Colors.white};
`;
