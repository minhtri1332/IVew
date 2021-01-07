import React, {memo, useCallback, useMemo, useState} from 'react';
import {ScreenWrapper, SIcon, STextLabel} from '@/themes/BaseStyles';
import {HeaderBack} from '@/components/HeaderBack';
import {IC_ADD_USER, IC_EDIT} from '@/assets';
import {FlatGrid} from 'react-native-super-grid';
import {Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {openModalCreateCustomer} from '@/utils/navigation';

const keyExtractor = (item: any): string => {
  return item;
};

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
   style={{justifyContent: 'flex-end',
     borderRadius: 5,
     height: 100}}
          source={{
            uri: 'https://unsplash.it/400/400?image=1',
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
    );
  }, []);

  return (
    <ScreenWrapper>
      <HeaderBack title={'MService'} right={rightHeader} />
      <STextLabel>My Customer</STextLabel>
      <FlatGrid
        fixed={true}
        itemDimension={100}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </ScreenWrapper>
  );
});

export default MServiceScreen;
