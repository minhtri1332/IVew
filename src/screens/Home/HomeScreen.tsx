import React, {memo} from 'react';
import {styled} from '@/global';
import {Colors} from '@/themes/Colors';
import {HomeHeader} from '@/components/HomeHeader';
import {ItemHome} from '@/screens/Home/components/ItemHome';
import {
  IC_DETECT_FACE,
  IC_HOME_CHECKIN,
  IC_HOME_HEAD_MAP,
  IC_HOME_SCAN,
  IC_HOME_SERVICE,
} from '@/assets';
import {
  navigateToFaceDetectScreen,
  navigateToHeadMapScreen,
  navigateToHistoryScreen,
  navigateToMScanScreen,
  navigateToMServiceScreen,
  openFaceDetectScreen,
} from '@/utils/navigation';
import {useAsyncEffect} from '@/hooks/useAsyncEffect';
import {requestGetBoxAi} from '@/store/boxAI/functions';
import {RefreshControl} from 'react-native';
import {requestTokenDevice} from '@/store/auth/function';
import {firebase} from '@react-native-firebase/messaging';

export const HomeScreen = memo(function HomeScreen() {
  const {call, loading} = useAsyncEffect(async () => {
    const tokenDevice = await firebase.messaging().getToken();
    await requestTokenDevice(tokenDevice);
    await requestGetBoxAi();
  }, []);

  return (
    <SViewContainerHome>
      <HomeHeader />
      <Container
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={call} />
        }>
        <SViewFunction>
          <ItemHome
            icon={IC_HOME_CHECKIN}
            label={'Checkin'}
            onPress={navigateToHistoryScreen}
          />
          <ItemHome
            icon={IC_HOME_SERVICE}
            label={'MService'}
            onPress={navigateToMServiceScreen}
          />
        </SViewFunction>
        <SViewFunction>
          <ItemHome
            icon={IC_HOME_HEAD_MAP}
            label={'Headmap'}
            onPress={navigateToHeadMapScreen}
          />
          <ItemHome
            icon={IC_HOME_SCAN}
            label={'MScan'}
            onPress={navigateToMScanScreen}
          />
        </SViewFunction>

        <SViewFunction>
          <ItemHome
            icon={IC_DETECT_FACE}
            label={'Face detect'}
            onPress={openFaceDetectScreen}
          />
        </SViewFunction>
      </Container>
    </SViewContainerHome>
  );
});

const SViewContainerHome = styled.View`
  flex: 1;
  background-color: ${Colors.backgroundHeader};
`;

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${Colors.white};
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;

const SViewFunction = styled.View`
  margin-top: 16px;
  justify-content: center;
  flex-direction: row;
`;
