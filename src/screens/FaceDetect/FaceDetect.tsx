import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {HeaderBack} from '@/components/HeaderBack';
import {styled} from '@/global';
import {useNavigationParams} from '@/hooks/useNavigationParams';
import ImageEditor from '@react-native-community/image-editor';
import {IC_ADD_USER, IC_DETECT_FACE, IC_EMPTY_IMAGE_DETECT} from '@/assets';
import SubmitButtonColor from '@/components/button/ButtonSubmit';
import {
  goBack,
  navigateToFaceDetectScreen,
  openModalCreateCustomer,
} from '@/utils/navigation';
import {Colors} from '@/themes/Colors';
import {FaceDetector} from 'react-native-camera';
import File from '@/utils/file';
import useBoolean from '@/hooks/useBoolean';
import {useAsyncFn} from '@/hooks/useAsyncFn';
import ImageResizer from 'react-native-image-resizer';
import RNFetchBlob from 'rn-fetch-blob';
import {requestAddEmployee} from '@/store/faceDetect/function';
import ToastService from '@/services/ToastService';
import {ItemFace} from '@/screens/FaceDetect/ItemFace';
import {InputBorder} from '@/components/InputBorder';
import {SIcon} from '@/themes/BaseStyles';
import ButtonText from '@/components/button/ButtonText';

const {width: DWidth, height: DHeight} = Dimensions.get('window');


