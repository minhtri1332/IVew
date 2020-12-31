import React, {memo, useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {Colors} from '@/themes/Colors';
import {ActivityIndicator, FlatList, RefreshControl, ScrollView, View} from 'react-native';
import {useAsyncFn} from '@/hooks/useAsyncFn';
import {HeaderBack} from "@/components/HeaderBack";
import {FilterModalBottom} from "@/components/Filter/FilterModalBottom";
import {BaseStyles} from "@/themes/BaseStyles";

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.white};
`;

interface ItemProps {
    item: string;
    index: number;
}

const ItemContainer = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  padding: 0 16px;
  margin-top: 16px;
`;

const ItemContentContainer = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.gray6};
  padding-bottom: 12px;
`;

const Left = styled.View`
  width: 80px;
  height: 100%;
  flex-direction: row;
  align-items: center;
`;

const LeftAvatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 6px;
`;

const IconRight = styled.Image`
  width: 12px;
  height: 6px;
  transform: rotate(-90deg);
`;
const Right = styled.View`
  flex: 1;
  padding: 0 12px 12px 12px;
`;

const Name = styled.Text`
  font-size: 16px;
  color: ${Colors.gray1};
  font-weight: bold;
`;

const Des = styled.Text`
  font-size: 15px;
  line-height: 23px;
  color: ${Colors.gray3};
  padding-top: 4px;
`;

const Item = memo(({item}: ItemProps) => {
    return (
        <ItemContainer>
            <ItemContentContainer>
                <Left>
                    <LeftAvatar source={{uri: ''}} />
                </Left>
                <Right>
                    <Name>
                        name item
                    </Name>
                    <Des>
                        subtitle
                    </Des>
                </Right>
            </ItemContentContainer>
        </ItemContainer>
    );
});

export const NotifyScreen = memo(function HomeScreen() {
    const [data, setData] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [loadingMore, setLoadingMore] = useState(false);

    const [{loading}, getList] = useAsyncFn(async () => {
        setLoadingMore(false);

        return [];
    }, [data, loadingMore, currentPage]);

    useEffect(() => {
        getList();
    }, [currentPage]);

    const handleLoadMore = useCallback(() => {
        if (loadingMore || loading) {
            return;
        }
        setLoadingMore(true);
        setCurrentPage(currentPage + 1);
    }, [currentPage, loadingMore]);

    const renderFooter = useCallback(() => {
        return loadingMore ? (
            <View>
                <ActivityIndicator size={'large'}/>
            </View>
        ) : null;
    }, [loadingMore]);

    const renderItem = useCallback(({item, index}) => {
        return <Item item={item} index={index}/>;
    }, []);

    return (
        <Container>
            <HeaderBack title={'Danh sách thông báo'}/>
            <View style={{
                height: 44,
                width: '100%'
            }}>
                <ScrollView horizontal={true}>
                    <FilterModalBottom
                        containerStyle={BaseStyles.flex1}
                        label="Employee.work_area"
                        options={[{
                            label: 'filter',
                            value: 'filter'
                        }]}
                        selectedValue={'filter'}
                        inputName="area"
                        onSelectOption={() => {}}
                        filtered={true}
                    />
                </ScrollView>
            </View>
            <FlatList
                removeClippedSubviews={true}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={getList}/>
                }
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => `${item}`}
                onEndReachedThreshold={0}
                onEndReached={handleLoadMore}
                ListFooterComponent={renderFooter}
            />
        </Container>
    );
});
