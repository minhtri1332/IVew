import React, {memo, useMemo} from 'react';
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

  const typeCustomer = useMemo(() => {
    let type: string = '';
    if (Number(history?.visit || '0') == 1) {
      type = 'Khách lạ (đến lần đầu)';
    }
    if (Number(history?.visit || '0') > 1) {
      type = 'Khách quen';
    }
    if (Number(history?.visit || '0') > 15) {
      type = 'Khách Vip';
    }
    return type;
  }, [history?.visit]);

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
      <Item label={'Trạng thái khách hàng'} divider={true}>
        <ItemContent>{history?.status}</ItemContent>
      </Item>
      <Item label={'Phân loại khách hàng'} divider={true}>
        <ItemContent>{typeCustomer}</ItemContent>
      </Item>
      <Item label={'Số lần ghé thăm'} divider={true}>
        <ItemContent>{history?.visit}</ItemContent>
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
