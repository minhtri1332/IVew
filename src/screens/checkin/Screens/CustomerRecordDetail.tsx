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
import {useCustomerRecord} from '@/store/customerRecord';

export interface CustomerRecordDetailProps {
  id: string;
}

export const CustomerRecordDetail = memo(function CustomerRecordDetail() {
  const {id} = useNavigationParams<CustomerRecordDetailProps>();
  const history = useCustomerRecord(id);

  return (
    <ScreenWrapper>
      <HeaderBack title={'Chi tiết khách hàng'} />
      <SViewAvatar>
        <SAvatar
          source={{
            uri: history?.image,
          }}
          size={100}
        />
        <STextName>{history?.customerName}</STextName>
      </SViewAvatar>

      <Item label={'Độ tuổi'} divider={true}>
        <ItemContent>{history?.age}</ItemContent>
      </Item>
      <Item label={'Giới tính'} divider={true}>
        <ItemContent>{history?.gender}</ItemContent>
      </Item>
      <Item label={'Độ hài lòng'} divider={true}>
        <ItemContent>{history?.emotion}</ItemContent>
      </Item>
      <Item label={'Ghé thăm lúc'} divider={true}>
        <ItemContent>{history?.date}</ItemContent>
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
