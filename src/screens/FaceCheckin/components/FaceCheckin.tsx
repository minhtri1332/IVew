import React, {memo, useRef} from 'react';
import {RNCamera} from 'react-native-camera';
import {PERMISSIONS, Permission} from 'react-native-permissions';
import {styled} from '@/global';
import {useInteractionManager} from '@react-native-community/hooks';
import {ActivityIndicator, Platform, View} from 'react-native';
import PermissionFunction from '@/components/Permission';

const Wrapper = styled.View`
  width: 335px;
  height: 335px;
  align-self: center;
  margin-top: 8px;
  position: relative;
`;

// @ts-ignore
const _PermissionWrapper = styled(PermissionFunction)`
  width: 100%;
  height: 100%;
`;

const Camera = styled(RNCamera)`
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: cyan;
`;

export const FaceCheckin = memo(function FaceCheckin() {
  const interactionReady = useInteractionManager();
  const cameraRef = useRef<RNCamera>(null);

  return (
    <Wrapper >
      <_PermissionWrapper
        permission={
          Platform.select({
            android: PERMISSIONS.ANDROID.CAMERA,
            ios: PERMISSIONS.IOS.CAMERA,
          }) as Permission
        }>
        <Camera
          ref={cameraRef}
          captureAudio={false}
          type={RNCamera.Constants.Type.front}
        />
      </_PermissionWrapper>
    </Wrapper>
  );
});

export default FaceCheckin;
