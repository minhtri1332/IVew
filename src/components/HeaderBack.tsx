import React, {memo, ReactElement} from 'react';
import {styled} from '@/global';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Colors} from '@/themes/Colors';
import {IC_BACK} from '@/assets';
import {goBack} from '@/utils/navigation';

const Container = styled.View`
  height: ${getStatusBarHeight() + 56}px;
  background-color: ${Colors.backgroundHeader};
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

const Title = styled.Text`
  font-size: 16px;
  color: white;
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
  width: 28px;
  height: 28px;
  tint-color: ${Colors.white};
`;
const BannerText = styled.Text`
  font-size: 20px;
  color: ${Colors.white};
`;
interface Props {
  title: string;
  right?: ReactElement;
}
export const HeaderBack = memo(function HomeHeader(props: Props) {
  const {title, right} = props;
  return (
    <Container>
      <Left onPress={goBack}>
        <Icon source={IC_BACK} />
      </Left>
      <Center>
        <BannerText>{title}</BannerText>
      </Center>
      <Right>{right ? right : null}</Right>
    </Container>
  );
});
