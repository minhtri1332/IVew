import React, {memo} from 'react';
import {ScreenWrapper} from '@/themes/BaseStyles';
import {HeaderBack} from '@/components/HeaderBack';
import CurrentTime from '@/screens/FaceCheckin/components/CurrentTime';
import CurrentLocation from '@/screens/FaceCheckin/components/CurrentLocation';
import FaceCheckin from '@/screens/FaceCheckin/components/FaceCheckin';

const FaceCheckinScreen = memo(function FaceCheckinScreen() {
  return (
    <ScreenWrapper>
      <HeaderBack title={'Chấm công'} />
      <CurrentTime />
      <FaceCheckin/>
      <CurrentLocation/>
    </ScreenWrapper>
  );
});
export default FaceCheckinScreen;
