import React, {memo, useCallback, useState} from 'react';
import {ScreenWrapper} from '@/themes/BaseStyles';
import {HeaderBack} from '@/components/HeaderBack';

export const MScanScreen = memo(function MScanScreen() {
  return (
    <ScreenWrapper>
      <HeaderBack title={'MScan'} />
    </ScreenWrapper>
  );
});

export default MScanScreen;
