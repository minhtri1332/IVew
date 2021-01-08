import React, {memo, useCallback, useState} from 'react';
import {BaseStyles, ScreenWrapper, SIcon} from '@/themes/BaseStyles';
import {HeaderBack} from '@/components/HeaderBack';
import {IC_SCAN} from '@/assets';
import {Colors} from '@/themes/Colors';
import {StyleSheet, Text, View} from 'react-native';
import {styled} from '@/global';
import SubmitButtonColor from '@/components/button/ButtonSubmit';

export const MScanScreen = memo(function MScanScreen() {
  const openSelectImage = useCallback(() => {}, []);

  return (
    <ScreenWrapper>
      <HeaderBack title={'MScan'} />
      <SViewBody>
        <View style={[BaseStyles.viewShadow, styles.viewCard]}>
          <SText>Smart scan</SText>
          <SImage resizeMode={'contain'} size={100} source={IC_SCAN} />
          <SButton title={'Chọn ảnh'} onPress={openSelectImage} />
        </View>
      </SViewBody>
    </ScreenWrapper>
  );
});

const SText = styled.Text`
  padding: 16px 0px;
  align-self: center;
  font-size: 24px;
  color: ${Colors.grey3};
`;

const SViewBody = styled.View`
  flex: 1;
`;

const SImage = styled.Image<{size?: number}>`
  width: ${(props: any) => props.size || 24};
  height: ${(props: any) => props.size || 24};
  tint-color:${Colors.grey4}
  align-self: center;
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
  },
});

export default MScanScreen;
