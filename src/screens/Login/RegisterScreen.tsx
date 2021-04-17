import React, {memo, useCallback, useState} from 'react';
import {styled} from '@/global';
import {Colors} from '@/themes/Colors';
import {Dimensions, KeyboardAvoidingView} from 'react-native';
import {InputBorder} from '@/components/InputBorder';
import {IC_BACK, IC_LOGO_APP, IMG_LOGO_SMALL} from '@/assets';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {goBack} from '@/utils/navigation';

const {width: DWidth} = Dimensions.get('window');

const Container = styled(KeyboardAvoidingView)`
  flex: 1;
  background-color: ${Colors.white};
`;

const Top = styled.View`
  height: 140px;
  padding-top: ${getStatusBarHeight()}px;
  align-items: center;
  justify-content: flex-end;
`;

const Logo = styled.Image`
  width: 100px;
  height: 100px;
  background-color: #0077cc;
  border-radius: 50px;
`;

const Bottom = styled.View`
  flex: 2;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  color: ${Colors.gray1};
  font-size: 16px;
  font-weight: bold;
`;
const ContainerInput = styled.View`
  width: 100%;
  padding: 0 16px;
  margin-top: 12px;
`;

const BtnLogin = styled.TouchableOpacity`
  width: 100%;
  height: 56px;
  border-radius: 8px;
  background-color: #cc4c5b;
  margin-top: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const LoginText = styled.Text`
  color: ${Colors.white};
  font-size: 18px;
`;

const Footer = styled.View`
  width: 100%;
  padding-bottom: 12px;
  align-items: center;
  justify-content: center;
`;

const FooterText = styled.Text`
  font-size: 14px;
  color: ${Colors.black};
`;

const ViewSpaceBetween = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding-top: 16px;
  padding-bottom: 4px;
`;

const TextForgot = styled.Text`
  color: ${Colors.gray2};
  font-size: 14px;
  padding-left: 6px;
`;

const BtnRow = styled.TouchableOpacity`
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
`;
const IconSmall = styled.Image`
  tint-color: ${Colors.gray1};
  width: 18px;
  height: 18px;
`;

const BtnBack = styled.TouchableOpacity`
  position: absolute;
  top: ${getStatusBarHeight()}px;
  left: 20px;
  height: 44px;
  width: 40px;
  flex-direction: row;
  align-items: center;
  z-index: 1;
`;

const IconBack = styled.Image`
  width: 24px;
  height: 24px;
  tint-color: ${Colors.gray1};
`;
const SInputBorder = styled(InputBorder).attrs({
  containerStyle: {
    marginTop: 12,
  },
})``;

interface ParamsInterface {
  username: string;
  password: string;
}

export const RegisterScreen = memo(function RegisterScreen() {
  const [params, setParams] = useState<ParamsInterface>({
    username: '',
    password: '',
  });

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
    <Container>
      <BtnBack onPress={goBack}>
        <IconBack source={IC_BACK} />
      </BtnBack>
      <Top>
        <Logo source={IC_LOGO_APP} />
      </Top>
      <Bottom>
        <Title>Đăng ký tài khoản CXVIEW</Title>
        <ContainerInput>
          <SInputBorder
            value={params.username}
            keyName={'username'}
            onTextChange={onTextChange}
            placeHolder={'Nhập vào username hoặc số điện thoại'}
          />

          <SInputBorder
            value={params.username}
            keyName={'name'}
            onTextChange={onTextChange}
            placeHolder={'Nhập vào họ và tên'}
          />
          <SInputBorder
            value={params.password}
            keyName={'password'}
            onTextChange={onTextChange}
            placeHolder={'Nhập mật khẩu của bạn'}
            secureTextEntry={true}
          />
          <SInputBorder
            value={params.password}
            keyName={'re_password'}
            onTextChange={onTextChange}
            placeHolder={'Nhập lại mật khẩu'}
            secureTextEntry={true}
          />

          <BtnLogin>
            <LoginText>Đăng ký</LoginText>
          </BtnLogin>
        </ContainerInput>
      </Bottom>
      <Footer>
        <FooterText>Copyright 2020 Motorshop. All Rights Reserved</FooterText>
      </Footer>
    </Container>
  );
});
