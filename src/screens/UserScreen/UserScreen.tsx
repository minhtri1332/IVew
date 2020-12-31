import React, {memo, useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {Colors} from '@/themes/Colors';
import {
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {requestGetCategoryList} from '@/store/category/functions';
import {requestGetProductTypes} from '@/store/productType/functions';
import {requestGetManufactures} from '@/store/manufacture/functions';
import {goBack, replaceWithMainScreen} from '@/utils/navigation';
import {useUser} from '@/store/constant';
import Global from '@/utils/Global';
import {requestGetCountNotificationNotSeen} from '@/store/notification/functions';
import {InputBorder} from '@/components/InputBorder';
import {HeaderBack} from '@/components/HeaderBack';
import {RawUser} from '@/types';
import {EditUserParams, requestEditUser} from '@/store/constant/functions';

const Container = styled(KeyboardAvoidingView)`
  flex: 1;
  background-color: ${Colors.white};
  padding: 0 16px;
`;

const SInputBorder = styled(InputBorder).attrs({
  containerStyle: {
    marginTop: 12,
  },
})``;

const BtnUpdate = styled.TouchableOpacity`
  margin-top: 16px;
  height: 44px;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background-color: ${Colors.backgroundColor};
`;

const TextUpdate = styled.Text`
  font-size: 16px;
  color: ${Colors.white};
  font-weight: bold;
`;
export const UserScreen = memo(function HomeScreen() {
  const user: RawUser | null = useUser();
  const [state, setState] = useState<EditUserParams>(user ? {...user} : {});

  const onValueChange = useCallback(
    (keyName: string, value: string) => {
      setState({
        ...state,
        [keyName]: value,
      });
    },
    [state],
  );

  const onUpdate = useCallback(async () => {
    const res = await requestEditUser({
      ...state,
    });
    if (res) {
      goBack();
    }
  }, [state]);

  return (
    <>
      <HeaderBack title={'Cập nhật thông tin'} />
      <Container behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <SInputBorder
          value={state?.userName || ''}
          keyName={'username'}
          placeHolder={'username'}
          onTextChange={onValueChange}
          disabled={true}
        />
        <SInputBorder
          value={state?.name || ''}
          keyName={'name'}
          placeHolder={'Họ và tên'}
          onTextChange={onValueChange}
        />
        <SInputBorder
          value={state?.phoneNumber || ''}
          keyName={'phoneNumber'}
          placeHolder={'Số điện thoại'}
          keyboardType={'number-pad'}
          onTextChange={onValueChange}
        />
        <SInputBorder
          value={state?.address || ''}
          keyName={'address'}
          placeHolder={'Địa chỉ'}
          onTextChange={onValueChange}
        />
        <BtnUpdate onPress={onUpdate}>
          <TextUpdate>Cập nhật</TextUpdate>
        </BtnUpdate>
      </Container>
    </>
  );
});
