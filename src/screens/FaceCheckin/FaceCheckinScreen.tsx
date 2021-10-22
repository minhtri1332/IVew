import React, {memo, useEffect} from 'react';
import {ScreenWrapper} from '@/themes/BaseStyles';
import {HeaderBack} from '@/components/HeaderBack';
import CurrentTime from '@/screens/FaceCheckin/components/CurrentTime';
import CurrentLocation from '@/screens/FaceCheckin/components/CurrentLocation';
import FaceCheckin from '@/screens/FaceCheckin/components/FaceCheckin';
import usePermission from '@/hooks/usePermission';
import {Platform, TouchableOpacity} from 'react-native';
import {openSettings, PERMISSIONS, request} from 'react-native-permissions';
import {useAsyncFn} from '@/hooks/useAsyncFn';
import {styled} from '@/global';

const cameraPERMISSION = Platform.select({
  default: PERMISSIONS.ANDROID.CAMERA,
  ios: PERMISSIONS.IOS.CAMERA,
});

const locationPERMISSION = Platform.select({
  default: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
});

const FaceCheckinScreen = memo(function FaceCheckinScreen() {
  const cameraPermission = usePermission(cameraPERMISSION);

  const locationPermission = usePermission(locationPERMISSION);

  const [, onPressCamera] = useAsyncFn(async () => {
    if (cameraPermission === 'unavailable') {
      return;
    }

    if (cameraPermission === 'blocked') {
      return openSettings();
    }

    await request(cameraPERMISSION);
  }, [cameraPermission]);

  const [, onPressLocation] = useAsyncFn(async () => {
    if (locationPermission === 'unavailable') {
      return;
    }

    if (locationPermission === 'blocked') {
      return openSettings();
    }

    await request(locationPERMISSION);
  }, [locationPermission]);

  useEffect(() => {
    onPressCamera().then();
    onPressLocation().then();
  }, []);

  return (
    <ScreenWrapper>
      {/*<TouchableOpacity*/}
      {/*  onPress={onPressLocation}*/}
      {/*  style={{*/}
      {/*    width: 100,*/}
      {/*    height: 100,*/}
      {/*    backgroundColor: 'red',*/}
      {/*  }}></TouchableOpacity>*/}
      <HeaderBack title={'Chấm công'} />
      <SWrapper>
        <CurrentTime />
        <FaceCheckin />
        <CurrentLocation />
      </SWrapper>
    </ScreenWrapper>
  );
});

const SWrapper = styled.ScrollView``;
export default FaceCheckinScreen;
