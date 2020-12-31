import React, {memo, useCallback, useEffect, useState} from 'react';
import {HomeHeader} from '@/components/HomeHeader';
import styled from 'styled-components/native';
import {Colors} from '@/themes/Colors';

import {ActivityIndicator, Dimensions, FlatList, RefreshControl, View,} from 'react-native';
import {useCamera} from '@/store/camera';
import {navigateToDetailScreen,} from '@/utils/navigation';
import FastImage from 'react-native-fast-image';
import {useAsyncFn} from '@/hooks/useAsyncFn';
import {BaseStyles} from '@/themes/BaseStyles';
import {useUser} from '@/store/constant';
import ToastService from '@/services/ToastService';
import {InitOnesignal} from '@/components/InitOnesignal';
import {GetCameraListDefaultParams, GetCameraListParams, requestGetCameraList} from "@/store/camera/functions";
import {SearchBar} from "@/components/SearchBar";

const {width: DWidth} = Dimensions.get('window');

const ItemWidth = DWidth - 32;
const ItemHeight = 9/16 * ItemWidth;

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.black10};
`;

interface ItemProps {
    item: string;
    index: number;
}

const ItemContainer = styled.View`
  background-color: ${Colors.white};
  width: ${DWidth - 32}px;
  margin: 16px 16px 0 16px;
  border-radius: 12px;
`;

const ImageItem = styled(FastImage)`
  width: ${ItemWidth}px;
  height: ${ItemHeight}px;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  background-color: #273233;
`;
const ViewSearchBar = styled.View`
  height: 44px;
  margin-top: 12px;
  background-color: ${Colors.black10};
`;

const ItemContent = styled.TouchableOpacity`
  padding: 12px 16px;
`;
const Name = styled.Text`
  color: ${Colors.gray1};
  font-size: 18px;
  line-height: 21px;
  font-weight: bold;
`;

const Des = styled.Text`
  padding-top: 2px;
  color: ${Colors.gray3};
  font-size: 16px;
  line-height: 19px;
`;

const Price = styled.Text`
  color: ${Colors.red0};
  font-size: 15px;
  line-height: 18px;
  font-weight: bold;
  padding-top: 4px;
`;

const Item = memo(({item}: ItemProps) => {
    const product = useCamera(item);
    const open = useCallback(() => {
        navigateToDetailScreen({id: item});
    }, [item]);


    return (
        <ItemContainer style={BaseStyles.viewShadow}>
            <ImageItem
                resizeMode={'cover'}
                source={{uri: product?.avatar || ''}}
            />
            <ItemContent onPress={open}>
                    <Name numberOfLines={2}>{product?.name || ''}</Name>
                <Des numberOfLines={2}>{product?.company || ''}</Des>
                <View
                    style={{
                        flexDirection: 'row',
                    }}>
                    <Price>
                        Ip: {product?.ip || ''}
                    </Price>
                </View>
            </ItemContent>
        </ItemContainer>
    );
});

const keyExtractor = (item: any) => item.toString();

export const CameraScreen = memo(function HomeScreen() {
    const [state, setState] = useState<GetCameraListParams>(
        GetCameraListDefaultParams,
    );
    const [data, setData] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [loadingMore, setLoadingMore] = useState(false);
    const [textSearch, setTextSearch] = useState('');
    const user = useUser();

    const [{loading}, getList] = useAsyncFn(async () => {
        if (loading) {
            return;
        }
        const res = await requestGetCameraList({
            ...state
        });
        setTimeout(() => {
            if (!data.length || currentPage === 0) {
                setData(res);
            } else {
                setData([...new Set([...data, ...res])]);
            }
            setLoadingMore(false);
        }, 500);
        return data;
    }, [data, state, user, loadingMore, currentPage, textSearch]);

    useEffect(() => {
        getList().then();
    }, [currentPage]);

    const handleLoadMore = useCallback(() => {
        if (loadingMore || loading) {
            return;
        }
        setLoadingMore(true);
        setCurrentPage(currentPage + 1);
    }, [currentPage, loading, loadingMore, user]);


    const renderItem = useCallback(({item, index}) => {
        return <Item item={item} index={index}/>;
    }, []);

    const renderFooter = useCallback(() => {
        return loadingMore ? (
            <View
                style={{
                    width: '100%',
                    height: 150,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <ActivityIndicator size={'large'} color={Colors.gray1}/>
            </View>
        ) : null;
    }, [loadingMore]);

    return (
        <Container>
            <InitOnesignal/>

            <View>
                <HomeHeader/>
            </View>
            <ViewSearchBar>
                <SearchBar
                    value={textSearch}
                    onEndEditing={getList}
                    containerStyle={{
                        backgroundColor: Colors.gray5
                    }}
                    onSearchTextChange={setTextSearch} />
            </ViewSearchBar>
            <FlatList
                removeClippedSubviews={true}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={getList}/>
                }
                extraData={textSearch}
                data={data}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                onEndReachedThreshold={1}
                onEndReached={handleLoadMore}
                ListFooterComponent={renderFooter}
            />
        </Container>
    );
});
