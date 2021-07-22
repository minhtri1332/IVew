import React, {memo, useCallback, useMemo} from 'react';
import {styled} from '@/global';
import {SAvatar, ScreenWrapper} from '@/themes/BaseStyles';
import {HeaderBack} from '@/components/HeaderBack';
import {useNavigationParams} from '@/hooks/useNavigationParams';
import {Item, ItemContent} from '@/components/ViewItem';
import {useAsyncEffect} from '@/hooks/useAsyncEffect';
import {
  requestGetCustomerDetail,
  requestRemoveCustomer,
} from '@/store/customer/functions';
import {useCustomer} from '@/store/customer';
import SubmitButtonColor from '@/components/button/ButtonSubmit';
import {useAsyncFn} from '@/hooks/useAsyncFn';
import {goBack, openModalCreateCustomer} from '@/utils/navigation';
import {Colors} from '@/themes/Colors';
import {Alert} from 'react-native';
import ButtonText from '@/components/button/ButtonText';

export interface CustomerDetailProps {
  id: string;
}

export const CustomerDetail = memo(function CustomerDetail() {
  const {id} = useNavigationParams<CustomerDetailProps>();
  const customer = useCustomer(id);

  const {
    call,
    error,
    loading: loadingData,
  } = useAsyncEffect(async () => {
    await requestGetCustomerDetail(id);
  }, [id]);

  console.log(customer);
  const [{loading, error: errDelete}, onDelete] = useAsyncFn(async () => {
    const data = await requestRemoveCustomer(id);

    if (data) {
      goBack();
    }
  }, [id]);

  const deleteFN = useCallback(() => {
    Alert.alert('Bạn có chắc chắn muốn xóa khách hàng này?', '', [
      {
        text: 'Hủy',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Xóa',
        onPress: async () => {
          onDelete().then();
        },
      },
    ]);
  }, [id]);

  const rightHeader = useMemo(() => {
    return (
      <ButtonText
        color={Colors.white}
        title={'Sửa'}
        onPress={() => {
          openModalCreateCustomer({id});
        }}
      />
    );
  }, [id]);

  return (
    <ScreenWrapper>
      <HeaderBack title={'Chi tiết khách hàng'} right={rightHeader} />
      <SViewAvatar>
        <SAvatar
          source={{
            uri: customer?.image,
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
      <Item label={'Số điện thoại'} divider={true}>
        <ItemContent>{customer?.telephone}</ItemContent>
      </Item>
      <Item label={'Số lần ghé thăm'} divider={true}>
        <ItemContent>{customer?.visitNumber}</ItemContent>
      </Item>
      <Item label={'Số đến gần nhất'} divider={true}>
        <ItemContent>{customer?.lastVisit}</ItemContent>
      </Item>

      <SubmitButtonColor
        title={'Xóa'}
        onPress={deleteFN}
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
