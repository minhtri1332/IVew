import React, {memo, useCallback, useState} from 'react';
import {styled} from '@/global';
import {ScreenWrapper} from '@/themes/BaseStyles';
import {HeaderBack} from '@/components/HeaderBack';
import {SearchBar} from '@/components/SearchBar';
import {FlatList, ListRenderItem, RefreshControl} from 'react-native';
import {ItemHistory} from '@/screens/checkin/components/ItemHistory';
import {useAsyncFn} from '@/hooks/useAsyncFn';
import {useAsyncEffect} from '@/hooks/useAsyncEffect';
import {requestGetHistoryList} from '@/store/history/functions';
import {useHistoryByQuery} from '@/store/history';

const data = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

const keyExtractor = (item: any): string => {
  return item;
};

export const HistoryScreen = memo(function HistoryScreen() {
  const [textSearch, setTextSearch] = useState('');
  const ListHistory = useHistoryByQuery('all');

  const {call, error, loading: loadingData} = useAsyncEffect(async () => {
    await requestGetHistoryList();
  }, []);

  const renderItem: ListRenderItem<string> = useCallback(({item}) => {
    return <ItemHistory historyId={item} />;
  }, []);

  return (
    <ScreenWrapper>
      <HeaderBack title={'History'} />
      <SearchBar
        value={textSearch}
        debounceTime={0}
        onSearchTextChange={setTextSearch}
      />

      <FlatList
        keyExtractor={keyExtractor}
        data={ListHistory}
        renderItem={renderItem}
        // refreshControl={
        //   <RefreshControl refreshing={loading} onRefresh={call} />
        // }
      />
    </ScreenWrapper>
  );
});

const SViewContainerHome = styled.View`
  flex: 1;
`;
