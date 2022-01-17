import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {styled} from '@/global';
import {Colors} from '@/themes/Colors';
import {
  ActivityIndicator,
  Image,
  InteractionManager,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import {InputBorder} from '@/components/ViewBorder/InputBorder';
import {
  BG_LOGIN,
  IC_CLOSE,
  IC_COMING_SOON,
  IC_EYE_CLOSE,
  IC_EYE_OPEN,
  IC_LOGO,
  IC_LOGO_APP,
} from '@/assets';
import {
  navigateToForgotPasswordScreen,
  replaceWithMainScreen,
} from '@/utils/navigation';
import {BaseStyles} from '@/themes/BaseStyles';
import {useAsyncFn} from '@/hooks/useAsyncFn';
import {requestLogin} from '@/store/auth/function';
import LocalStorageHelper from '@/services/LocalServiceHelper';
import DeviceInfo from 'react-native-device-info';
import LocaleServiceUrl, {urlProduct} from '@/store/types';
import ToastService from '@/services/ToastService';

const SInputBorder = styled(InputBorder).attrs({
  containerStyle: {
    marginTop: 12,
  },
})``;

export const LoginScreen = memo(function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const buildVersion = DeviceInfo.getVersion();
  const [url, setUrl] = useState(LocaleServiceUrl.getUrl());
  const [username, setUsername] = useState('scid_demo@cxview.ai');
  const [password, setPassword] = useState('meditech1234');

  const onTextChange = useCallback((keyname: string, value: string) => {
    if (keyname == 'username') {
      setUsername(value);
    } else {
      setPassword(value);
    }
  }, []);

  const rightComponent = useMemo(() => {
    return (
      <TouchableOpacity
        style={{
          alignSelf: 'center',
          padding: 16,
        }}
        onPress={() => setShowPassword(!showPassword)}>
        <Image source={!showPassword ? IC_EYE_CLOSE : IC_EYE_OPEN} />
      </TouchableOpacity>
    );
  }, [showPassword]);

  const fillUser = useCallback(async () => {
    const email = await LocalStorageHelper.get('username');
    const pass = await LocalStorageHelper.get('password');

    if (email) {
      onTextChange('username', String(email));
    }

    if (pass) {
      onTextChange('password', String(pass));
      startLogin().then();
    }
  }, []);

  useEffect(() => {
    fillUser().then();
  }, []);

  const [{loading}, startLogin] = useAsyncFn(async () => {
    InteractionManager.runAfterInteractions(() => {
      Keyboard.dismiss();
    });

    const response = await requestLogin(username, password);

    if (response) {
      await LocalStorageHelper.set('username', username);
      await LocalStorageHelper.set('password', password);
      replaceWithMainScreen();
    }
  }, [username, password]);

  return (
    <Container behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <SImageBackground source={BG_LOGIN} />

      <SViewBox>
        <Top>
          <Logo source={IC_LOGO_APP} />
          <TopTitle>CXVIEW</TopTitle>
          <TopSubTitle>{`Nền tảng camera AI`}</TopSubTitle>
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
              secureTextEntry={!showPassword}
              rightComponent={rightComponent}
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

      {/*<SButton*/}
      {/*  onPress={() => {*/}
      {/*    LocaleServiceUrl.change();*/}
      {/*    setUrl(LocaleServiceUrl.getUrl());*/}
      {/*  }}>*/}
      {/*<STextVersion>*/}
      {/*  Reset{url == urlProduct ? ': Test' : ' :Product'}*/}
      {/*</STextVersion>*/}
      <STextVersion>Phiên bản {buildVersion}</STextVersion>
      {/*</SButton>*/}
    </Container>
  );
});

const STextVersion = styled.Text``;
const SButton = styled.TouchableOpacity`
  padding-left: 8px;
  padding-bottom: 4px;
`;
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
