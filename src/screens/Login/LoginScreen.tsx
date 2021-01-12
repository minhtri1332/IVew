import React, {memo, useCallback, useState} from 'react';
import {styled} from '@/global';
import {Colors} from '@/themes/Colors';
import {
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {InputBorder} from '@/components/InputBorder';
import {BG_LOGIN, IC_LOGO_APP, IMG_LOGO_SMALL} from '@/assets';
import {
  navigateToForgotPasswordScreen,
  replaceWithMainScreen,
} from '@/utils/navigation';
import {BaseStyles} from '@/themes/BaseStyles';

const {width: DWidth} = Dimensions.get('window');

const SInputBorder = styled(InputBorder).attrs({
  containerStyle: {
    marginTop: 12,
  },
})``;

interface ParamsInterface {
  username: string;
  password: string;
}

export const LoginScreen = memo(function LoginScreen() {
  const [params, setParams] = useState<ParamsInterface>({
    username: '', //0979294748
    password: '', //12345678
  });
  const loading = false;
  const onTextChange = useCallback(
    (keyname: string, value: string) => {
      setParams({
        ...params,
        [keyname]: value,
      });
    },
    [params],
  );

  return (
    <Container behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <SImageBackground source={BG_LOGIN} />

      <SViewBox>
        <Top>
          <Logo source={IC_LOGO_APP} />
          <TopTitle>Iview</TopTitle>
          <TopSubTitle>{`Nền tẳng camera AI`}</TopSubTitle>
        </Top>
        <Bottom>
          <ContainerInput style={BaseStyles.viewShadow}>
            <SInputBorder
              value={params.username}
              keyName={'username'}
              onTextChange={onTextChange}
              keyboardType={'email-address'}
              placeHolder={'Nhập vào email'}
            />
            <SInputBorder
              value={params.password}
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

            <SViewButton>
              <BtnLogin onPress={!loading ? replaceWithMainScreen : () => {}}>
                {loading ? (
                  <ActivityIndicator color={'#fff'} />
                ) : (
                  <LoginText>Đăng nhập</LoginText>
                )}
              </BtnLogin>
            </SViewButton>
          </ContainerInput>
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
  bottom: -20px;
  align-self: center;
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
