import React, {memo, useCallback, useState} from 'react';
import {ScreenWrapper} from '@/themes/BaseStyles';
import {HeaderBack} from '@/components/HeaderBack';
import {FlatList, InteractionManager, ListRenderItem, RefreshControl} from 'react-native';
import {useAsyncEffect} from '@/hooks/useAsyncEffect';
import {useCustomerByQuery} from '@/store/customer';
import {requestGetCustomer} from '@/store/customer/functions';
import {ItemCustomer} from '@/screens/Customer/components/ItemCustomer';
import {openModalCreateCustomer} from '@/utils/navigation';
import useAutoToastError from '@/hooks/useAutoToastError';
import FloatingButton from '@/components/button/FloatingButton';
import {useLoaded} from '@/hooks/useLoaded';
import {useInteractionManager} from '@react-native-community/hooks';
import {Loading} from '@/components/View/Loading';

const keyExtractor = (item: any, index: number) => {
  return item + index;
};

export const CustomerScreen = memo(function CustomerScreen() {
  const [page, setPage] = useState(1);
  const data = useCustomerByQuery('all');
  const interactionReady = useInteractionManager();
  const {
    call,
    error,
    loading: loadingData,
  } = useAsyncEffect(async () => {
    const data = await requestGetCustomer();
    if (data && data.length > 99) {
      setPage(page + 1);
    }
  }, [page]);

  const updateList = useCallback(async () => {
    await call();
  }, [page]);

  const refreshList = useCallback(async () => {
    await setPage(1);
    await call();
  }, [page]);

  const renderItem: ListRenderItem<string> = useCallback(({item}) => {
    return <ItemCustomer customerId={item} />;
  }, []);

  const openCreate = useCallback(() => {
    openModalCreateCustomer({});
  }, []);

  useAutoToastError(error);

  const loaded = useLoaded(loadingData)

  return (
    <ScreenWrapper>
      <HeaderBack title={'Tất cả khách hàng'} />

      {interactionReady && loaded()?      <FlatList
        keyExtractor={keyExtractor}
        data={data}
        renderItem={renderItem}
        onEndReachedThreshold={0.4}
        onEndReached={updateList}
        refreshControl={
          <RefreshControl refreshing={loadingData} onRefresh={refreshList} />
        }
      />: <Loading/>}

      <FloatingButton onPress={openCreate} />
    </ScreenWrapper>
  );
});

export default CustomerScreen;
