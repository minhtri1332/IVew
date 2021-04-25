import React, {memo, useState} from 'react';
import {HeaderBack} from '@/components/HeaderBack';
import {styled} from '@/global';
import {InputBorder} from '@/components/ViewBorder/InputBorder';
import {Colors} from '@/themes/Colors';
import {useAsyncFn} from '@/hooks/useAsyncFn';
import SubmitButtonColor from '@/components/button/ButtonSubmit';
import {requestCreateDepartment} from '@/store/department/functions';
import {goBack} from '@/utils/navigation';

export interface ParamCreateCustomer {
  age: number;
  name: string;
  gender: string;
  image: string;
}

export const CreateDepartmentModel = memo(function CreateDepartmentModel() {
  const [name, setName] = useState('');

  const [{loading, error}, requestData] = useAsyncFn(async () => {
    const message = await requestCreateDepartment(name);
    if (message === 'Success') {
      goBack();
    }
  }, [name]);

  return (
    <SContainer>
      <HeaderBack title={'Thêm phòng ban'} />

      <SInputBorder
        value={name}
        keyName={'name'}
        onTextChange={(key: string, value: string) => {
          setName(value);
        }}
        placeHolder={'Tên phòng ban'}
        isFocus={true}
      />

      <SubmitButtonColor title={'Lưu'} onPress={requestData} />
    </SContainer>
  );
});

const SContainer = styled.View`
  flex: 1;
  background-color: ${Colors.white};
`;

const SInputBorder = styled(InputBorder).attrs({
  containerStyle: {
    marginTop: 16,
    marginRight: 16,
    marginLeft: 16,
  },
})``;

export default CreateDepartmentModel;
