import React, {memo, useCallback} from 'react';
import {styled} from '@/global';
import {Colors} from '@/themes/Colors';
import {navigateToLoginScreen} from '@/utils/navigation';

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.white};
  align-items: center;
  justify-content: center;
`;
const BtnLogin = styled.TouchableOpacity`
  margin: 12px 16px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.backgroundColor};
`;

const Title = styled.Text`
  font-size: 16px;
  color: white;
  font-weight: bold;
  padding: 12px 16px;
`;

export const PleaseLoginToUse = memo(function HomeHeader() {
  const login = useCallback(() => {
    navigateToLoginScreen();
  }, []);
  return (
    <Container>
      <BtnLogin onPress={login}>
        <Title>Vui lòng đăng nhập để sử dụng</Title>
      </BtnLogin>
    </Container>
  );
});
