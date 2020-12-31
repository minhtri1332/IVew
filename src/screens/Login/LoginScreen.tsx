import React, {memo, useCallback, useState} from 'react';
import styled from 'styled-components/native';
import {Colors} from '@/themes/Colors';
import {ActivityIndicator, Dimensions, KeyboardAvoidingView, Platform,} from 'react-native';
import {InputBorder} from '@/components/InputBorder';
import {IMG_LOGO_SMALL} from '@/assets';
import {navigateToForgotPasswordScreen, replaceWithMainScreen,} from '@/utils/navigation';

const {width: DWidth} = Dimensions.get('window');

const Container = styled(KeyboardAvoidingView)`
  flex: 1;
  background-color: ${Colors.white};
`;

const Top = styled.View`
  align-items: center;
  justify-content: flex-end;
  padding-top: 100px;
  flex: 1;
`;

const Logo = styled.View`
  width: 120px;
  height: 120px;
  background-color: darkred;
  border-radius: 60px;
`;

const TopTitle = styled.Text`
  font-size: 25px;
  font-weight: bold;
  color: ${Colors.gray1};
`;

const TopSubTitle = styled.Text`
  padding-top: 20px;
  font-size: 18px;
  color: ${Colors.gray1};
  line-height: 23px;
  text-align: center;
`;

const Bottom = styled.View`
  flex: 2;
  align-items: center;
  justify-content: flex-end;
  background-color: white;
`;

const Title = styled.Text`
  color: ${Colors.gray1};
  font-size: 16px;
  font-weight: bold;
`;
const ContainerInput = styled.View`
  width: 100%;
  padding: 0 16px 30px 16px;
  margin-top: 12px;
`;

const BtnLogin = styled.TouchableOpacity`
  width: 100%;
  height: 44px;
  border-radius: 8px;
  background-color: ${Colors.backgroundColor};
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
  text-align: center;
`;

const ViewSpaceFlexEnd = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-top: 16px;
  padding-bottom: 4px;
`;

const TextForgot = styled.Text`
  color: ${Colors.blue1};
  font-size: 14px;
  padding: 10px 0 6px 6px
`;

const BtnRow = styled.TouchableOpacity`
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
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
        <Container behavior={Platform.OS == "ios" ? "padding" : "height"}>
            <Top>
                <Logo/>
                <TopTitle>
                    Ứng dụng chat
                </TopTitle>
                <TopSubTitle>
                    {`Đây là ứng dụng\ngiups con người something`}
                </TopSubTitle>
            </Top>
            <Bottom>
                <ContainerInput>
                    <SInputBorder
                        value={params.username}
                        keyName={'username'}
                        onTextChange={onTextChange}
                        keyboardType={"email-address"}
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
                            <TextForgot>
                                Quên mật khẩu?
                            </TextForgot>
                        </BtnRow>
                    </ViewSpaceFlexEnd>
                    <BtnLogin onPress={!loading ? replaceWithMainScreen : () => {
                    }}>
                        {loading ? (
                            <ActivityIndicator color={'#fff'}/>
                        ) : (
                            <LoginText>Đăng nhập</LoginText>
                        )}
                    </BtnLogin>
                </ContainerInput>
            </Bottom>
            <Footer>
                <FooterText>Copyright 2020 Tên app. All Rights Reserved</FooterText>
            </Footer>
        </Container>
    );
});
