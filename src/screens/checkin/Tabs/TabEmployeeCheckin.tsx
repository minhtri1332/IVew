import React, {memo, useCallback, useMemo, useState} from 'react';
import {styled} from '@/global';
import {ScreenWrapper} from '@/themes/BaseStyles';
import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import {ItemHistory} from '@/screens/checkin/components/ItemHistory';
import {useAsyncEffect} from '@/hooks/useAsyncEffect';
import {requestGetHistoryList} from '@/store/history/functions';
import {useHistoryByQuery} from '@/store/history';
import {Colors} from '@/themes/Colors';
import {LineSeparator} from '@/components/LineSeparator';
import {DateTimeBorder} from '@/components/ViewBorder/DateTimeBorder';
import moment from 'moment';

const keyExtractor = (item: any, index: number) => {
  return item + index;
};
export interface HistoryProps {
  dateStart: string | number;
}
export const TabEmployeeCheckin = memo(function TabEmployeeCheckin() {
  const [params, setParams] = useState<HistoryProps>({
    dateStart: moment(new Date(), 'X').unix(),
  });
  const ListHistory = useHistoryByQuery(String(params?.dateStart));

  const data = useMemo(() => {
    return [...new Set(ListHistory)];
  }, [ListHistory]);

  const setParamCustom = useCallback(
    (value: string, keyname: any) => {
      setParams({
        ...params,
        [keyname]: value,
      });
    },
    [params],
  );

  const {call, error, loading: loadingData} = useAsyncEffect(async () => {
    if (params.dateStart != '') {
      await requestGetHistoryList(params);
    }
  }, [params.dateStart]);

  const renderItem: ListRenderItem<string> = useCallback(({item}) => {
    return <ItemHistory historyId={item} />;
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
          label={'Chọn ngày'}
          value={params.dateStart}
          keyName={'dateStart'}
          mode={'date'}
          onChangeValue={setParamCustom}
          containerStyle={{flex: 1, marginRight: 8}}
          format={'YYYY-MM-DD'}
        />
      </SViewSelect>

      <FlatList
        keyExtractor={keyExtractor}
        data={data}
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
  margin: 16px;
`;

export default TabEmployeeCheckin;
