import React, {memo, useCallback} from 'react';
import {styled} from '@/global';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {IC_CHECK} from '@/assets';
import FastImage from 'react-native-fast-image';
import {
  BottomMenuContainer,
  BottomMenuHeader,
  BottomMenuModal,
  SelectorItem,
  UNIQUE_STRING,
} from '@/components/BottomMenu';
import useBoolean from '@/hooks/useBoolean';

interface ModalPickerImageProps {}

export const ModalPickerImage = memo(
  function ModalPickerImage({}: ModalPickerImageProps) {
    const [visible, show, hideMenu] = useBoolean();
    const onPressImage = useCallback(() => {}, []);

    return (
      <BottomMenuModal
        isVisible={visible}
        onClose={hideMenu}
        propagateSwipe={true}>
        <BottomMenuContainer>
          <BottomMenuHeader title={'Chọn ảnh'} onClose={hideMenu} />
        </BottomMenuContainer>
      </BottomMenuModal>
    );
  },
);

const styles = StyleSheet.create({});
