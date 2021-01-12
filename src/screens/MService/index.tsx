import React, {memo, useCallback, useMemo, useState} from 'react';
import {ScreenWrapper, SIcon, STextLabel} from '@/themes/BaseStyles';
import {HeaderBack} from '@/components/HeaderBack';
import {IC_ADD_USER, IC_EDIT} from '@/assets';
import {FlatGrid} from 'react-native-super-grid';
import {StyleSheet, Image, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {openModalCreateCustomer} from '@/utils/navigation';

const keyExtractor = (item: any): string => {
  return item;
};

const data = [
  'https://i.pinimg.com/236x/32/12/ab/3212ab1cf018468e4c40ef0dedcbd4f9.jpg',
  'https://scr.vn/wp-content/uploads/2020/07/%E1%BA%A2nh-%C4%91%C3%B4i-ng%C6%B0%E1%BB%9Di-th%E1%BA%ADt-H%C3%A0n-Qu%E1%BB%91c-d%E1%BB%85-th%C6%B0%C6%A1ng.jpg',
  'https://i.pinimg.com/564x/1b/d4/39/1bd43906ad769767f89d7179ec8ef409.jpg',
  'https://sohanews.sohacdn.com/2020/2/26/photo-1-158270587240769675748.jpg',
  'https://image.thanhnien.vn/660/uploaded/phunggiao/2017_07_28/khtk-loat-anh-gai-xinh-3_gngf.jpg',
  'https://sohanews.sohacdn.com/thumb_w/660/2019/6/15/6452688323798185556269305172593740669255680n-15605878881861712425133.jpg',
  'https://upanh123.com/wp-content/uploads/2020/10/Anh-gai-xinh-lam-anh-dai-dien-facebook1.jpg',
  'https://thuvienanh.net/wp-content/uploads/2020/09/T%E1%BB%95ng-h%E1%BB%A3p-h%C3%ACnh-%E1%BA%A3nh-g%C3%A1i-xinh-d%E1%BB%85-th%C6%B0%C6%A1ng-cute-nh%E1%BA%A5t-6-1.jpg',
];

export const MServiceScreen = memo(function MServiceScreen() {
  const rightHeader = useMemo(() => {
    return (
      <TouchableOpacity activeOpacity={0.6} onPress={openModalCreateCustomer}>
        <SIcon source={IC_ADD_USER} size={24} />
      </TouchableOpacity>
    );
  }, []);

  const renderItem = useCallback(({item}) => {
    return (
      <View>
        <FastImage
          style={styles.itemContainer}
          source={{
            uri: item,
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.normal,
          }}
          resizeMode={'cover'}
        />
      </View>
    );
  }, []);

  return (
    <ScreenWrapper>
      <HeaderBack title={'MService'} right={rightHeader} />
      <STextLabel>My Customer</STextLabel>
      <FlatGrid
        spacing={10}
        style={styles.gridView}
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </ScreenWrapper>
  );
});

const styles = StyleSheet.create({
  gridView: {
    flex: 1,
    marginLeft: 4,
    marginRight: 4,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    height: 120,
  },
});

export default MServiceScreen;
