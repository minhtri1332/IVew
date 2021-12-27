import React, {memo, useCallback, useEffect, useState} from 'react';
import {styled} from '@/global';
import {Colors} from '@/themes/Colors';
// @ts-ignore
import RNFetchBlob from 'rn-fetch-blob';
import {IC_SINGLE_IMAGE} from '@/assets';
import PickFileActionsSheet from '@/components/PickFileActionsSheet';
import {takeCameraOptions} from '@/screens/Customer/Modal/ModalCreateCustomer';
import useBoolean from '@/hooks/useBoolean';
import {FileType} from '@/types';

interface ImageParams {
  onImageCallback: (keyName: string, value: any) => void;
  imageDefault?: string;
}

export const PickImageModalComponent = memo(function PickImageModalComponent({
  onImageCallback,
  imageDefault,
}: ImageParams) {
  const [avatar, setAvatar] = useState(imageDefault);
  const [isFilePickerVisible, showFilePicker, hideFilePicker] = useBoolean();
  useEffect(() => {
    setAvatar(imageDefault);
  }, [imageDefault]);

  const fileCallback = useCallback(
    (files: FileType[]) => {
      RNFetchBlob.fs.readFile(files[0].uri, 'base64').then((data) => {
        onImageCallback('image', `data:image/jpeg;base64,${data}`);
        setAvatar(files[0].uri);
      });
      hideFilePicker();
    },
    [onImageCallback],
  );

  return (
    <SViewContainer>
      <SViewAvatar onPress={showFilePicker}>
        <SImage
          source={avatar === '' ? IC_SINGLE_IMAGE : {uri: avatar}}
          resizeMode={'cover'}
          size={avatar === '' ? 24 : 120}
        />
        {avatar === '' && <SText>Thêm ảnh đại diện</SText>}
      </SViewAvatar>

      <PickFileActionsSheet
        isVisible={isFilePickerVisible}
        onCloseRequest={hideFilePicker}
        onFilePicked={fileCallback}
        pickFileOptions={{multiple: false}}
        pickImageOptions={{multiple: false}}
        takeCameraOptions={takeCameraOptions}
        includeTakeCamera={true}
      />
    </SViewContainer>
  );
});

export const SImage = styled.Image<{size?: number; tintColor?: string}>`
  width: ${(props: any) => props.size || 24};
  height: ${(props: any) => props.size || 24};
  border-radius: 4px;
`;

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
