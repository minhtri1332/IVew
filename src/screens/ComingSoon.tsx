import React, {memo} from 'react';
import {styled} from '@/global';
import {HeaderBack} from '@/components/HeaderBack';

export const ComingSoon = memo(function ComingSoon() {
  return (
    <SViewContainer>
      <HeaderBack title={'Updating...'} />
      <SView>
        <SText>Coming soon!!</SText>
      </SView>
    </SViewContainer>
  );
});

const SView = styled.View`
  flex: 1;
  justify-content: center;
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
