import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {styled} from '@/global';
import {ScreenWrapper} from '@/themes/BaseStyles';
import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import {useAsyncEffect} from '@/hooks/useAsyncEffect';
import {Colors} from '@/themes/Colors';
import {DateTimeBorder} from '@/components/ViewBorder/DateTimeBorder';
import moment from 'moment';
import SubmitButtonColor from '@/components/button/ButtonSubmit';
import {useAsyncFn} from '@/hooks/useAsyncFn';
import {requestFilterCustomer} from '@/store/customerRecord/functions';
import {useCustomerRecordByQuery} from '@/store/customerRecord';
import {ItemCustomerRecord} from '@/screens/checkin/components/ItemCustomerRecord';
import {LineSeparator} from '@/components/LineSeparator';

const keyExtractor = (item: any, index: number) => {
  return item + index;
};
export interface CustomerRecordProps {
  dateStart: number;
  dateEnd: number;
}
export const TabCustomerCheckin = memo(function TabCustomerCheckin() {
  const data = useCustomerRecordByQuery('all');
  const [params, setParams] = useState<CustomerRecordProps>({
    dateStart: moment(new Date(), 'X').unix(),
    dateEnd: moment(new Date(), 'X').unix(),
  });

  const setParamCustom = useCallback(
    (value: any, keyname: string) => {
      setParams({
        ...params,
        [keyname]: value,
      });
    },
    [params],
  );

  const ListCustomerRecord = useMemo(() => {
    return [...new Set(data)];
  }, [data]);

  const {call, error, loading: loadingData} = useAsyncEffect(async () => {
    await requestFilterCustomer(params);
  }, [params]);

  useEffect(() => {
    filterDate().then();
  }, []);

  const [{loading, error: errorFilter}, filterDate] = useAsyncFn(async () => {
    await requestFilterCustomer(params);
  }, [params]);

  const renderItem: ListRenderItem<string> = useCallback(({item}) => {
    return <ItemCustomerRecord id={item} />;
  }, []);

  const renderEmpty = useMemo(() => {
    return (
      <View
        style={{
          alignItems: 'center',
        }}>
        <Text style={{marginTop: 100, fontSize: 18, color: Colors.grey3}}>
          Không có dữ liệu!
        </Text>
      </View>
    );
  }, []);

  return (
    <ScreenWrapper>
      <LineSeparator />
      <SViewSelect>
        <DateTimeBorder
          label={'Ngày bắt đầu'}
          value={params.dateStart}
          keyName={'dateStart'}
          mode={'date'}
          onChangeValue={setParamCustom}
          containerStyle={{flex: 1, marginRight: 8}}
          format={'YYYY-MM-DD'}
        />
        <DateTimeBorder
          label={'Ngày kết thúc'}
          value={params.dateEnd}
          keyName={'dateEnd'}
          mode={'date'}
          onChangeValue={setParamCustom}
          containerStyle={{flex: 1, marginLeft: 8}}
          format={'YYYY-MM-DD'}
        />
      </SViewSelect>

      <SubmitButtonColor
        style={{marginTop: 8, marginBottom: 8}}
        title={'Tìm kiếm'}
        onPress={filterDate}
      />

      <FlatList
        keyExtractor={keyExtractor}
        data={ListCustomerRecord}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl refreshing={loadingData} onRefresh={call} />
        }
      />
    </ScreenWrapper>
  );
});

const SViewSelect = styled.View`
  flex-direction: row;
  margin: 8px 16px 0px;
`;

export default TabCustomerCheckin;
