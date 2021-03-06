import React, {memo, useCallback} from 'react';
import {PickFileContentProps} from './types';
import {TakePhoto} from './TakePhoto';
import Modal from 'react-native-modal';
import {Dimensions, PermissionsAndroid, Platform, View} from 'react-native';
import {styled} from '@/global';
import useBoolean from '@/hooks/useBoolean';
import {ActionSheetRow} from '@/components/PickFileActionsSheet/ActionSheet';
import {useDeviceOrientation} from '@react-native-community/hooks';
import {getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper';
import {IC_CAMERA_PICK, IC_GALLERY} from '@/assets';
import File from '@/utils/file';

const dims = Dimensions.get('screen');
let screenWidth = dims.width;
let screenHeight = dims.height;
const [shortDimension, longDimension] =
  screenWidth < screenHeight
    ? [screenWidth, screenHeight]
    : [screenHeight, screenWidth];

const ModalContentContainer = (props: any) => {
  const orientation = useDeviceOrientation();
  return <Container {...props} portrait={orientation.portrait} />;
};
const Container = styled.View<{portrait: boolean}>`
  padding-bottom: ${(props: any) =>
    props.portrait ? 15 + getBottomSpace() / 2 : 15}px;
  max-height: ${(props: any) =>
    props.portrait
      ? longDimension - getStatusBarHeight(true) - 44
      : shortDimension}px;
`;

const SWrapper = styled(Modal)`
  margin: 0;
`;

const SContainer = styled(ModalContentContainer)`
  background-color: black;
  width: 100%;
  height: 100%;
`;

const PickFileContent = memo(
  ({
    onFilePicked,
    pickFileOptions,
    pickImageOptions,
    takeCameraOptions,
    includeTakeCamera = true,
    includePickFile = true,
    onPressDetect,
  }: PickFileContentProps) => {
    const [visible, setVisibleTrue, setVisibleFalse] = useBoolean(false);

    const onPressTakeCameraAndroid = useCallback(async () => {
      if (!onPressDetect) {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
        await requestWriteStoragePermission();
        setVisibleTrue();
      } else {
        onPressDetect();
      }
    }, [onPressDetect]);

    const onPressTakeCamera = useCallback(async () => {
      if (!onPressDetect) {
        const files = await File.takeCamera(takeCameraOptions || {});
        onFilePicked(files);
      } else {
        onPressDetect();
      }
    }, [onFilePicked, onPressDetect]);

    const onSelectFromGallery = useCallback(async () => {
      const files = await File.pickImage(pickImageOptions || {});
      onFilePicked(files);
    }, [onFilePicked]);

    const onPickFile = useCallback(async () => {
      const files = await File.pick({
        multiple: true,
        ...(pickFileOptions || {}),
      });

      onFilePicked(files);
    }, [onFilePicked]);

    return (
      <>
        {!!includeTakeCamera && (
          <ActionSheetRow
            onPress={
              Platform.OS === 'android'
                ? onPressTakeCameraAndroid
                : onPressTakeCamera
            }
            iconName={IC_CAMERA_PICK}
            text={'Chụp ảnh'}
          />
        )}
        <ActionSheetRow
          onPress={onSelectFromGallery}
          iconName={IC_GALLERY}
          text={'Chọn ảnh'}
        />

        <View style={{height: 40}} />
        {/*{!!includePickFile && (*/}
        {/*  <ActionSheetRow*/}
        {/*    onPress={onPickFile}*/}
        {/*    iconName={IC_EDIT}*/}
        {/*    text={'Chọn file'}*/}
        {/*  />*/}
        {/*)}*/}
        {Platform.OS === 'android' && (
          <SWrapper
            isVisible={visible}
            onDismiss={setVisibleFalse}
            onBackdropPress={setVisibleFalse}
            onBackButtonPress={setVisibleFalse}
            animationIn="fadeIn"
            animationOut="fadeOut"
            backdropTransitionOutTiming={0}
            avoidKeyboard={true}>
            <SContainer>
              <TakePhoto
                onCloseRequest={setVisibleFalse}
                onFilePicked={onFilePicked}
              />
            </SContainer>
          </SWrapper>
        )}
      </>
    );
  },
);

PickFileContent.displayName = 'PickFileContent';

export default PickFileContent;

const requestWriteStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Download Files Permission',
        message: 'Base Wework needs permission to download files',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
  } catch (err) {}
};
