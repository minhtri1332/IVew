import {TouchableWithoutFeedback} from 'react-native';
import {Colors} from '@/themes/Colors';
import styled from 'styled-components/native';

export const Wrapper = styled.View`
  margin: 16px 16px 0;
  border-width: 1px;
  border-color: ${Colors.gray4};
  border-radius: 8px;
  flex-direction: row;
  background-color: ${Colors.backgroundColor};
`;

export const TextWrapper = styled.View`
  padding: 11px 0 10px 16px;
  flex: 1;
`;

export const Label = styled.Text`
  color: ${Colors.gray3};
  font-size: 11px;
`;

export const ContentWrapper = styled.View`
  width: 100%;
  padding-top: 4px;
`;

export const Content = styled.Text`
  color: ${Colors.gray1};
  font-size: 15px;
  width: 100%;
`;

export const Icon = styled.Image`
  width: 24px;
  height: 24px;
  tint-color: ${Colors.gray3};
  margin: 16px 8px;
`;

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  border-radius: 8px;
`;

export const NoneFeedBackButton = styled(TouchableWithoutFeedback)`
  flex-direction: row;
  width: 100%;
  border-radius: 8px;
`;

export const TextInput = styled.TextInput`
  color: ${Colors.gray1};
  font-size: 15px;
  width: 100%;
`;
