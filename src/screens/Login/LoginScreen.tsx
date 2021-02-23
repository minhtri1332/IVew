import React, {memo, useCallback, useEffect, useState} from 'react';
import {styled} from '@/global';
import {Colors} from '@/themes/Colors';
import {
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {InputBorder} from '@/components/InputBorder';
import {BG_LOGIN, IC_LOGO_APP} from '@/assets';
import {
  navigateToForgotPasswordScreen,
  replaceWithMainScreen,
} from '@/utils/navigation';
import {BaseStyles} from '@/themes/BaseStyles';
import {useAsyncFn} from '@/hooks/useAsyncFn';
import {requestLogin} from '@/store/auth/function';
import LocalStorageHelper from '@/services/LocalServiceHelper';
import messaging from '@react-native-firebase/messaging';

const {width: DWidth} = Dimensions.get('window');

const SInputBorder = styled(InputBorder).attrs({
  containerStyle: {
    marginTop: 12,
  },
})``;

export const LoginScreen = memo(function LoginScreen() {
  const [username, setUsername] = useState('thanh191997@gmail.com');
  const [password, setPassword] = useState('meditech1234');

  const onTextChange = useCallback((keyname: string, value: string) => {
    if (keyname == 'username') {
      setUsername(value);
    } else {
      setPassword(value);
    }
  }, []);

  const fillUser = useCallback(async () => {
    const email = await LocalStorageHelper.get('username');
    const pass = await LocalStorageHelper.get('password');

    if (email) {
      onTextChange('username', String(email));
    }

    if (pass) {
      onTextChange('password', String(pass));
    }
  }, []);

  useEffect(() => {
    fillUser().then();
  }, []);

  const [{loading}, startLogin] = useAsyncFn(async () => {
    await requestLogin(username, password);
    await LocalStorageHelper.set('username', username);
    await LocalStorageHelper.set('password', password);
    replaceWithMainScreen();
  }, [username, password]);

  return (
    <Container behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <SImageBackground source={BG_LOGIN} />

      <SViewBox>
        <Top>
          <Logo source={IC_LOGO_APP} />
          <TopTitle>iVIEW</TopTitle>
          <TopSubTitle>{`Nền tẳng camera AI`}</TopSubTitle>
        </Top>
        <Bottom>
          <ContainerInput style={BaseStyles.viewShadow}>
            <SInputBorder
              value={username}
              keyName={'username'}
              onTextChange={onTextChange}
              keyboardType={'email-address'}
              placeHolder={'Nhập vào email'}
            />
            <SInputBorder
              value={password}
              keyName={'password'}
              onTextChange={onTextChange}
              placeHolder={'Nhập mật khẩu của bạn'}
              secureTextEntry={true}
            />
            <ViewSpaceFlexEnd>
              <BtnRow onPress={navigateToForgotPasswordScreen}>
                <TextForgot>Quên mật khẩu?</TextForgot>
              </BtnRow>
            </ViewSpaceFlexEnd>
          </ContainerInput>
          <SViewButton style={BaseStyles.viewShadow}>
            <BtnLogin onPress={startLogin}>
              {loading ? (
                <ActivityIndicator color={'#fff'} />
              ) : (
                <LoginText>Đăng nhập</LoginText>
              )}
            </BtnLogin>
          </SViewButton>
        </Bottom>
      </SViewBox>

      {/*<Footer>*/}
      {/*  <FooterText>Copyright 2020 Tên app. All Rights Reserved</FooterText>*/}
      {/*</Footer>*/}
    </Container>
  );
});

const SImageBackground = styled.Image`
  flex: 1;
  width: 100%;
  position: absolute;
`;
const Container = styled(KeyboardAvoidingView)`
  flex: 1;
  background-color: ${Colors.grey6};
  justify-content: center;
`;
const SViewBox = styled.View`
  flex: 1;
  justify-content: center;
`;
const SViewButton = styled.View`
  position: absolute;
  width: 100%;
  padding: 0px 16px;
  bottom: 0px;
  align-self: center;
  z-index: 100;
`;
const Top = styled.View`
  align-items: center;
  justify-content: flex-end;
`;
const Logo = styled.Image`
  width: 100px;
  height: 100px;
`;
const TopTitle = styled.Text`
  font-size: 25px;
  margin-top: 8px;
  font-weight: bold;
  color: ${Colors.black};
`;
const TopSubTitle = styled.Text`
  padding-top: 12px;
  font-size: 18px;
  color: ${Colors.black};
  line-height: 23px;
  text-align: center;
`;
const Bottom = styled.View`
  margin: 0px 32px;
  padding-bottom: 24px;
`;
const ContainerInput = styled.View`
  width: 100%;
  padding: 16px 16px;
  margin-top: 12px;
  background-color: ${Colors.white};
  border-radius: 8px;
`;
const BtnLogin = styled.TouchableOpacity`
  width: 100%;
  height: 44px;
  border-radius: 8px;
  background-color: ${Colors.cornflowerblue};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const LoginText = styled.Text`
  color: ${Colors.white};
  font-size: 18px;
`;

const ViewSpaceFlexEnd = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 0px 0px 16px 0px;
`;

const TextForgot = styled.Text`
  color: ${Colors.blue1};
  font-size: 14px;
  padding: 10px 0 6px 6px;
`;

const BtnRow = styled.TouchableOpacity`
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
`;
