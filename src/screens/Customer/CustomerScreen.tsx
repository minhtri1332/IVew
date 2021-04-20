import React, {memo, useCallback, useMemo, useState} from 'react';
import {styled} from '@/global';
import {ScreenWrapper} from '@/themes/BaseStyles';
import {HeaderBack} from '@/components/HeaderBack';
import {FlatList, ListRenderItem, RefreshControl} from 'react-native';
import {useAsyncEffect} from '@/hooks/useAsyncEffect';
import {useCustomerByQuery} from '@/store/customer';
import {requestGetCustomer} from '@/store/customer/functions';
import {ItemCustomer} from '@/screens/Customer/components/ItemCustomer';
import ButtonText from '@/components/button/ButtonText';
import {Colors} from '@/themes/Colors';
import {openModalCreateCustomer} from '@/utils/navigation';
import {DateTimeBorder} from '@/components/ViewBorder/DateTimeBorder';
import moment from 'moment';
import SubmitButtonColor from '@/components/button/ButtonSubmit';
import {useAsyncFn} from '@/hooks/useAsyncFn';
import useAutoToastError from '@/hooks/useAutoToastError';

const keyExtractor = (item: any, index: number) => {
  return item + index;
};
export interface CustomerScreenParam {
  page: string;
  limit: string;
}
export const CustomerScreen = memo(function CustomerScreen() {
  const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'));
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
        onPress={() => {
          openModalCreateCustomer({});
        }}
      />
    );
  }, []);

  useAutoToastError(error);


  return (
    <ScreenWrapper>
      <HeaderBack title={'Tất cả khách hàng'} right={rightHeader} />

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
  margin: 16px 8px;
`;

export default CustomerScreen;
