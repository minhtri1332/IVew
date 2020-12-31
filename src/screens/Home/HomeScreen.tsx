import React, {memo, useCallback, useEffect} from 'react';
import styled from 'styled-components/native';
import {Colors} from '@/themes/Colors';
import {ActivityIndicator, Dimensions} from 'react-native';
import {navigateToLoginScreen, replaceWithMainScreen} from '@/utils/navigation';
import {useUser} from '@/store/constant';
import SplashScreen from 'react-native-splash-screen';

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.white};
  align-items: center;
  justify-content: center;
`;

const Logo = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 120px;
  background-color: #0077cc;
`;
export const HomeScreen = memo(function HomeScreen() {
  const getData = useCallback( () => {
    setTimeout(() => {
      // replaceWithMainScreen();
      navigateToLoginScreen();
    }, 2000);
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
      <Logo />
      <ActivityIndicator size={'large'} color={Colors.gray3} />
    </Container>
  );
});
