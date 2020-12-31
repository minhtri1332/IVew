import React, {memo, useRef} from 'react';
import styled from 'styled-components/native';
import {Colors} from '@/themes/Colors';
import {Animated} from 'react-native';
import {useCamera} from '@/store/camera';
import {useNavigationParams} from '@/hooks/useNavigationParams';
import {DetailHeader} from '@/components/DetailHeader';
import {Banners} from '@/screens/Detail/Banners';
import {Item, ItemContent, OnOffItem} from "@/components";

const Container = styled(Animated.ScrollView)`
  flex: 1;
  background-color: ${Colors.white};
`;

const WrapContainer = styled.View`
  flex: 1;
  background-color: ${Colors.white};
`;

const ContentContainer = styled.View`
  width: 100%;
  padding: 0 16px 16px 16px;
  background-color: ${Colors.white};
`;

const Title = styled.Text`
  font-size: 20px;
  color: ${Colors.gray1};
  font-weight: bold;
  padding-top: 12px;
`;

const SubTitle = styled.Text`
  font-size: 16px;
  color: ${Colors.gray1};
  padding-top: 4px;
`;

export interface DetailScreenProps {
  id: string;
}

export const DetailScreen = memo(function HomeScreen() {
  const {id} = useNavigationParams<DetailScreenProps>();
  const newScrollY = useRef(new Animated.Value(0)).current;

  const scale: any = newScrollY.interpolate({
    inputRange: [-300, 0],
    outputRange: [4, 1],
    extrapolateRight: 'clamp',
  });

  return (
    <>
      <DetailHeader />
      <Container
          showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: newScrollY}}}],
          {useNativeDriver: true},
        )}>
        <Animated.View style={{transform: [{scale}]}}>
          <Banners productId={id} />
        </Animated.View>
        {/*<BgImage resizeMode={'cover'} source={{uri: Core.baseUrl + product?.imageFeature || ''}}/>*/}
        <WrapContainer>
          <ContentContainer>
            <Title>Camera số 02</Title>

          </ContentContainer>
          <Item label={'ID của khách hàng'} divider={true}>
            <ItemContent>{10}</ItemContent>
          </Item>
          <Item label={'Vị trí lắp đặt'} divider={true}>
            <ItemContent>{'Hành lang'}</ItemContent>
          </Item>
          <Item label={'Ngưỡng đưa ra cảnh báo hành động ngã'} divider={true}>
            <ItemContent>{95}</ItemContent>
          </Item>
          <Item label={'Ngưỡng đưa ra cảnh báo hành động đánh nhau'} divider={true}>
            <ItemContent>{95}</ItemContent>
          </Item>
          <Item label={'Ngưỡng đưa ra cảnh báo hành động say xỉn'} divider={true}>
            <ItemContent>{95}</ItemContent>
          </Item>
          <Item label={'Giá trị về độ nhạy của hành động ngã'} divider={true}>
            <ItemContent>{7}</ItemContent>
          </Item>
          <Item label={'Giá trị về độ nhạy của hành động đánh nhau'} divider={true}>
            <ItemContent>{4}</ItemContent>
          </Item>
          <Item label={'Giá trị về độ nhạy của hành động say xỉn'} divider={true}>
            <ItemContent>{4}</ItemContent>
          </Item>
          <Item label={'Tính năng cảnh báo khi lảng vảng tại chỗ'} divider={true}>
            <OnOffItem active={true} />
          </Item>

          <Item label={'Ngưỡng thời gian đưa ra cảnh báo khi có người lảng vảng tại chỗ'} divider={true}>
            <ItemContent>{60}</ItemContent>
          </Item>
        </WrapContainer>
      </Container>
    </>
  );
});
