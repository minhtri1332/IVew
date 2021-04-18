import React, {memo, useCallback, useMemo} from 'react';
import {styled} from '@/global';
import {ScreenWrapper} from '@/themes/BaseStyles';
import {HeaderBack} from '@/components/HeaderBack';
import {FlatList, ListRenderItem, RefreshControl} from 'react-native';
import {ItemHistory} from '@/screens/checkin/components/ItemHistory';
import {useAsyncEffect} from '@/hooks/useAsyncEffect';
import {useCustomerByQuery} from '@/store/customer';
import {requestGetCustomer} from '@/store/customer/functions';
import {ItemCustomer} from '@/screens/Customer/components/ItemCustomer';
import ButtonText from '@/components/button/ButtonText';
import {Colors} from '@/themes/Colors';
import {openModalCreateCustomer} from '@/utils/navigation';

const keyExtractor = (item: any, index: number) => {
  return item + index;
};
export interface CustomerScreenParam {
  page: string;
  limit: string;
}
export const CustomerScreen = memo(function CustomerScreen() {
  const data = useCustomerByQuery('all');

  const {call, error, loading: loadingData} = useAsyncEffect(async () => {
    await requestGetCustomer();
  }, []);

  const renderItem: ListRenderItem<string> = useCallback(({item}) => {
    return <ItemCustomer customerId={item} />;
  }, []);

  const rightHeader = useMemo(() => {
    return (
      <ButtonText
        color={Colors.white}
        title={'Tạo'}
        onPress={openModalCreateCustomer}
      />
    );
  }, []);

  return (
    <ScreenWrapper>
      <HeaderBack title={'Danh sách khách hàng'} right={rightHeader} />

      <FlatList
        keyExtractor={keyExtractor}
        data={data}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={loadingData} onRefresh={call} />
        }
      />
    </ScreenWrapper>
  );
});

const SViewSelect = styled.View`
  flex-direction: row;
  margin: 16px;
`;

export default CustomerScreen;
