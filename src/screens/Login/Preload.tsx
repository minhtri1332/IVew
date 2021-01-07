import React, {memo, useCallback, useEffect} from 'react';
import {styled} from '@/global';
import {Colors} from '@/themes/Colors';
import {ActivityIndicator} from 'react-native';
import {navigateToLoginScreen} from '@/utils/navigation';
import {useUser} from '@/store/constant';
import SplashScreen from 'react-native-splash-screen';
import {IC_LOGO_APP} from '@/assets';

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.white};
  align-items: center;
  justify-content: center;
`;

const Logo = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 120px;
  background-color: #0077cc;
`;
export const PreloadScreen = memo(function PreloadScreen() {
  const getData = useCallback( () => {
    setTimeout(() => {

      navigateToLoginScreen();
    }, 500);
  }, []);

  const user = useUser();

  useEffect(() => {
    SplashScreen.hide();
  }, [user]);

  useEffect(() => {
    getData()
  }, []);
  return (
    <Container>
      <Logo source = {IC_LOGO_APP} />
      <ActivityIndicator size={'large'} color={Colors.gray3} />
    </Container>
  );
});
