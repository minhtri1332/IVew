import React, {memo, useCallback, useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {HeaderBack} from '@/components/HeaderBack';
import {styled} from '@/global';
import {useNavigationParams} from '@/hooks/useNavigationParams';
import ImageEditor from '@react-native-community/image-editor';
import {IC_EMPTY_IMAGE_DETECT} from '@/assets';
import SubmitButtonColor from '@/components/button/ButtonSubmit';
import {navigateToFaceDetectScreen} from '@/utils/navigation';
import {Colors} from '@/themes/Colors';
import {launchImageLibrary} from 'react-native-image-picker';
import {FaceDetector} from 'react-native-camera';
import File from '@/utils/file';

const {width: DWidth, height: DHeight} = Dimensions.get('window');
export interface FaceDetectScreenProps {
  faces: any[];
  imageUri: string;
  width:number;
  height:number;
}

const option = {
  mediaType: 'photo',
  quality: 1,
};

export const FaceDetectScreen = memo(function FaceDetectScreen() {
  const {faces, imageUri, height, width} = useNavigationParams<FaceDetectScreenProps>();
  const [listFaceDetect, setListFaceDetect] = useState('');
  const [userPending, setUserPending] = useState<Set<string>>(() => {
    return new Set([]);
  });

  const [paramFaceDetect, setParamFaceDetect] = useState<
    FaceDetectScreenProps
    >(() => ({
    faces: [],
    imageUri:'',
    width:0,
    height:0
  }));

  const setParamCustom = (name: string, value: any) => {
    console.log(value);
    setParamFaceDetect((state) => ({...state, [name]: value}));
  };

  useEffect(() => {
    setParamCustom("faces", faces);
    setParamCustom("imageUri", imageUri);
    setParamCustom("width", width);
    setParamCustom("height", height);
    cropImageFace();
  }, [faces, imageUri, height, width]);

  const cropImageFace = useCallback(
    () => {

      imageUri && faces.map((item, index) => {
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
        ImageEditor.cropImage(imageUri, cropData).then(url => {
          setUserPending((set) => {
            const newSet = new Set(set);
            newSet.has(url) ? newSet.delete(url) : newSet.add(url);
            return newSet;
          });

          setListFaceDetect(url)
        });
      });
    },
    [paramFaceDetect.imageUri, paramFaceDetect.faces, paramFaceDetect.width, paramFaceDetect.height,faces],
  );


  const takePicture = useCallback(
    () => {
      navigateToFaceDetectScreen()
    },
    [],
  );

    const takePictureLibrary = useCallback(
    async () => {
      const file = await File.pickImage({multiple: false} || {});
      const faces = await FaceDetector.detectFacesAsync(file[0].uri)
      setParamCustom("faces", faces);
      setParamCustom("imageUri", file[0].uri);
      setParamCustom("width", file[0].width);
      setParamCustom("height", file[0].height);

    },
    [],
  );


  return (
    <View style={styles.container}>
      <HeaderBack title={'Detect'}/>
      <SViewImage>
        <SImage source={imageUri ?{uri:paramFaceDetect.imageUri}:IC_EMPTY_IMAGE_DETECT} resizeMode={'contain'}/>
      </SViewImage>

      <SViewButton>
        <SButton title={'Chụp ảnh'} onPress={takePicture} />
        <SButton title={'Chọn ảnh'} onPress={takePictureLibrary} />
      </SViewButton>

      <SText>Face detected</SText>

      <SScrollView>
        {listFaceDetect !=""&& <SImageFace source={{uri: listFaceDetect}} resizeMode={'contain'}/>}
      </SScrollView>

    </View>
  );
});

const SButton = styled(SubmitButtonColor)`
  margin-top: 24px;
  padding: 0px 16px;
`;

const SText = styled.Text`
background-color: ${Colors.grey7};
margin-left: 16px;
`

const SViewImage = styled.View`
flex:8;
padding-bottom: 16px;
padding-top: 16px;
align-self: center;
justify-content: center;
`

const SViewButton = styled.View`
justify-content: center;
flex-direction: row;
background-color: ${Colors.grey7};
width: 100%;
`

const SImageFace = styled.Image`
width: 100px;
height: 100px;
border-radius: 4px;
align-self: center;
`

const SImage = styled.Image`
height: 350px;
width: 350px;
border-radius: 4px;
`
const SScrollView = styled.ScrollView`
height: 70px;
background-color: ${Colors.grey7};
`
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",

  },
});
