import React, {memo, useCallback} from 'react';
import {styled} from '@/global';
import {Image, StyleSheet} from 'react-native';
import {IC_CHECK} from '@/assets';
import FastImage from 'react-native-fast-image';

interface ItemFaceProps {
  uri: string;
  isCheck: boolean;
  onPress: (value: string) => void;
}

export const ItemFace = memo(function ItemFace({
  uri,
  isCheck,
  onPress,
}: ItemFaceProps) {
  const onPressImage = useCallback(() => {
    onPress(uri);
  }, [onPress, uri]);

  return (
    <SView activeOpacity={0.6} onPress={onPressImage}>
      <FastImage
        style={styles.image}
        source={{
          uri: uri,
          headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.normal,
        }}
        resizeMode={'cover'}
      />
      {isCheck && <Image style={styles.check} source={IC_CHECK} />}
    </SView>
  );
});

const SView = styled.TouchableOpacity``;
const styles = StyleSheet.create({
  check: {
    position: 'absolute',
    marginTop: 4,
    right: 12,
  },
  image: {
    position: 'relative',
    width: 80,
    height: 80,
    marginRight: 8,
    borderRadius: 4,
  },
});
