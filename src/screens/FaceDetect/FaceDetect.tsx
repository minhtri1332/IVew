import React, {memo, useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {HeaderBack} from '@/components/HeaderBack';
import {styled} from '@/global';
import {useNavigationParams} from '@/hooks/useNavigationParams';
import ImageEditor from '@react-native-community/image-editor';
import {IC_CAMERA} from '@/assets';
const {width: DWidth, height: DHeight} = Dimensions.get('window');
export interface FaceDetectScreenProps {
  faces: any[];
  imageUri: string;
  width:number;
  height:number;
}

export const FaceDetectScreen = memo(function FaceDetectScreen() {
  const {faces, imageUri, height, width} = useNavigationParams<FaceDetectScreenProps>();
  const [listFaceDetect, setListFaceDetect] = useState('');
  const [userPending, setUserPending] = useState<Set<string>>(() => {
    return new Set([]);
  });

  useEffect(() => {
    let imgFaces: string[] = [];
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
        imgFaces.push(url)
        setListFaceDetect(url)
      });
    });
    // @ts-ignore
    setListFaceDetect(imgFaces)
  }, [imageUri,faces, height, width]);

  return (
    <View style={styles.container}>
      <HeaderBack title={'Detect'}/>
      <SImage source={{uri:imageUri}} resizeMode={'contain'}/>
      <SScrollView>
        {userPending.forEach(item =>{
          return <SImageFace source={{uri: item}} resizeMode={'contain'}/>
        })}
      </SScrollView>
    </View>
  );
});

const SImageFace = styled.Image`
width: 100px;
height: 100px;
`

const SImage = styled.Image`
flex:1;
width: 100%;
height: 100%;
`
const SScrollView = styled.ScrollView`

background-color: white;
height: 100px;
width: 100%;
bottom: 1px;
`
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
