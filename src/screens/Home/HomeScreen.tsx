import React, {memo, useCallback} from 'react';
import {styled} from '@/global';
import {Colors} from '@/themes/Colors';
import {HomeHeader} from '@/components/HomeHeader';
import {ItemEmpty, ItemHome} from '@/screens/Home/components/ItemHome';
import {
  IC_CHECKIN_EMPLOYEE,
  IC_CHECKIN_FACE,
  IC_DETECT_FACE,
  IC_HOME_CHECKIN,
  IC_HOME_SCAN,
} from '@/assets';
import {
  navigateComingSoonScreen,
  navigateToCustomerScreen,
  navigateToFaceCheckinScreen,
  navigateToHistoryScreen,
  openFaceDetectScreen,
  openModalCreateCustomer,
} from '@/utils/navigation';
import {useAsyncEffect} from '@/hooks/useAsyncEffect';
import {requestGetGroups} from '@/store/group/functions';
import {InteractionManager, RefreshControl} from 'react-native';
import {requestTokenDevice} from '@/store/auth/function';
import {firebase} from '@react-native-firebase/messaging';
import {requestGetDepartment} from '@/store/department/functions';
import SelectTypesCreateModal from '@/screens/FaceDetect/Modal/SelectTypesCreateModal';
import useBoolean from '@/hooks/useBoolean';

export const HomeScreen = memo(function HomeScreen() {
  const [visible, show, hide] = useBoolean(false);
  const {call, loading} = useAsyncEffect(async () => {
    await requestGetDepartment();
    await requestGetGroups();
    const tokenDevice = await firebase.messaging().getToken();
    await requestTokenDevice(tokenDevice);
  }, []);

  const openCreateEmployee = useCallback((value: string) => {
    InteractionManager.runAfterInteractions(() => {
      hide();
    });
    if (value == 'employee') {
      openFaceDetectScreen({});
    } else {
      openModalCreateCustomer({});
    }
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
            label={'Thêm khuôn mặt'}
            onPress={show}
          />
        </SViewFunction>
        <SViewFunction>
          <ItemHome
            icon={IC_CHECKIN_EMPLOYEE}
            label={'Khách hàng'}
            onPress={navigateToCustomerScreen}
          />

          <ItemHome
            icon={IC_CHECKIN_FACE}
            label={'Chấm công'}
            onPress={navigateToFaceCheckinScreen}
          />
        </SViewFunction>

        <SViewFunction>
          <ItemHome
            icon={IC_HOME_SCAN}
            label={'Quét văn bản'}
            onPress={navigateComingSoonScreen}
            //navigateToMScanScreen
          />

          <ItemEmpty />
        </SViewFunction>
      </Container>

      <SelectTypesCreateModal
        isVisible={visible}
        coverScreen={false}
        onCloseRequest={hide}
        onPressItem={openCreateEmployee}
      />
    </SViewContainerHome>
  );
});

const SViewContainerHome = styled.View`
  flex: 1;
  height: 100%;
  background-color: ${Colors.backgroundHeader};
`;

const Container = styled.ScrollView`
  background-color: ${Colors.white};
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;

const SViewFunction = styled.View`
  margin-top: 16px;
  justify-content: center;
  flex-direction: row;
`;
