import React, {memo, useCallback} from 'react';
import {Text} from 'react-native';
import {styled} from '@/global';
import {Colors} from '@/themes/Colors';
import {HomeHeader} from '@/components/HomeHeader';
import {ItemHome} from '@/screens/Home/components/ItemHome';
import {
  IC_HOME_CHECKIN,
  IC_HOME_HEAD_MAP,
  IC_HOME_SCAN,
  IC_HOME_SERVICE,
  IC_LOGO,
} from '@/assets';
import {
  navigateToHeadMapScreen,
  navigateToHistoryScreen,
  navigateToMScanScreen,
  navigateToMServiceScreen,
} from '@/utils/navigation';

export const HomeScreen = memo(function HomeScreen() {
  return (
    <SViewContainerHome>
      <HomeHeader />
      <Container>
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


      </Container>
    </SViewContainerHome>
  );
});

const SViewContainerHome = styled.View`
  flex: 1;
  background-color: ${Colors.backgroundHeader};
`;

const Container = styled.View`
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
