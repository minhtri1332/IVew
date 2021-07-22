import React, {memo} from 'react';
import {styled} from '@/global';
import {SAvatar, ScreenWrapper} from '@/themes/BaseStyles';
import {HeaderBack} from '@/components/HeaderBack';
import {useNavigationParams} from '@/hooks/useNavigationParams';
import {Item, ItemContent} from '@/components/ViewItem';
import {useCustomerRecord} from '@/store/customerRecord';
import moment from 'moment';

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
            uri: history?.avatar,
          }}
          size={100}
        />
        <STextName>{history?.name || 'Không xác định'}</STextName>
      </SViewAvatar>

      <Item label={'Độ tuổi'} divider={true}>
        <ItemContent>{history?.age}</ItemContent>
      </Item>
      <Item label={'Giới tính'} divider={true}>
        <ItemContent>{history?.sex}</ItemContent>
      </Item>
      <Item label={'Độ hài lòng'} divider={true}>
        <ItemContent>{history?.status}</ItemContent>
      </Item>
      <Item label={'Ghé thăm lúc'} divider={true}>
        <ItemContent>
          {moment(history?.date, 'X').format('DD/MM/YYYY')}
        </ItemContent>
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
