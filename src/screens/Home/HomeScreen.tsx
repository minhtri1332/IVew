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
  navigateComingSoonScreen,
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
import {requestGetDepartment} from '@/store/department/functions';

export const HomeScreen = memo(function HomeScreen() {
  const {call, loading} = useAsyncEffect(async () => {

    await requestGetDepartment();
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
            label={'Lịch sử'}
            onPress={navigateToHistoryScreen}
          />

          <ItemHome
            icon={IC_DETECT_FACE}
            label={'Thêm nhân viên'}
            onPress={openFaceDetectScreen}
          />

        </SViewFunction>
        <SViewFunction>
          <ItemHome
            icon={IC_HOME_HEAD_MAP}
            label={'Sơ đồ'}
            onPress={navigateComingSoonScreen}
            //navigateToHeadMapScreen
          />
          <ItemHome
            icon={IC_HOME_SCAN}
            label={'Quét văn bản'}
            onPress={navigateComingSoonScreen}
            //navigateToMScanScreen
          />
        </SViewFunction>

        {/*<SViewFunction>*/}
        {/*  <ItemHome*/}
        {/*    icon={IC_HOME_SERVICE}*/}
        {/*    label={'Dịch vụ'}*/}
        {/*    onPress={navigateToMServiceScreen}*/}

        {/*  />*/}
        {/*</SViewFunction>*/}
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
