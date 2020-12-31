import React, {memo, useCallback, useState} from 'react';
import styled from "styled-components/native";
import {Colors} from "@/themes/Colors";
import {InputBorder} from '@/components/InputBorder';
import {HeaderBack} from "@/components/HeaderBack";
import {getBottomSpace} from 'react-native-iphone-x-helper';


const Container = styled.View`
  flex: 1;
  background-color: ${Colors.white};
`;

const ContentContainer = styled.View`
  flex: 1;
  padding: 16px
`;


const Title = styled.Text`
  color: ${Colors.gray1};
  font-size: 16px;
  font-weight: bold;
`;


const BtnLogin = styled.TouchableOpacity`
  position: absolute;
  bottom: ${50 + getBottomSpace()};
  left: 16px;
  width: 100%;
  height: 44px;
  border-radius: 8px;
  background-color: #0077cc;
  margin-top: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const LoginText = styled.Text`
  color: ${Colors.white};
  font-size: 18px;
`;

const SInputBorder = styled(InputBorder).attrs({
    containerStyle: {
        marginTop: 12
    }
})``;

interface ParamsInterface {
    username: string,
    password: string
}

export const ForgotPasswordScreen = memo(function ForgotPasswordScreen() {
    const [params, setParams] = useState<ParamsInterface>({
        username: '',
        password: ''
    });

    const onTextChange = useCallback((keyname: string, value: string) => {
        setParams({
            ...params,
            [keyname]: value
        })
    }, [params]);

    return (
        <Container>
            <HeaderBack title={'Lấy lại mật khẩu'} />
            <ContentContainer>
                <Title>
                    Email:
                </Title>
                <SInputBorder
                    value={params.username}
                    keyName={'username'}
                    onTextChange={onTextChange}
                    placeHolder={'Điền email đăng nhập'}

                />
                <BtnLogin>
                    <LoginText>Lấy lại mật khẩu</LoginText>
                </BtnLogin>
            </ContentContainer>
        </Container>
    )
});
