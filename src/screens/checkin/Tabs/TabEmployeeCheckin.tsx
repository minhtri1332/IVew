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
import {FilterBoxOption} from '@/components/Filter/types';
import {list12MonthNumber} from '@/services/MomentService';
import {SelectModalBottom} from '@/components/ViewBorder/SelectModalBottom';
import {getBoxAi, useBoxAiByQuery} from '@/store/boxAI';
import {Colors} from '@/themes/Colors';
import {LineSeparator} from '@/components/LineSeparator';

const keyExtractor = (item: any, index: number) => {
  return item + index;
};
export interface HistoryProps {
  boxID: string;
  month: string;
}
export const TabEmployeeCheckin = memo(function TabEmployeeCheckin() {
  const listBoxAI = useBoxAiByQuery('all');
  const [params, setParams] = useState<HistoryProps>({
    boxID: '',
    month: '',
  });
  const ListHistory = useHistoryByQuery(params?.month + params?.boxID);

  const data = useMemo(() => {
    return [...new Set(ListHistory)];
  }, [ListHistory]);

  const setParamCustom = useCallback(
    (keyname: string, value: any) => {
      setParams({
        ...params,
        [keyname]: value,
      });
    },
    [params],
  );

  const {call, error, loading: loadingData} = useAsyncEffect(async () => {
    if (params.boxID != '' && params.month != '') {
      await requestGetHistoryList(params);
    }
  }, [params.boxID, params.month]);

  const renderItem: ListRenderItem<string> = useCallback(({item}) => {
    return <ItemHistory historyId={item} />;
  }, []);

  const getListMonth = useMemo(() => {
    let listFilterModel: FilterBoxOption[] = [];
    list12MonthNumber.map((item) => {
      let number = String(item);
      if (item < 10) {
        number = '0' + number;
      }
      listFilterModel.push({
        label: `Tháng ${item}`,
        value: number,
      });
    });
    return listFilterModel;
  }, []);

  const getListBoxAI = useMemo(() => {
    let listFilterModel: FilterBoxOption[] = [];
    listBoxAI.map((item) => {
      const boxAI = getBoxAi(item);
      listFilterModel.push({
        label: boxAI?.name || '',
        value: item,
      });
    });
    return listFilterModel;
  }, [listBoxAI]);

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
        <SelectModalBottom
          label={'Chọn tháng'}
          options={getListMonth}
          inputName={'month'}
          placeholder={'Lựa chọn'}
          selectedValue={params.month}
          onSelectOption={setParamCustom}
          containerStyle={{flex: 1, marginRight: 8}}
        />
        <SelectModalBottom
          label={'Chọn boxAI'}
          options={getListBoxAI}
          inputName={'boxID'}
          placeholder={'Lựa chọn'}
          selectedValue={params.boxID}
          onSelectOption={setParamCustom}
          containerStyle={{flex: 1, marginLeft: 8}}
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
