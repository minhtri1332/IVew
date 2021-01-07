import React, {memo, useCallback} from 'react';
import {Text} from 'react-native';
import {styled} from '@/global';
import {Colors} from '@/themes/Colors';
import {HomeHeader} from '@/components/HomeHeader';
import {ItemHome} from '@/screens/Home/components/ItemHome';
import {IC_LOGO} from '@/assets';
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
            icon={IC_LOGO}
            label={'Checkin'}
            onPress={navigateToHistoryScreen}
          />
          <ItemHome
            icon={IC_LOGO}
            label={'MService'}
            onPress={navigateToMServiceScreen}
          />
          <ItemHome
            icon={IC_LOGO}
            label={'Headmap'}
            onPress={navigateToHeadMapScreen}
          />
          <ItemHome
            icon={IC_LOGO}
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
  background-color: ${Colors.blue1};
`;

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.white};
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;

const SViewFunction = styled.View`

  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
`;
