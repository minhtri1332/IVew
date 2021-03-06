import React, {memo, useCallback} from 'react';
import {styled} from '@/global';
import {Colors} from '@/themes/Colors';
import {ImageProps} from 'react-native';

interface ItemHomeProps {
  icon: ImageProps;
  label: string;
  onPress: () => void;
}

export const ItemHome = memo(function ItemHome({
  icon,
  label,
  onPress,
}: ItemHomeProps) {
  return (
    <SViewContainerHome onPress={onPress}>
      <SImage source={icon} />
      <STextLabel>{label}</STextLabel>
    </SViewContainerHome>
  );
});
const SViewContainerHome = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  margin: 16px;
  border-radius: 30px;
  border-width: 1px;
  border-color: ${Colors.grey5};
`;
const STextLabel = styled.Text`
  font-family: Roboto;
`;

const SImage = styled.Image`
  width: 50px;
  height: 50px;
  margin-bottom: 16px;
`;
