import React, {memo, useCallback} from 'react';
import {ScreenWrapper} from '@/themes/BaseStyles';
import {HeaderBack} from '@/components/HeaderBack';
import {FlatList, ListRenderItem, RefreshControl} from 'react-native';
import {useAsyncEffect} from '@/hooks/useAsyncEffect';
import {useCustomerByQuery} from '@/store/customer';
import {requestGetCustomer} from '@/store/customer/functions';
import {ItemCustomer} from '@/screens/Customer/components/ItemCustomer';
import {openModalCreateCustomer} from '@/utils/navigation';
import useAutoToastError from '@/hooks/useAutoToastError';
import FloatingButton from '@/components/button/FloatingButton';

const keyExtractor = (item: any, index: number) => {
  return item + index;
};

export const CustomerScreen = memo(function CustomerScreen() {
  const data = useCustomerByQuery('all');

  const {call, error, loading: loadingData} = useAsyncEffect(async () => {
    await requestGetCustomer();
  }, []);

  const renderItem: ListRenderItem<string> = useCallback(({item}) => {
    return <ItemCustomer customerId={item} />;
  }, []);

  const openCreate = useCallback(() => {
    openModalCreateCustomer({});
  }, []);

  useAutoToastError(error);

  return (
    <ScreenWrapper>
      <HeaderBack title={'Tất cả khách hàng'} />

      <FlatList
        keyExtractor={keyExtractor}
        data={data}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={loadingData} onRefresh={call} />
        }
      />

      <FloatingButton onPress={openCreate} />
    </ScreenWrapper>
  );
});

export default CustomerScreen;
