import React, {memo, useCallback, useMemo, useState} from 'react';
import {ScreenWrapper} from '@/themes/BaseStyles';
import {HeaderBack} from '@/components/HeaderBack';
import PickImageModalComponent from '@/screens/Customer/components/PickImageModalComponent';
import {styled} from '@/global';
import {InputBorder} from '@/components/InputBorder';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CheckBoxBorder} from '@/components/ViewBorder/CheckboxBorder';
import {StyleSheet} from 'react-native';
import {FilterBoxOption} from '@/components/Filter/types';
import {Colors} from '@/themes/Colors';
import ButtonText from '@/components/button/ButtonText';
import {useAsyncFn} from '@/hooks/useAsyncFn';
import {requestAddCustomer} from '@/store/faceDetect/function';
import ToastService from '@/services/ToastService';
import {goBack} from '@/utils/navigation';
import {useNavigationParams} from '@/hooks/useNavigationParams';
import {HistoryDetailProps} from '@/screens/checkin/Screens/HistoryDetail';
import {useCustomer} from '@/store/customer';

export interface ParamCreateCustomer {
  age: string;
  name: string;
  gender: string;
  image: string;
}

const paramGender = ['Nam', 'Nữ', 'Khác'];

export interface ModalCreateCustomerProps {
  id?: string;
}

export const ModalCreateCustomer = memo(function ModalCreateCustomer() {
  const {id} = useNavigationParams<ModalCreateCustomerProps>();
  const customer = useCustomer(id);
  const [paramCustomer, setParamCustomer] = useState<ParamCreateCustomer>({
    name: customer ? customer.name : '',
    age: customer ? String(customer.age) : '',
    gender: customer ? customer.gender : '',
    image: customer ? customer.avatarPath : '',
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

  const [{loading, error}, requestData] = useAsyncFn(async () => {
    if (id) {
      await requestAddCustomer(paramCustomer);
    } else {
      const data = await requestAddCustomer(paramCustomer);
      if (data) {
        ToastService.show('Success!');
        goBack();
      }
    }
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
        <HeaderBack title={'New Customer'} right={rightHeader} />
        <PickImageModalComponent onImageCallback={setParamCustom} />

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
          onTextChange={setParamCustom}
          placeHolder={'Tuổi'}
          required={true}
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
