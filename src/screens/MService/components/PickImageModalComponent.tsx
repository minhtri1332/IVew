import React, {memo, useCallback} from 'react';
import {styled} from '@/global';
import {Colors} from '@/themes/Colors';
import {SIcon} from '@/themes/BaseStyles';
import {IC_Multi_IMAGE, IC_SINGLE_IMAGE} from '@/assets';
import {FlatList, View} from 'react-native';
import FastImage from 'react-native-fast-image';
// @ts-ignore
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const option = {
  mediaType: 'photo',
  quality: 1,
};

const data = [
  'https://i.pinimg.com/236x/32/12/ab/3212ab1cf018468e4c40ef0dedcbd4f9.jpg',
  'https://scr.vn/wp-content/uploads/2020/07/%E1%BA%A2nh-%C4%91%C3%B4i-ng%C6%B0%E1%BB%9Di-th%E1%BA%ADt-H%C3%A0n-Qu%E1%BB%91c-d%E1%BB%85-th%C6%B0%C6%A1ng.jpg',
  'https://i.pinimg.com/564x/1b/d4/39/1bd43906ad769767f89d7179ec8ef409.jpg',
];

export const PickImageModalComponent = memo(function PickImageModalComponent() {
  const renderItem = useCallback(({item}: any) => {
    return (
      <FastImage
        style={{height: 70, width: 70, borderRadius: 4, marginLeft: 8}}
        source={{
          uri: item,
          headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
    );
  }, []);

  const pickAvatar = useCallback(() => {
    launchImageLibrary(option, () => {});
  }, []);

  return (
    <SViewContainer>
      <SViewAvatar onPress={pickAvatar}>
        <SIcon source={IC_SINGLE_IMAGE} tintColor={Colors.grey3} />
        <SText>Thêm ảnh đại diện</SText>
      </SViewAvatar>

      <SViewMoreImage horizontal={true}>
        <SView>
          <SIcon source={IC_Multi_IMAGE} tintColor={Colors.grey3} />
          <STextSmall>Thêm ảnh</STextSmall>
        </SView>
        <FlatList horizontal={true} data={data} renderItem={renderItem} />
      </SViewMoreImage>
    </SViewContainer>
  );
});

const SText = styled.Text`
  text-align: center;
  font-size: 13px;
  margin: 0px 16px;
  color: ${Colors.grey4};
`;

const STextSmall = styled.Text`
  text-align: center;
  font-size: 13px;
  margin: 0px 4px;
  color: ${Colors.grey4};
`;
const SViewContainer = styled.View``;

const SViewMoreImage = styled.ScrollView`
  margin-left: 16px;
`;

const SViewAvatar = styled.TouchableOpacity`
  height: 120px;
  width: 120px;
  border-width: 1px;
  border-color: ${Colors.grey4};
  align-self: center;
  justify-content: center;
  align-items: center;
  margin: 16px;
  border-radius: 4px;
`;

const SView = styled.View`
  height: 70px;
  width: 70px;
  border-width: 1px;
  border-color: ${Colors.grey4};
  align-self: center;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;

export default PickImageModalComponent;
