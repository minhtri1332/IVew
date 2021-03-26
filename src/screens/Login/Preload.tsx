import React, {memo, useCallback, useEffect} from 'react';
import {styled} from '@/global';
import {Colors} from '@/themes/Colors';
import * as Animatable from 'react-native-animatable';
import {navigateToLoginScreen} from '@/utils/navigation';
import SplashScreen from 'react-native-splash-screen';
import {IC_LOGO_APP} from '@/assets';
import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
const Container = styled.View`
  flex: 1;
  background-color: ${Colors.white};
  align-items: center;
  justify-content: center;
`;

const Logo = styled(Animatable.Image)`
  width: 80px;
  height: 80px;
  border-radius: 120px;
  background-color: ${Colors.grey5};
`;
export const PreloadScreen = memo(function PreloadScreen() {
  const getData = useCallback(() => {
    setTimeout(() => {
      navigateToLoginScreen();
      // navigateToFaceDetectScreen();
    }, 500);
  }, []);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    getData();
  }, []);
  return (
    <Container>
      <Logo
        animation={{
          from: {translateY: height / 4 - 150},
          to: {translateY: 500 - height},
        }}
        duration={450}
        easing={(t: any) => Math.pow(t, 1.7)}
        source={IC_LOGO_APP}
        useNativeDriver
      />
    </Container>
  );
});