const CameraWidth = DWidth;
const CameraHeight = 4 / 3 * DWidth;


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
  const [imageShow, setImageShow] = useState(imageUri);
  const [myFace, setMyFace] = useState('');
  const [isLoading, loadingTrue, loadingFalse] = useBoolean();
  const [listFaceDetect, setListFaceDetect] = useState<Set<string>>(() => {
    return new Set([]);
  });
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
    setImageShow(imageUri);
    setListFaceDetect(() => {
      return new Set([]);
    });
    RNFetchBlob.fs.readFile(imageUri, 'base64').then((data) => {
      setParamCustom('avatar', data);
    });
    cropImageFace(faces, imageUri, width, height);
  }, [faces, imageUri, height, width]);

  const cropImageFace = useCallback((faces, imageUri, width, height) => {
    imageUri &&
      faces.map((item: any, index: number) => {
        const ratioWidth = item.bounds.size.width / CameraWidth;
        const ratioHeight = item.bounds.size.height / CameraHeight;
        const offsetX = item.bounds.origin.x / CameraWidth;
        const offsetY = item.bounds.origin.y / CameraHeight;

        const OX = offsetX * width > 0 ? offsetX * width : 0;
        const OY = offsetY * height > 0 ? offsetY * height : 0;

        const SW = ratioWidth * width > 0 ? ratioWidth * width : 0;
        const SY = ratioHeight * height > 0 ? ratioHeight * height : 0;

        const cropData = {
          offset: {x: OX, y: OY},
          size: {width: SW, height: SY},
          resizeMode: 'cover',
        };

        // @ts-ignore
        ImageEditor.cropImage(imageUri, cropData).then((url) => {
          setListFaceDetect((set) => {
            const newSet = new Set(set);
            newSet.has(url) ? newSet.delete(url) : newSet.add(url);
            return newSet;
          });
          RNFetchBlob.fs.readFile(url, 'base64').then((data) => {
            setParamCustom('image', data);
            setMyFace(url);
          });
        });
      });
  }, []);

  const cropImagePickerFace = useCallback((faces, imageUri, width, height) => {
    setListFaceDetect(() => {
      return new Set([]);
    });
    RNFetchBlob.fs.readFile(imageUri, 'base64').then((data) => {
      setParamCustom('avatar', data);
    });
    imageUri &&
      faces.map((item: any, index: number) => {
        const size = item.bounds.size.width > DWidth ? 8 : 1;
        const ratioWidth = item.bounds.size.width / size / DWidth;
        const ratioHeight = item.bounds.size.height / size / DHeight;
        const offsetX = item.bounds.origin.x / size / DWidth;
        const offsetY = item.bounds.origin.y / size / DHeight;

        const OX = offsetX * width > 0 ? offsetX * width : 0;
        const OY = offsetY * height > 0 ? offsetY * height : 0;
        const SW = ratioWidth * width > 0 ? ratioWidth * width : 0;
        const SY = ratioHeight * height > 0 ? ratioHeight * height : 0;

        const cropData = {
          offset: {x: OX, y: OY},
          size: {width: SW, height: SY},
          resizeMode: 'contain',
        };


        loadingTrue();
        // @ts-ignore
        ImageEditor.cropImage(imageUri, cropData).then((url) => {
          RNFetchBlob.fs.readFile(url, 'base64').then((data) => {
            setParamCustom('image', data);
            setMyFace(url);
          });
          setListFaceDetect((set) => {
            const newSet = new Set(set);
            newSet.has(url) ? newSet.delete(url) : newSet.add(url);
            return newSet;
          });
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

    loadingTrue();
    RNFetchBlob.fs.readFile(file[0].uri, 'base64').then((data) => {
      setParamCustom('image', data);
      setMyFace(url);
    });

    ImageResizer.createResizedImage(
      file[0].uri,
      file[0].width - 10,
      file[0].height - 10,
      'JPEG',
      0.01,
      0,
      undefined,
      false,
      {onlyScaleDown: true},
    ).then((response) => {
        FaceDetector.detectFacesAsync(response.uri, options).then((res) => {
          if (res.faces.length > 0) {
            cropImagePickerFace(
              res.faces,
              file[0].uri,
              file[0].width,
              file[0].height,
            );
          } else {
            console.log('No faces: ');
          }
          loadingFalse();
        });
      })
      .catch((err) => {
        // Oops, something went wrong. Check that the filename is correct and
        // inspect err to get more details.
      });
  }, []);

  const [{loading}, requestData] = useAsyncFn(async () => {
    await requestAddEmployee(paramEmployee);
    ToastService.show('Success!');
    goBack();
  }, [paramEmployee]);

  const onPressImage = useCallback(
    (value: string) => {
      setMyFace(value);
      RNFetchBlob.fs.readFile(value, 'base64').then((data) => {
        setParamCustom('image', data);
      });
    },
    [setParamCustom],
  );

  const rightHeader = useMemo(() => {
    return (
      <ButtonText
        color={Colors.white}
        title={'Lưu'}
        onPress={requestData}
        loading={loading}
      />
    );
  }, [loading]);

  // @ts-ignore
  const renderFace = ({bounds, faceID, rollAngle, yawAngle}) => (
    <View
      key={faceID}
      transform={[
        {perspective: 600},
        {rotateZ: `${rollAngle.toFixed(0)}deg`},
        {rotateY: `${yawAngle.toFixed(0)}deg`},
      ]}
      style={[
        styles.face,
        {
          ...bounds.size,
          left: bounds.origin.x,
          top: bounds.origin.y,
        },
      ]}>
      {/*<Text style={styles.faceText}>ID: {faceID}</Text>*/}
      {/*<Text style={styles.faceText}>rollAngle: {rollAngle.toFixed(0)}</Text>*/}
      {/*<Text style={styles.faceText}>yawAngle: {yawAngle.toFixed(0)}</Text>*/}
    </View>
  );

  return (
    <View style={styles.container}>
      <HeaderBack title={'Detect'} right={rightHeader} />
      <ScrollView>
        <SViewImage>
          <SImage
            source={imageShow ? {uri: imageShow} : IC_DETECT_FACE}
            resizeMode={'cover'}
          />
        </SViewImage>

        {!isLoading && (
          <SScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {[...listFaceDetect].map((item) => {
              return (
                <ItemFace
                  uri={item}
                  onPress={onPressImage}
                  isCheck={myFace == item}
                />
              );
            })}
          </SScrollView>
        )}

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

        <SViewButton>
          {!loading && (
            <View style={{flexDirection: 'row'}}>
              <SButton title={'Chụp ảnh'} onPress={takePicture} />
              <SButton title={'Chọn ảnh'} onPress={takePictureLibrary} />
            </View>
          )}
        </SViewButton>

        <SInputBorder
          value={paramEmployee.name}
          keyName={'name'}
          onTextChange={setParamCustom}
          placeHolder={'Họ tên'}
          required={true}
        />

        <SInputBorder
          value={paramEmployee.position}
          keyName={'position'}
          onTextChange={setParamCustom}
          placeHolder={'Vị trí'}
          required={false}
        />

        <SInputBorder
          value={paramEmployee.department}
          keyName={'department'}
          onTextChange={setParamCustom}
          placeHolder={'Phòng ban'}
          required={true}
        />
      </ScrollView>
    </View>
  );
});

const SInputBorder = styled(InputBorder).attrs({
  containerStyle: {
    marginTop: 16,
    marginRight: 16,
    marginLeft: 16,
  },
})``;

const SViewBottom = styled.View`
  width: 100%;
  justify-content: center;
`;

const SButton = styled(SubmitButtonColor)`
  margin-top: 24px;
  padding: 0px 16px;
`;

const SViewImage = styled.View`
  padding-bottom: 16px;
  padding-top: 16px;
  align-self: center;
  justify-content: center;
`;

const SViewButton = styled.View`
  justify-content: center;
  flex-direction: row;
`;

const SImage = styled.Image`
  height: 120px;
  width: 120px;
  border-radius: 4px;
`;
const SScrollView = styled.ScrollView`
  width: 100%;
  padding: 0px 16px;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: Colors.white,
  },
  face: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: Colors.red1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});
