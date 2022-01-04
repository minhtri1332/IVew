import React, {memo, useCallback, useMemo} from 'react';
import {styled} from '@/global';
import {SAvatar, SIcon} from '@/themes/BaseStyles';
import {IC_ARROW, IC_ARROW_DOWN, IC_LOGO} from '@/assets';
import {Colors} from '@/themes/Colors';
import {LineSeparator} from '@/components/LineSeparator';
import {useCustomer} from '../../../store/customer';
import {View} from 'react-native';
import {navigateToCustomerDetailScreen} from '@/utils/navigation';

interface ItemCustomerProps {
  customerId: string;
}

export const ItemCustomer = memo(function ItemCustomer({
  customerId,
}: ItemCustomerProps) {
  const customer = useCustomer(customerId);
  const onPress = useCallback(() => {
    navigateToCustomerDetailScreen({id: customerId});
  }, [customerId]);

  const gender = useMemo(() => {
    return (customer?.gender || '') === 'male' ? 'Nam' : 'Nữ';
  }, [customer?.gender]);

  if (!customer) return null;

  return (
    <SViewContainer activeOpacity={0.6} onPress={onPress}>
      <View
        style={{borderWidth: 1, borderColor: Colors.grey6, borderRadius: 40}}>
        <SAvatar
          source={{
            uri:
              customer?.image?.path || customer?.image == ''
                ? customer?.currentImage
                : customer?.image,
          }}
          size={40}
        />
      </View>
      <SViewContent>
        <STextName>{customer?.name}</STextName>
        <STextTitle>
          Giới tính: {gender} - Tuổi: {customer.age}
        </STextTitle>

        <LineSeparator />
      </SViewContent>
      <SIcon source={IC_ARROW} size={28} tintColor={Colors.grey3} />
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
  color: ${Colors.grey2};
`;
const STextTitle = styled.Text`
  font-size: 14px;
  line-height: 20px;
  padding-bottom: 8px;
  color: ${Colors.grey3};
`;
