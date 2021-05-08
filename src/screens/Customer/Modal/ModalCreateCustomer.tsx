import React, {memo, useCallback, useMemo, useState} from 'react';
import {HeaderBack} from '@/components/HeaderBack';
import PickImageModalComponent from '@/screens/Customer/components/PickImageModalComponent';
import {styled} from '@/global';
import {InputBorder} from '@/components/ViewBorder/InputBorder';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CheckBoxBorder} from '@/components/ViewBorder/CheckboxBorder';
import {StyleSheet} from 'react-native';
import {FilterBoxOption} from '@/components/Filter/types';
import {Colors} from '@/themes/Colors';
import ButtonText from '@/components/button/ButtonText';
import {useAsyncFn} from '@/hooks/useAsyncFn';
import {goBack} from '@/utils/navigation';
import {useNavigationParams} from '@/hooks/useNavigationParams';
import {useCustomer} from '@/store/customer';
import {
  requestAddCustomer,
  requestEditCustomer,
} from '@/store/customer/functions';
import {removeAccents} from '@/utils/string';
import {TakeCameraOptions} from '@/utils/file';
import ToastService from '@/services/ToastService';

export interface ParamCreateCustomer {
  age: number;
  name: string;
  gender: string;
}

const paramGender = ['Nam', 'Nữ'];

export interface ModalCreateCustomerProps {
  id?: string;
}

export const takeCameraOptions: TakeCameraOptions = {
  mediaType: 'photo',
  forceJpg: true,
};

export const ModalCreateCustomer = memo(function ModalCreateCustomer() {
  const {id} = useNavigationParams<ModalCreateCustomerProps>();

  const customer = useCustomer(id);
  const [paramCustomer, setParamCustomer] = useState<ParamCreateCustomer>({
    id: customer ? customer.id : '',
    name: customer ? customer.name : '',
    age: customer ? customer.age : '',
    gender: customer ? customer.gender : '',
  });

  const setParamCustom = useCallback(
    (keyName: string, value: any) => {
      setParamCustomer({
        ...paramCustomer,
        [keyName]: value,
      });
    },
    [paramCustomer],
  );

  const setParamCustomNumber = useCallback(
    (keyName: string, value: any) => {
      const age = Number(value.replace(/,/g, ''));

      setParamCustomer({
        ...paramCustomer,
        [keyName]: age > 100 ? 100 : age,
      });
    },
    [paramCustomer],
  );

  const getOptionTarget = useMemo(() => {
    let listFilterModel: FilterBoxOption[] = [];
    paramGender.map((item, index) => {
      listFilterModel.push({
        label: item,
        value: removeAccents(item),
      });
    });
    return listFilterModel;
  }, [paramGender]);

  const [{loading, error}, requestData] = useAsyncFn(async () => {
    if (id) {
      await requestEditCustomer(id, paramCustomer);
      ToastService.show('Sửa thành công!');
    } else {
      await requestAddCustomer(paramCustomer);
      ToastService.show('Tạo thành công!');
    }

    goBack();
  }, [paramCustomer, id]);

  const rightHeader = useMemo(() => {
    return (
      <ButtonText
        color={Colors.white}
        title={'Lưu'}
        onPress={requestData}
        loading={loading}
      />
    );
  }, [loading, paramCustomer]);

  return (
    <SViewKeyBroadAware enableOnAndroid={true}>
      <SContainer>
        <HeaderBack
          title={id ? 'Sửa khách hàng' : 'Khách hàng mới'}
          right={rightHeader}
        />

        {!id && <PickImageModalComponent onImageCallback={setParamCustom} />}

        <SInputBorder
          value={paramCustomer.name}
          keyName={'name'}
          onTextChange={setParamCustom}
          placeHolder={'Họ tên'}
          required={true}
        />
        <SInputBorder
          value={paramCustomer.age}
          keyName={'age'}
          onTextChange={setParamCustomNumber}
          placeHolder={'Tuổi'}
          required={true}
          keyboardType={'numeric'}
        />
        <CheckBoxBorder
          placeholder={'Giới tính'}
          containerStyle={styles.inputBorder}
          label={'Giới tính'}
          options={getOptionTarget}
          selectedValue={paramCustomer.gender}
          inputName={'gender'}
          onSelectOption={setParamCustom}
          flexDirection={true}
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
