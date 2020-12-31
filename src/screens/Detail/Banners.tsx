import React, {memo, useMemo} from 'react';
import Animated, {Extrapolate} from 'react-native-reanimated';
import styled from 'styled-components/native';
import {Colors} from '@/themes/Colors';
import {Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useCamera} from '@/store/camera';
import {Core} from '@/global';

const DWidth = Dimensions.get('window').width;

const Bg = styled.View`
  width: 100%;
  background: ${Colors.black};
`;
const BlueBg = styled.View`
  width: 100%;
`;

const SScrollView = styled(Animated.ScrollView).attrs((p) => ({}))`
  width: 100%;
`;

const DotView = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  margin: 0 2px;
  background-color: ${Colors.white};
`;

const BannerView = styled.View`
  width: ${DWidth}px;
  height: ${3/4 * DWidth}px;
  background-color: black;
`;

const BgImage = styled(FastImage)`
  width: ${DWidth}px;
  height: ${3/4 * DWidth}px;
`;

interface Props {
  productId: string;
}

export const Banners = memo(function Banners(props: Props) {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const camera = useCamera(props.productId || '');

  return (
    <Bg>
      <BlueBg>
        <SScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={DWidth}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {x: scrollX}}},
          ])}
          decelerationRate="fast">
          <BannerView>
            <BgImage source={{uri: camera?.avatar || ''}} />
          </BannerView>
        </SScrollView>
      </BlueBg>
    </Bg>
  );
});

interface DotProps {
  index: number;
  scrollX: Animated.Value<number>;
}

export const Dot = memo(function Banners({index, scrollX}: DotProps) {
  const inputRange = [
    (index - 1) * DWidth,
    index * DWidth,
    (index + 1) * DWidth,
  ];

  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.54, 1, 0.54],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <Animated.View style={{opacity}}>
      <DotView />
    </Animated.View>
  );
});
