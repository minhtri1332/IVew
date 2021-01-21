import React, {memo, useCallback, useState} from 'react';
import {BaseStyles, ScreenWrapper} from '@/themes/BaseStyles';
import {HeaderBack} from '@/components/HeaderBack';
import {IC_SCAN} from '@/assets';
import {Colors} from '@/themes/Colors';
import {StyleSheet, View} from 'react-native';
import {styled} from '@/global';
import SubmitButtonColor from '@/components/button/ButtonSubmit';
import File from '@/utils/file';
import {screenHeight} from '@/utils/scale';
import {useAsyncFn} from '@/hooks/useAsyncFn';
import {requestTransformFile} from '@/store/MScan/functions';
import {RawFile} from '@/store/types';

export const MScanScreen = memo(function MScanScreen() {
  const [fileSelect, setFile] = useState({uri: ''} as RawFile);

  const openSelectImage = useCallback(async () => {
    const file = await File.pickImage({multiple: false} || {});
    // @ts-ignore
    setFile(file[0]);
  }, []);

  const [{loading}, startTransform] = useAsyncFn(async () => {
    const scan = await requestTransformFile(fileSelect);
  }, [fileSelect]);

  return (
    <ScreenWrapper>
      <HeaderBack title={'MScan'} />
      <SViewBody>
        <View style={[BaseStyles.viewShadow, styles.viewCard]}>
          <SText>Smart scan</SText>
          <SImage
            small={fileSelect.uri == '' ? false : true}
            resizeMode={'contain'}
            source={fileSelect.uri == '' ? IC_SCAN : {uri: fileSelect.uri}}
          />
          <SViewButton>
            {fileSelect.uri != '' && (
              <SButton title={'Biến đổi'} onPress={startTransform} />
            )}
            <SButton
              title={fileSelect ? 'Đổi ảnh' : 'Chọn ảnh'}
              onPress={openSelectImage}
            />
          </SViewButton>
        </View>
      </SViewBody>
    </ScreenWrapper>
  );
});

const SViewButton = styled.View`
  flex-direction: row;
  margin-top: 16px;
`;

const SText = styled.Text`
  padding: 16px 0px;
  align-self: center;
  font-size: 24px;
  color: ${Colors.grey3};
`;

const SViewBody = styled.View`
  flex: 1;
`;

const SImage = styled.Image<{small?: boolean}>`
  width: 100%;
  min-height: 100px;
  height: ${(props: any) => (props.small ? screenHeight - 320 : 100)};
  padding: 16px;
  border-radius: 6px;
  margin-bottom: -16px;
`;

const SButton = styled(SubmitButtonColor)`
  margin-top: 24px;
  padding: 0px 16px;
`;

const styles = StyleSheet.create({
  viewCard: {
    backgroundColor: '#f2f2f2',
    borderRadius: 16,
    margin: 16,
    alignItems: 'center',
  },
});

export default MScanScreen;
