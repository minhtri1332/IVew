import React, {memo, useCallback} from 'react';
import {styled} from '@/global';
import {Colors} from '@/themes/Colors';
import {SIcon} from '@/themes/BaseStyles';
import {IC_Multi_IMAGE, IC_SINGLE_IMAGE} from '@/assets';
import {FlatList, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const option = {
  mediaType: 'photo',
  quality: 1,
};

export const PickImageModalComponent = memo(function PickImageModalComponent() {
  const renderItem = useCallback(({item: number}: any) => {
    return (
      <FastImage
        style={{height: 70, width: 70, borderRadius: 4, marginLeft: 8}}
        source={{
          uri: 'https://unsplash.it/400/400?image=1',
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
        <FlatList horizontal={true} data={[1, 2, 3]} renderItem={renderItem} />
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
