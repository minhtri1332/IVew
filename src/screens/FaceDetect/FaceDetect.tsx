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
import {RNCamera,FaceDetector} from 'react-native-camera';
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
  const [imageShow, setImageShow] = useState(imageUri);

  useEffect(() => {
    setImageShow(imageUri)
    cropImageFace(faces, imageUri, width, height);
  }, [faces, imageUri, height, width]);

  const cropImageFace = useCallback(
    (faces, imageUri, width, height) => {
      console.log("start crop",faces );
     imageUri && faces.map((item: any, index: number) => {

        const ratioWidth = item.bounds.size.width / DWidth;
        const ratioHeight = item.bounds.size.height / DHeight;
        const offsetX = item.bounds.origin.x / DWidth;
        const offsetY = item.bounds.origin.y / DHeight;

        const cropData = {
          offset: {x: offsetX * width, y: offsetY * height},
          size: {width: ratioWidth * width, height: ratioHeight * height},
          resizeMode: 'contain',
        };
       console.log("as", cropData);
        // @ts-ignore
        ImageEditor.cropImage(imageUri, cropData).then(url => {
          setUserPending((set) => {
            const newSet = new Set(set);
            newSet.has(url) ? newSet.delete(url) : newSet.add(url);
            return newSet;
          });
          console.log("cropImage", url);
          setListFaceDetect(url)
        });
      });
    },
    [],
  );


  const takePicture = useCallback(
    () => {
      navigateToFaceDetectScreen()
    },
    [],
  );

    const takePictureLibrary = useCallback(
    async () => {
      const options = { mode: FaceDetector.Constants.Mode.fast, runClassifications: RNCamera.Constants.FaceDetection.Classifications.all };
      const file = await File.pickImage({multiple: false} || {});
      setImageShow(file[0].uri)
      console.log("1", file);
      const facesCrop = await FaceDetector.detectFacesAsync(file[0].uri, options);
      console.log("2", facesCrop.faces);
      cropImageFace(facesCrop.faces, file[0].uri, file[0].width, file[0].height);
    },
    [],
  );


  return (
    <View style={styles.container}>
      <HeaderBack title={'Detect'}/>
      <SViewImage>
        <SImage source={imageShow ?{uri:imageShow}:IC_EMPTY_IMAGE_DETECT} resizeMode={'contain'}/>
      </SViewImage>

      <SViewButton>
        <SButton title={'Chụp ảnh'} onPress={takePicture} />
        <SButton title={'Chọn ảnh'} onPress={takePictureLibrary} />
      </SViewButton>

      <SText>Face detected</SText>

      <SScrollView>
        {listFaceDetect !="" && <SImageFace source={{uri: listFaceDetect}} resizeMode={'contain'}/>}
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
