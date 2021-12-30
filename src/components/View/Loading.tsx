import React, {memo} from 'react';
import {ActivityIndicator, ViewStyle} from 'react-native';
import {styled} from '@/global';
import {Colors} from '@/themes/Colors';

interface Props {
  style?: ViewStyle;
}

const SActivityIndicator = styled(ActivityIndicator).attrs((props) => ({
  color: Colors.grey1,
}))``;

const Container = styled.View`
  width: 100%;
  flex: 1;
  align-items: center;
  padding-top: 50px;
`;

export const Loading = memo(function Loading(props: Props) {
  return (
    <Container style={props.style}>
      <SActivityIndicator />
    </Container>
  );
});
