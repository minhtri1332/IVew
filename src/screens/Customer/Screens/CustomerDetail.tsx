import React, {memo, useCallback, useMemo, useState} from 'react';
import {styled} from '@/global';
import {ScreenWrapper} from '@/themes/BaseStyles';
import {HeaderBack} from '@/components/HeaderBack';
import {useNavigationParams} from '@/hooks/useNavigationParams';
import {SIcon} from '@/themes/BaseStyles';
import {IC_ARROW, IC_EDIT, IC_LOGO} from '@/assets';
import {SAvatar} from '@/themes/BaseStyles';
import {Item, ItemContent} from '@/components/ViewItem';
import moment from 'moment';
import {useHistory} from '@/store/history';
import {useAsyncEffect} from '@/hooks/useAsyncEffect';
import {
  requestGetCustomer,
  requestGetCustomerDetail,
  requestRemoveCustomer,
} from '@/store/customer/functions';
import {useCustomer} from '@/store/customer';
import SubmitButtonColor from '@/components/button/ButtonSubmit';
import {useAsyncFn} from '@/hooks/useAsyncFn';
import {requestAddCustomer} from '@/store/faceDetect/function';
import ToastService from '@/services/ToastService';
import {goBack} from '@/utils/navigation';
import {Colors} from '@/themes/Colors';
import {Alert} from 'react-native';

export interface CustomerDetailProps {
  id: string;
}

export const CustomerDetail = memo(function CustomerDetail() {
  const {id} = useNavigationParams<CustomerDetailProps>();
  const customer = useCustomer(id);

  const {call, error, loading: loadingData} = useAsyncEffect(async () => {
    await requestGetCustomerDetail(id);
  }, [id]);

  const [{loading, error: errDelete}, onDelete] = useAsyncFn(async () => {
    Alert.alert('Bạn có chắc chắn muốn xóa khách hàng này?', '', [
      {
        text: 'Hủy',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Xóa',
        onPress: async () => {
          await requestRemoveCustomer(id);
          goBack();
        },
      },
    ]);
  }, []);

  return (
    <ScreenWrapper>
      <HeaderBack title={'Chi tiết khách hàng'} />
      <SViewAvatar>
        <SAvatar
          source={{
            uri: customer?.avatarPath,
          }}
          size={100}
        />
        <STextName>{customer?.name}</STextName>
      </SViewAvatar>

      <Item label={'Giới tính'} divider={true}>
        <ItemContent>{customer?.gender}</ItemContent>
      </Item>
      <Item label={'Tuổi'} divider={true}>
        <ItemContent>{customer?.age}</ItemContent>
      </Item>
      <Item label={'Trạng thái'} divider={true}>
        <ItemContent>
          {customer?.active ? 'Đang hoạt đông' : 'Không hoạt động'}
        </ItemContent>
      </Item>

      <SubmitButtonColor
        title={'Xóa'}
        onPress={onDelete}
        loading={loading}
        color={Colors.red1}
      />
    </ScreenWrapper>
  );
});

const SViewAvatar = styled.View`
  align-items: center;
  margin: 16px;
`;

const STextName = styled.Text`
  font-family: Roboto-Medium;
  font-size: 20px;
  align-items: center;
  margin: 16px;
`;
