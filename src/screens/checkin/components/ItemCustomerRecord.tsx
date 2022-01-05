import React, {memo, useCallback} from 'react';
import {styled} from '@/global';
import {SAvatar} from '@/themes/BaseStyles';
import {Colors} from '@/themes/Colors';
import {LineSeparator} from '@/components/LineSeparator';
import {navigateToCustomerRecordDetail} from '@/utils/navigation';
import {useCustomerRecord} from '@/store/customerRecord';
import moment from 'moment';

interface ItemCustomerRecordProps {
  id: string;
}

export const ItemCustomerRecord = memo(function ItemCustomerRecord({
  id,
}: ItemCustomerRecordProps) {
  const customer = useCustomerRecord(id);

  const onPress = useCallback(() => {
    navigateToCustomerRecordDetail({id: id});
  }, [id]);

  if (!customer) return null;

  return (
    <SViewContainer activeOpacity={0.6} onPress={onPress}>
      <SAvatar
        source={{
          uri: customer?.image,
        }}
        size={40}
      />
      <SViewContent>
        <STextName>{customer?.customerName || 'Không xác định'}</STextName>
        <STextTitle>{customer?.date}</STextTitle>
        {/*<STextTitle>{`Ghé thăm: ${moment(customer?.date, 'X').format(*/}
        {/*  'DD/MM/YYYY',*/}
        {/*)}   •   Tuổi: ${customer?.age}`}</STextTitle>*/}
        <LineSeparator />
      </SViewContent>
    </SViewContainer>
  );
});

const SViewContainer = styled.TouchableOpacity`
  margin: 8px 16px 0px 16px;
  flex-direction: row;
  align-items: center;
`;

const SViewContent = styled.View`
  flex: 1;
  margin-left: 16px;
`;

const STextName = styled.Text`
  font-size: 16px;
  line-height: 22px;
  font-family: Roboto;
  color: ${Colors.grey1};
`;
const STextTitle = styled.Text`
  font-size: 14px;
  line-height: 20px;
  padding-bottom: 8px;
  color: ${Colors.grey2};
`;
const STextTime = styled.Text<{isLate: boolean}>`
  font-size: 13px;
  line-height: 18px;
  font-family: Roboto-Medium;
  color: ${(props: any) => (props.isLate ? Colors.green1 : Colors.red0)};
  padding-bottom: 8px;
`;
