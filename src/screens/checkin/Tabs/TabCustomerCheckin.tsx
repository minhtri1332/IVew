import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {styled} from '@/global';
import {ScreenWrapper} from '@/themes/BaseStyles';
import {FlatList, ListRenderItem, StyleSheet, Text, View} from 'react-native';
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
  groupID: string;
}

export const TabCustomerCheckin = memo(function TabCustomerCheckin() {
  const data = useCustomerRecordByQuery('all');
  const [params, setParams] = useState<CustomerRecordProps>({
    dateStart: moment(new Date(), 'X').startOf('day').unix(),
    dateEnd: moment(new Date(), 'X').startOf('day').unix(),
    groupID: '',
  });

  const setParamCustom = useCallback(
    (value: any, keyname: string) => {
      const a = moment(value, 'X').startOf('day').unix();

      setParams({
        ...params,
        [keyname]: value,
      });
    },
    [params],
  );
  const setParamDate = useCallback(
    (value: any, keyname: string) => {
      const time = moment(value).startOf('day').unix();

      setParams({
        ...params,
        [keyname]: time,
      });
    },
    [params],
  );
  const [{loading: loadingData, error}, call] = useAsyncFn(async () => {
    await requestFilterCustomer(params);
  }, [params]);

  useEffect(() => {
    filterDate().then();
  }, []);

  const [{loading, error: errorFilter}, filterDate] = useAsyncFn(async () => {
    const data = await requestFilterCustomer(params);

    // if (data && data.length > 99) {
    //   setParamCustom(String(Number(params.page) + 1), 'page');
    // }
  }, [params]);

  const renderItem: ListRenderItem<string> = useCallback(({item}) => {
    return <ItemCustomerRecord id={item} />;
  }, []);

  const updateList = useCallback(async () => {
    await filterDate();
  }, [params, setParamCustom]);

  const renderEmpty = useMemo(() => {
    return (
      <View
        style={{
          alignItems: 'center',
        }}
      >
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
          key={1}
          label={'Ngày bắt đầu'}
          value={params.dateStart}
          keyName={'dateStart'}
          mode={'date'}
          onChangeValue={setParamDate}
          containerStyle={styles.dateLeft}
          format={'YYYY-MM-DD'}
        />
        <DateTimeBorder
          key={2}
          label={'Ngày kết thúc'}
          value={params.dateEnd}
          keyName={'dateEnd'}
          mode={'date'}
          onChangeValue={setParamDate}
          containerStyle={styles.dateRight}
          format={'YYYY-MM-DD'}
        />
      </SViewSelect>

      <SubmitButtonColor
        style={styles.button}
        title={'Tìm kiếm'}
        onPress={filterDate}
        loading={loading}
      />

      <FlatList
        keyExtractor={keyExtractor}
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        onEndReachedThreshold={0.4}
        onEndReached={updateList}
      />
    </ScreenWrapper>
  );
});

const styles = StyleSheet.create({
  dateLeft: {
    flex: 1,
    marginLeft: 8,
  },
  dateRight: {
    flex: 1,
    marginLeft: 8,
  },
  button: {
    marginTop: 8,
    marginBottom: 8,
  },
});

const SViewSelect = styled.View`
  flex-direction: row;
  margin: 8px 16px 0px;
`;

export default TabCustomerCheckin;
