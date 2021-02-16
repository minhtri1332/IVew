import React, {memo, useCallback} from 'react';
import {styled} from '@/global';
import {TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import {Colors} from '@/themes/Colors';

const Wrapper = styled(TouchableOpacity)<{
  withMargin: boolean;
  colorButton: string;
}>`
  flex-direction: row;
  align-items: center;
  height: 44px;
  justify-content: center;
  border-radius: 8px;
  margin: ${(p: any) => (p.withMargin ? '16px 16px 16px' : 0)};
`;

const Title = styled.Text<{colorButton: string}>`
  font-size: 18px;
  color: ${(props: any) => props.colorButton};
  text-align: center;
  font-family: Roboto-Medium;
`;

const SLoadingIndicator = styled.ActivityIndicator`
  margin-right: 16px;
`;

interface SubmitButtonProps {
  title: string;
  color?: string;
  value?: string;
  loading?: boolean;
  textStyle?: TextStyle;
  style?: ViewStyle;
  onPress: (value: string) => void;
}
export const ButtonText = memo(function ButtonText({
  title,
  value,
  color,
  loading = false,
  textStyle,
  style,
  onPress,
}: SubmitButtonProps) {
  const onPressListener = useCallback(() => {
    onPress(value || '');
  }, [onPress]);

  return (
    <Wrapper
      onPress={onPressListener}
      disabled={loading}
      activeOpacity={0.6}
      style={style}>
      {loading ? (
        <SLoadingIndicator color={color || Colors.blue1} size={24} />
      ) : (
        <Title style={textStyle} colorButton={color || '#007AFF'}>
          {title}
        </Title>
      )}
    </Wrapper>
  );
});

export default ButtonText;
