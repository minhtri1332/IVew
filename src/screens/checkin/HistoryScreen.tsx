import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {styled} from '@/global';
import {ScreenWrapper} from '@/themes/BaseStyles';
import {HeaderBack} from '@/components/HeaderBack';
import {FlatList, ListRenderItem, RefreshControl} from 'react-native';
import {ItemHistory} from '@/screens/checkin/components/ItemHistory';
import {useAsyncEffect} from '@/hooks/useAsyncEffect';
import {requestGetHistoryList} from '@/store/history/functions';
import {useHistoryByQuery} from '@/store/history';
import {FilterBoxOption} from '@/components/Filter/types';
import {list12MonthNumber} from '@/services/MomentService';
import {SelectModalBottom} from '@/components/ViewBorder/SelectModalBottom';
import {getBoxAi, useBoxAiByQuery} from '@/store/boxAI';

const keyExtractor = (item: any) => {
  return item;
};
export interface HistoryProps {
  boxID: string;
  month: string;
}
export const HistoryScreen = memo(function HistoryScreen() {
  const [textSearch, setTextSearch] = useState('');

  const listBoxAI = useBoxAiByQuery('all');
  const [params, setParams] = useState<HistoryProps>({
    boxID: '',
    month: '',
  });
  const ListHistory = useHistoryByQuery(params?.month + params?.boxID);

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
  console.log([...new Set(ListHistory)]);
  return (
    <ScreenWrapper>
      <HeaderBack title={'History'} />
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

      {/*<SearchBar*/}
      {/*  value={textSearch}*/}
      {/*  debounceTime={0}*/}
      {/*  onSearchTextChange={setTextSearch}*/}
      {/*/>*/}

      <FlatList
        keyExtractor={keyExtractor}
        data={[...new Set(ListHistory)]}
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
