import React, {memo, useCallback, useState} from 'react';
import {ScreenWrapper} from '@/themes/BaseStyles';
import {HeaderBack} from '@/components/HeaderBack';

export const HeadMapScreen = memo(function HeadMapScreen() {
  return (
    <ScreenWrapper>
      <HeaderBack title={'HeadMap'} />
    </ScreenWrapper>
  );
});

export default HeadMapScreen;
