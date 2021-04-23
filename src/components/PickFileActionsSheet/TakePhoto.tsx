import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {RNCamera} from 'react-native-camera';
import {
  Animated,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FileType} from '@/types';
import {useToggle} from '@/hooks/useToggle';
import {PhotoPreview} from '@/components/PickFileActionsSheet/PhotoPreview';
import {IC_CAMERA} from '@/assets';

interface Props {
  onCloseRequest: () => any;
  onFilePicked: (files: FileType[]) => any;
  onPickFileError?: (error: any) => void;
}

export const TakePhoto = memo(
  ({onCloseRequest, onFilePicked, onPickFileError}: Props) => {
    const camera = useRef<RNCamera>(null);

    const anim = useRef<Animated.Value>(new Animated.Value(1));

    const [fileType, setFileType] = useState<FileType | undefined>(undefined);

    const [isBack, toggleIsBack] = useToggle(true);

    useEffect(() => {
      Animated.timing(anim.current, {
        toValue: fileType ? 0 : 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, [fileType]);

    const onRetry = useCallback(() => {
      if (camera.current) camera.current.resumePreview();
      setFileType(undefined);
    }, [camera, setFileType]);

    const onOk = useCallback(
      (fileType: FileType) => {
        setFileType(undefined);
        onFilePicked([fileType]);
        onCloseRequest();
      },
      [setFileType, onFilePicked],
    );

    const takePicture = useCallback(async () => {
      const options = {pauseAfterCapture: true, width: 1080};
      if (!!camera.current) {
        try {
          const data = await camera.current.takePictureAsync(options);
          const uri = data.uri || '';
          const fileType: FileType = {
            name: extractFileNameFromPath(uri),
            size: '',
            type: 'image/jpeg',
            uri,
          };
          setFileType(fileType);
        } catch (error) {
          onPickFileError && onPickFileError(error);
          onCloseRequest();
        }
      }
    }, [isBack, camera, setFileType, onPickFileError]);

    return (
      <View style={styles.container}>
        <RNCamera
          ref={camera}
          style={styles.preview}
          type={
            isBack
              ? RNCamera.Constants.Type.back
              : RNCamera.Constants.Type.front
          }
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
        <Animated.View style={[styles.footer, {opacity: anim.current}]}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onCloseRequest}>
            <Text style={styles.buttonText}>Hủy</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={takePicture} style={styles.capture}>
            <View style={styles.circle} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.flipButton} onPress={toggleIsBack}>
            <Image
              resizeMode="contain"
              style={styles.flipIcon}
              source={IC_CAMERA}
            />
          </TouchableOpacity>
        </Animated.View>
        <PhotoPreview file={fileType} onRetry={onRetry} onOk={onOk} />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  footer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 100,
  },
  capture: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    alignSelf: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  circle: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
  },
  flipButton: {
    position: 'absolute',
    right: 16,
    alignSelf: 'center',
  },
  flipIcon: {
    width: 40,
    height: 40,
    tintColor: '#FFFFFF',
  },
  cancelButton: {
    alignSelf: 'center',
    position: 'absolute',
    left: 0,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
});

const extractFileNameFromPath = (path: string) => {
  const splitFromPath = /\w+.\w+$/.exec(path);
  return splitFromPath && splitFromPath[0]
    ? splitFromPath[0]
    : Math.random().toString(36).substring(2) + '.jpg';
};
