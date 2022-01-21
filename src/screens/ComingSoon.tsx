import React, {memo} from 'react';
import {styled} from '@/global';
import {HeaderBack} from '@/components/HeaderBack';
import {IC_COMING_SOON} from '@/assets';

export const ComingSoon = memo(function ComingSoon() {
  return (
    <SViewContainer>
      <HeaderBack title={'Updating...'} />
      <SView>
        <SImage source={IC_COMING_SOON} />
        <SText>Coming soon!!</SText>
      </SView>
    </SViewContainer>
  );
});

const SView = styled.View`
  flex: 1;
  margin-bottom: 100px;
  justify-content: center;
  align-self: center;
`;
const SImage = styled.Image`
  align-self: center;
`;
const SText = styled.Text`
  font-family: Roboto-Medium;
  font-size: 30px;
`;
const SViewContainer = styled.View`
  flex: 1;
`;
export default ComingSoon;
