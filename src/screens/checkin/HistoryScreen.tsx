import React, {memo, useCallback, useState} from 'react';
import {styled} from '@/global';
import {ScreenWrapper} from '@/themes/BaseStyles';
import {HeaderBack} from '@/components/HeaderBack';
import {SearchBar} from '@/components/SearchBar';
import {FlatList, ListRenderItem, RefreshControl} from 'react-native';
import {ItemHistory} from '@/screens/checkin/components/ItemHistory';

const data = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

const keyExtractor = (item: any): string => {
  return item;
};

export const HistoryScreen = memo(function HistoryScreen() {
  const [textSearch, setTextSearch] = useState('');

  const renderItem: ListRenderItem<string> = useCallback(({item}) => {
    return <ItemHistory idItem={item} />;
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
        data={data}
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
