import React, { memo, useCallback, useState } from "react";
import {
  DynamicHeader,
  LeftModalHeader,
} from "@/componens/Header/DynamicHeader";
import { ScreenWrapper } from "@/common/CommonStyles";
import { InputBorder } from "@/componens/ViewBorder/InputBorder";
import { styled, useAsyncFn } from "@/global";
import SubmitButtonColor from "@/componens/Button/ButtonSubmit";
import { requestRegister } from "@/store/auth/function";
import { goBack } from "@/ultils/navigation";
import { useNavigationParams } from "@/hooks/useNavigationParams";
import { Colors } from "@/themes/Colors";
import { IMG_LOGIN_THEME } from "@/assets";
import { Keyboard, KeyboardAvoidingView, Platform } from "react-native";

export interface ParamCreateAccount {
  full_name: string;
  email: string;
  password: string;
  re_password: string;
}

export interface RegisterAccountProps {
  eventRegister: (paramCustomer: ParamCreateAccount) => void;
}

export const RegisterAccountScreen = memo(function RegisterAccountScreen() {
  const { eventRegister } = useNavigationParams<RegisterAccountProps>();
  const [paramCustomer, setParamCustomer] = useState<ParamCreateAccount>({
    full_name: "Nguyen Van Bee",
    email: "",
    password: "Password#1",
    re_password: "Password#1",
  });

  const setParamCustom = useCallback(
    (keyName: string, value: any) => {
      setParamCustomer({
        ...paramCustomer,
        [keyName]: value,
      });
    },
    [paramCustomer]
  );

  const [{ loading }, requestRegisterAccount] = useAsyncFn(async () => {
    const response = await requestRegister(paramCustomer);
    Keyboard.dismiss();
    if (response == "TL10002") {
      eventRegister(paramCustomer);
    }
    goBack();
  }, [paramCustomer, eventRegister]);

  return (
    <ScreenWrapper>
      <LeftModalHeader title={"Tạo tài khoản"} />

      <SImageBackground resizeMode={"cover"} source={IMG_LOGIN_THEME} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <SViewContainer>
          <SInputBorder
            value={paramCustomer.full_name}
            keyName={"full_name"}
            onTextChange={setParamCustom}
            placeHolder={"Họ và tên"}
          />

          <SInputBorder
            value={paramCustomer.email}
            keyName={"email"}
            onTextChange={setParamCustom}
            keyboardType={"email-address"}
            placeHolder={"Nhập email"}
          />
          <SInputBorder
            value={paramCustomer.password}
            keyName={"password"}
            onTextChange={setParamCustom}
            keyboardType={"email-address"}
            placeHolder={"Nhập mật khẩu"}
            secureTextEntry={true}
            textContentType="password"
          />
          <SInputBorder
            value={paramCustomer.re_password}
            keyName={"re_password"}
            onTextChange={setParamCustom}
            keyboardType={"email-address"}
            secureTextEntry={true}
            placeHolder={"Nhập lại mật khẩu"}
          />

          <SubmitButtonColor
            loading={loading}
            title={"Tạo tài khoản"}
            onPress={requestRegisterAccount}
          />
        </SViewContainer>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
});

const SImageBackground = styled.Image`
  height: 20%;
  width: 100%;
  flex: 1;
`;
const SViewContainer = styled.View`
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

const SInputBorder = styled(InputBorder).attrs({
  containerStyle: {
    marginTop: 12,
    marginRight: 16,
    marginLeft: 16,
  },
})``;
export default RegisterAccountScreen;
