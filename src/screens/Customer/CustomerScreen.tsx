import React, {memo, useCallback, useMemo, useState} from 'react';
import {styled} from '@/global';
import {ScreenWrapper} from '@/themes/BaseStyles';
import {HeaderBack} from '@/components/HeaderBack';
import {FlatList, ListRenderItem, RefreshControl} from 'react-native';
import {ItemHistory} from '@/screens/checkin/components/ItemHistory';
import {useAsyncEffect} from '@/hooks/useAsyncEffect';
import {useCustomerByQuery} from '@/store/customer';
import {
  requestFilterCustomer,
  requestGetCustomer,
} from '@/store/customer/functions';
import {ItemCustomer} from '@/screens/Customer/components/ItemCustomer';
import ButtonText from '@/components/button/ButtonText';
import {Colors} from '@/themes/Colors';
import {goBack, openModalCreateCustomer} from '@/utils/navigation';
import {DateTimeBorder} from '@/components/ViewBorder/DateTimeBorder';
import moment from 'moment';
import SubmitButtonColor from '@/components/button/ButtonSubmit';
import {useAsyncFn} from '@/hooks/useAsyncFn';
import {requestAddCustomer} from '@/store/faceDetect/function';
import ToastService from '@/services/ToastService';
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

  const [{loading, error: errorFilter}, filterDate] = useAsyncFn(async () => {
    await requestFilterCustomer(startDate, endDate);
  }, [startDate, endDate]);

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
  useAutoToastError(errorFilter);

  return (
    <ScreenWrapper>
      <HeaderBack title={'Tất cả khách hàng'} right={rightHeader} />

      <SViewSelect>
        <DateTimeBorder
          label={'Ngày bắt đầu'}
          value={startDate}
          keyName={'1'}
          mode={'date'}
          onChangeValue={setStartDate}
          containerStyle={{flex: 1, marginLeft: 8}}
          format={'YYYY-MM-DD'}
        />
        <DateTimeBorder
          label={'Ngày kết thúc'}
          value={endDate}
          keyName={'1'}
          mode={'date'}
          onChangeValue={setEndDate}
          containerStyle={{flex: 1, marginLeft: 8}}
          format={'YYYY-MM-DD'}
        />
      </SViewSelect>

      <SubmitButtonColor
        style={{marginTop: -8}}
        title={'Tìm kiếm'}
        onPress={filterDate}
      />

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
