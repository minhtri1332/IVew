import React, {memo} from 'react';
import {styled} from '@/global';
import {Colors} from '@/themes/Colors';
import {HomeHeader} from '@/components/HomeHeader';
import ScreenWrapper from '@/themes/BaseStyles';


export const HomeScreen = memo(function HomeScreen() {

  return (
    <SViewContainerHome>
<HomeHeader />
<Container>

</Container>
    </SViewContainerHome>
  );
});
const SViewContainerHome = styled.View`
flex:1;
  background-color: ${Colors.blue1};
`

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.white};
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;

