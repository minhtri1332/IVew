import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {styled} from '@/global';
import {ScreenWrapper} from '@/themes/BaseStyles';
import {HeaderBack} from '@/components/HeaderBack';
import {SearchBar} from '@/components/SearchBar';
import {FlatList, ListRenderItem, RefreshControl} from 'react-native';
import {ItemHistory} from '@/screens/checkin/components/ItemHistory';
import {useAsyncEffect} from '@/hooks/useAsyncEffect';
import {requestGetHistoryList} from '@/store/history/functions';
import {useHistoryByQuery} from '@/store/history';
import {FilterBoxOption} from '@/components/Filter/types';
import {list12Month, list12MonthNumber} from '@/services/MomentService';
import {SelectModalBottom} from '@/components/ViewBorder/SelectModalBottom';
import {getBoxAi, useBoxAi, useBoxAiByQuery} from '@/store/boxAI';
import {useAsyncFn} from '@/hooks/useAsyncFn';
import {requestLogin} from '@/store/auth/function';
import LocalStorageHelper from '@/services/LocalServiceHelper';
import {replaceWithMainScreen} from '@/utils/navigation';

const keyExtractor = (item: any) => {
  return item;
};
export interface HistoryProps {
  boxID: string;
  month: string;
}
export const HistoryScreen = memo(function HistoryScreen() {
  const [textSearch, setTextSearch] = useState('');
  const ListHistory = useHistoryByQuery('all');
  const listBoxAI = useBoxAiByQuery('all');
  const [params, setParams] = useState<HistoryProps>({
    boxID: '',
    month: '',
  });

  const setParamCustom = useCallback(
    (keyname: string, value: any) => {
      setParams({
        ...params,
        [keyname]: value,
      });
    },
    [params],
  );

  const [{loading}, startRequest] = useAsyncFn(async () => {
    await requestGetHistoryList();
  }, [params]);

  const {call, error, loading: loadingData} = useAsyncEffect(async () => {
    await requestGetHistoryList(params);
  }, [params]);

  const renderItem: ListRenderItem<string> = useCallback(({item}) => {
    return <ItemHistory historyId={item} />;
  }, []);

  const getListMonth = useMemo(() => {
    let listFilterModel: FilterBoxOption[] = [];
    list12MonthNumber.map((item) => {
      listFilterModel.push({
        label: `Tháng ${item}`,
        value: item,
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
        // refreshControl={
        //   <RefreshControl refreshing={loading} onRefresh={call} />
        // }
      />
    </ScreenWrapper>
  );
});

const SViewSelect = styled.View`
  flex-direction: row;
  margin: 16px;
`;
