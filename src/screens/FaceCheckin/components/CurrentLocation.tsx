import React, {memo, useCallback, useRef} from 'react';
import MapView, {EventUserLocation, MapViewProps} from 'react-native-maps';
import PermissionFunction from '@/components/Permission';
import {Permission, PERMISSIONS} from 'react-native-permissions';
import {styled} from '@/global';

import {useInteractionManager} from '@react-native-community/hooks';
import {ActivityIndicator, Platform} from 'react-native';

const SMapView = styled(MapView)`
  margin-top: 32px;
  width: 335px;
  height: 130px;
  align-self: center;
`;

export const CurrentLocation = memo(function LocationValidation() {
  const mapRef = useRef<MapView>(null);

  const interactionReady = useInteractionManager();

  const onUserLocationChange = useCallback(
    (event: EventUserLocation) => {
      event.persist();
      if (!event?.nativeEvent?.coordinate) {
        return;
      }

      const {longitude, latitude} = event.nativeEvent.coordinate;
      mapRef.current?.animateCamera({
        center: {
          latitude,
          longitude,
        },
        altitude: 2411,
        zoom: 16,
      });
    },
    [mapRef],
  );

  const mapViewProps: MapViewProps = {
    // @ts-ignore
    ref: mapRef,
    followsUserLocation: true,
    showsUserLocation: true,
    scrollEnabled: false,
    cacheEnabled: true,
    loadingEnabled: true,
    zoomEnabled: false,
    zoomControlEnabled: false,
    zoomTapEnabled: false,
    pitchEnabled: false,
    rotateEnabled: false,
    toolbarEnabled: false,
    provider: 'google',
    onUserLocationChange,
  };

  return (
    <PermissionFunction
      permission={
        Platform.select({
          ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
          android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        }) as Permission
      }>
      <SMapView
        as={interactionReady ? MapView : <ActivityIndicator/>}
        {...mapViewProps}
      />
    </PermissionFunction>
  );
});

export default CurrentLocation;
