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
import ToastService from '@/services/ToastService';
import {goBack} from '@/utils/navigation';
import {useNavigationParams} from '@/hooks/useNavigationParams';
import {useCustomer} from '@/store/customer';
import {
  requestAddCustomer,
  requestEditCustomer,
} from '@/store/customer/functions';
import {removeAccents} from '@/utils/string';
import PickFileActionsSheet from '@/components/PickFileActionsSheet';
import useBoolean from '@/hooks/useBoolean';
import {TakeCameraOptions} from '@/utils/file';
import {FileType} from '@/types';

export interface ParamCreateCustomer {
  age: number;
  name: string;
  gender: string;
  image: string;
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
    name: customer ? customer.name : '',
    age: customer ? customer.age : '',
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
      const data = await requestEditCustomer(id, paramCustomer);
      if (data == 'Success') {
        ToastService.show('Sửa thành công');
        goBack();
      }
    } else {
      const data = await requestAddCustomer(paramCustomer);
      if (data) {
        ToastService.show('Tạo thành công');
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
        <HeaderBack title={'Khách hàng mới'} right={rightHeader} />
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
