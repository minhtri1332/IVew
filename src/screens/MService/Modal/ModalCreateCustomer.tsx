import React, {memo, useCallback, useMemo, useState} from 'react';
import {ScreenWrapper} from '@/themes/BaseStyles';
import {HeaderBack} from '@/components/HeaderBack';
import PickImageModalComponent from '@/screens/MService/components/PickImageModalComponent';
import {styled} from '@/global';
import {InputBorder} from '@/components/InputBorder';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CheckBoxBorder} from '@/components/ViewBorder/CheckboxBorder';
import {StyleSheet} from 'react-native';
import {FilterBoxOption} from '@/components/Filter/types';
import {Colors} from '@/themes/Colors';

interface ParamsInterface {
  name: string;
  gender: string;
  birthday: string;
  phone: string;
  email: string;
}

const paramGender = ['Nam', 'Nữ', 'Khác'];

export const ModalCreateCustomer = memo(function ModalCreateCustomer() {
  const [params, setParams] = useState<ParamsInterface>({
    name: '',
    gender: '',
    birthday: '',
    phone: '',
    email: '',
  });

  const setPramCustom = useCallback(
    (keyName: string, value: any) => {
      setParams({
        ...params,
        [keyName]: value,
      });
    },
    [params],
  );

  const setPramBirthday = useCallback(
    (keyName: string, value: any) => {
      setParams({
        ...params,
        [keyName]: value,
      });
    },
    [params],
  );

  const getOptionTarget = useMemo(() => {
    let listFilterModel: FilterBoxOption[] = [];
    paramGender.map((item, index) => {
      listFilterModel.push({
        label: item,
        value: item,
      });
    });
    return listFilterModel;
  }, [paramGender]);

  return (
    <SViewKeyBroadAware enableOnAndroid={true}>
      <SContainer>
        <HeaderBack title={'New Customer'} />
        <PickImageModalComponent />

        <SInputBorder
          value={params.name}
          keyName={'name'}
          onTextChange={setPramCustom}
          placeHolder={'Họ tên'}
          required={true}
        />
        <CheckBoxBorder
          placeholder={'Chọn quyền'}
          containerStyle={styles.inputBorder}
          label={'Chọn quyền'}
          options={getOptionTarget}
          selectedValue={params.gender}
          inputName={'gender'}
          onSelectOption={setPramCustom}
          flexDirection={true}
        />
        <SInputBorder
          value={params.birthday}
          keyName={'birthday'}
          onTextChange={setPramBirthday}
          placeHolder={'dd/mm/yyyy'}
        />
        <SInputBorder
          value={params.phone}
          keyName={'phone'}
          onTextChange={setPramCustom}
          placeHolder={'Date of birth'}
        />
        <SInputBorder
          value={params.email}
          keyName={'email'}
          onTextChange={setPramCustom}
          placeHolder={'Email'}
        />
      </SContainer>
    </SViewKeyBroadAware>
  );
});

const SViewKeyBroadAware = styled(KeyboardAwareScrollView)`
  background-color: ${Colors.white};
`;

const SContainer = styled.View``;

const SInputBorder = styled(InputBorder).attrs({
  containerStyle: {
    marginTop: 16,
    marginRight: 16,
    marginLeft: 16,
  },
})``;

const styles = StyleSheet.create({
  inputBorder: {
    marginTop: 16,
    marginRight: 16,
    marginLeft: 16,
  },
});

export default ModalCreateCustomer;
