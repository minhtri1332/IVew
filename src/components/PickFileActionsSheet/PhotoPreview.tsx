import React, {memo, useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {styled} from '@/global';
import {FileType} from '@/types';

const SWrapper = styled(Modal)`
  margin: 0;
`;

const SContainer = styled.View`
  background-color: black;
  width: 100%;
  height: 100%;
`;

const SImage = styled.Image`
  width: 100%;
  height: 100%;
`;

interface Props {
  onRetry: () => void;
  onOk: (file: FileType) => void;
  file: FileType | undefined;
}

export const PhotoPreview = memo(({file, onRetry, onOk}: Props) => {
  const onOkPress = useCallback(() => {
    if (file) {
      onOk(file);
    }
  }, [file, onOk]);

  return (
    <SWrapper
      isVisible={file !== undefined}
      onBackButtonPress={onRetry}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      backdropTransitionOutTiming={0}
      avoidKeyboard={true}>
      <SContainer>
        <View style={styles.imgContainer}>
          {file && file.uri && (
            <SImage resizeMode={'contain'} source={{uri: file.uri}} />
          )}
        </View>
        <View style={styles.footer}>
          {/*<TouchableOpacity style={styles.button} onPress={onRetry}>*/}
          {/*  <Text style={styles.buttonText}>{translate('uikit/retake')}</Text>*/}
          {/*</TouchableOpacity>*/}
          {/*<TouchableOpacity style={styles.button} onPress={onOkPress}>*/}
          {/*  <Text style={styles.buttonText}>{translate('uikit/usePhoto')}</Text>*/}
          {/*</TouchableOpacity>*/}
        </View>
      </SContainer>
    </SWrapper>
  );
});

const styles = StyleSheet.create({
  imgContainer: {
    width: '100%',
    flex: 1,
  },
  footer: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
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
