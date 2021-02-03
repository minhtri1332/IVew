import React, {memo, useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, View} from 'react-native';
import {HeaderBack} from '@/components/HeaderBack';
import {styled} from '@/global';
import {useNavigationParams} from '@/hooks/useNavigationParams';
import ImageEditor from '@react-native-community/image-editor';
import {IC_EMPTY_IMAGE_DETECT} from '@/assets';
import SubmitButtonColor from '@/components/button/ButtonSubmit';
import {navigateToFaceDetectScreen} from '@/utils/navigation';
import {Colors} from '@/themes/Colors';
import {RNCamera, FaceDetector} from 'react-native-camera';
import File from '@/utils/file';
import useBoolean from '@/hooks/useBoolean';
import {useAsyncFn} from '@/hooks/useAsyncFn';
import {requestTransformFile} from '@/store/MScan/functions';
import RNFetchBlob from 'rn-fetch-blob';
import {requestAddEmployee} from '@/store/faceDetect/function';

const {width: DWidth, height: DHeight} = Dimensions.get('window');
export interface FaceDetectScreenProps {
  faces: any[];
  imageUri: string;
  width: number;
  height: number;
}

export interface ParamEmployee {
  department: string;
  name: string;
  position: string;
  listBoxAI: string[];
  avatar: string;
  image: string;
}

export const FaceDetectScreen = memo(function FaceDetectScreen() {
  const {
    faces,
    imageUri,
    height,
    width,
  } = useNavigationParams<FaceDetectScreenProps>();
  const [listFaceDetect, setListFaceDetect] = useState('');
  const [imageShow, setImageShow] = useState(imageUri);
  const [isLoading, loadingTrue, loadingFalse] = useBoolean();
  const [paramEmployee, setParamEmployee] = useState<ParamEmployee>(() => ({
    name: 'tri',
    position: 'dev',
    listBoxAI: ['123'],
    department: 'home',
    avatar: '',
    image: '',
  }));

  const setParamCustom = (name: string, value: any) => {
    setParamEmployee((state) => ({...state, [name]: value}));
  };

  useEffect(() => {
    setListFaceDetect('');
    setImageShow(imageUri);
    RNFetchBlob.fs.readFile(imageUri, 'base64').then((data) => {
      setParamCustom('avatar', data);
    });
    cropImageFace(faces, imageUri, width, height);
  }, [faces, imageUri, height, width]);

  const cropImageFace = useCallback((faces, imageUri, width, height) => {
    imageUri &&
      faces.map((item: any, index: number) => {
        const ratioWidth = item.bounds.size.width / DWidth;
        const ratioHeight = item.bounds.size.height / DHeight;
        const offsetX = item.bounds.origin.x / DWidth;
        const offsetY = item.bounds.origin.y / DHeight;

        const cropData = {
          offset: {x: offsetX * width, y: offsetY * height},
          size: {width: ratioWidth * width, height: ratioHeight * height},
          resizeMode: 'contain',
        };

        // @ts-ignore
        ImageEditor.cropImage(imageUri, cropData).then((url) => {
          setListFaceDetect(url);
          RNFetchBlob.fs.readFile(url, 'base64').then((data) => {
            setParamCustom('image', data);
          });
        });
      });
  }, []);

  const cropImagePickerFace = useCallback((faces, imageUri, width, height) => {
    RNFetchBlob.fs.readFile(imageUri, 'base64').then((data) => {
      setParamCustom('avatar', data);
    });
    imageUri &&
      faces.map((item: any, index: number) => {
        const ratioWidth = item.bounds.size.width / 8 / DWidth;
        const ratioHeight = item.bounds.size.height / 8 / DHeight;
        const offsetX = item.bounds.origin.x / 8 / DWidth;
        const offsetY = item.bounds.origin.y / 8 / DHeight;

        const cropData = {
          offset: {x: offsetX * width, y: offsetY * height},
          size: {width: ratioWidth * width, height: ratioHeight * height},
          resizeMode: 'contain',
        };
        console.log('cropData', cropData);

        loadingTrue();
        // @ts-ignore
        ImageEditor.cropImage(imageUri, cropData).then((url) => {
          RNFetchBlob.fs.readFile(url, 'base64').then((data) => {
            setParamCustom('image', data);
          });
          setListFaceDetect(url);
          loadingFalse();
        });
      });
  }, []);

  const takePicture = useCallback(() => {
    navigateToFaceDetectScreen();
  }, []);

  const takePictureLibrary = useCallback(async () => {
    const options = {
      mode: FaceDetector.Constants.Mode.fast,
    };
    const file = await File.pickImage({multiple: false} || {});
    setImageShow(file[0].uri);
    setListFaceDetect('');
    loadingTrue();
    RNFetchBlob.fs.readFile(file[0].uri, 'base64').then((data) => {
      setParamCustom('image', data);
    });
    const cropData = {
      offset: {x: file[0].width, y: file[0].height},
      size: {width: file[0].width, height: file[0].height},
      resizeMode: 'contain',
    };
    // @ts-ignore
    ImageEditor.cropImage(file[0].uri, cropData).then((url) => {
      console.log('1', file);
      await FaceDetector.detectFacesAsync(url, options).then((res) => {
        if (res.faces.length > 0) {
          cropImagePickerFace(res.faces, url, file[0].width, file[0].height);
        } else {
          console.log('No faces: ');
        }
        loadingFalse();
      });
    });
  }, []);

  const [{loading}, requestData] = useAsyncFn(async () => {
    await requestAddEmployee(paramEmployee);
  }, [paramEmployee]);

  return (
    <View style={styles.container}>
      <HeaderBack title={'Detect'} />
      <SViewImage>
        <SImage
          source={imageShow ? {uri: imageShow} : IC_EMPTY_IMAGE_DETECT}
          resizeMode={'contain'}
        />
      </SViewImage>

      <SViewBottom>
        <SViewButton>
          <SButton title={'Chụp ảnh'} onPress={takePicture} />
          <SButton title={'Chọn ảnh'} onPress={takePictureLibrary} />
          <SButton title={'Gửi'} onPress={requestData} />
        </SViewButton>

        <SText>Face detected</SText>

        <SScrollView>
          {listFaceDetect != '' && (
            <SImageFace source={{uri: listFaceDetect}} resizeMode={'contain'} />
          )}
        </SScrollView>

        {isLoading && (
          <ActivityIndicator
            style={{
              flex: 1,
              justifyContent: 'center',
              alignSelf: 'center',
              paddingBottom: 20,
            }}
            color={'red'}
            size={'large'}
          />
        )}
      </SViewBottom>
    </View>
  );
});

const SViewBottom = styled.View`
  flex: 4;
  width: 100%;
  padding-bottom: 16px;
  background-color: ${Colors.grey7};
  justify-content: center;
`;

const SButton = styled(SubmitButtonColor)`
  margin-top: 24px;
  padding: 0px 16px;
`;

const SText = styled.Text`
  margin-left: 16px;
`;

const SViewImage = styled.View`
  flex: 7;
  padding-bottom: 16px;
  padding-top: 16px;
  align-self: center;
  justify-content: center;
`;

const SViewButton = styled.View`
  justify-content: center;
  flex-direction: row;
`;

const SImageFace = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 4px;
  align-self: center;
`;

const SImage = styled.Image`
  height: 350px;
  width: 350px;
  border-radius: 4px;
`;
const SScrollView = styled.ScrollView``;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});
