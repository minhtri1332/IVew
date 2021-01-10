import React, {memo, useCallback, useMemo, useState} from 'react';
import {ScreenWrapper} from '@/themes/BaseStyles';
import {HeaderBack} from '@/components/HeaderBack';
import {WebviewComponent} from '@/components/webView';

export const HeadMapScreen = memo(function HeadMapScreen() {

  return (
    <ScreenWrapper>
      <HeaderBack title={'HeadMap'} />
      <WebviewComponent url={'https://www.google.com'} />
    </ScreenWrapper>
  );
});

export default HeadMapScreen;
