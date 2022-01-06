import React, {memo, useState} from 'react';
import {styled} from '@/global';
import {SAvatar, ScreenWrapper} from '@/themes/BaseStyles';
import {HeaderBack} from '@/components/HeaderBack';
import {useNavigationParams} from '@/hooks/useNavigationParams';
import {Item, ItemContent} from '@/components/ViewItem';
import {useCustomerRecord} from '@/store/customerRecord';
import moment from 'moment';
import {useAsyncFn} from '@/hooks/useAsyncFn';
import {
  requestGetCustomerDetail,
  requestRemoveCustomer,
} from '@/store/customer/functions';
import {goBack} from '@/utils/navigation';
import {useAsyncEffect} from '@/hooks/useAsyncEffect';
import {RawCustomer} from '@/store/customer/types';

export interface CustomerRecordDetailProps {
  id: string;
}

export const CustomerRecordDetail = memo(function CustomerRecordDetail() {
  const {id} = useNavigationParams<CustomerRecordDetailProps>();
  const history = useCustomerRecord(id);
  // const {
  //   call,
  //   error,
  //   loading: loadingData,
  // } = useAsyncEffect(async () => {
  //   if (history?.id) {
  //     await requestGetCustomerDetail(history.id);
  //   }
  // }, [history]);

  return (
    <ScreenWrapper>
      <HeaderBack title={'Chi tiết khách hàng'} />
      <SViewAvatar>
        <SAvatar
          source={{
            uri: history?.image == '' ? history?.currentImage : history?.image,
          }}
          size={100}
        />
        <STextName>{history?.customerName || 'Không xác định'}</STextName>
      </SViewAvatar>

      <Item label={'Độ tuổi'} divider={true}>
        <ItemContent>{history?.age}</ItemContent>
      </Item>

      <Item label={'Phân loại khách hàng'} divider={true}>
        <ItemContent>{history?.customerType}</ItemContent>
      </Item>
      <Item label={'Nhóm'} divider={true}>
        <ItemContent>{history?.groupName}</ItemContent>
      </Item>
      <Item label={'Số lần ghé thăm'} divider={true}>
        <ItemContent>{history?.visitNumber}</ItemContent>
      </Item>
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

export default CustomerRecordDetail;
