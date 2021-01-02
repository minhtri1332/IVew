import React, {memo, ReactElement, useCallback} from 'react';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Colors} from '@/themes/Colors';
import {styled, useNavigation} from '@/global';
import {IC_BACKGROUND_HOME} from '@/assets';


interface Props {
    title?: string,
    right?: ReactElement
}
export const HomeHeader = memo(function HomeHeader(props: Props) {
    return (
        <Container>
          <Left>
            <SLogo source={IC} />
          </Left>
          <Right>
            <SImageBackground source = {IC_BACKGROUND_HOME} />
          </Right>

        </Container>
    )
});

const Container = styled.View`
  height: 25%;
 background-color: ${Colors.blue1};
  padding-top: ${getStatusBarHeight()}px;
  flex-direction: row;
`;

const Left = styled.TouchableOpacity`
flex:1;
  height: 100%;
  flex-direction: row;
  align-items: center;
  padding-left: 16px;
`;

const Right = styled.View`
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-right: 16px;
`;

const SLogo = styled.Image`
  tint-color: ${Colors.white};
`;

const SImageBackground = styled.Image`
  tint-color: ${Colors.white};
`;
