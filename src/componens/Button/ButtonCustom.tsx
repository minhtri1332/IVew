import React, {useCallback} from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

export type BaseButtonOpacityProps = TouchableOpacityProps &
  TouchableNativeFeedbackProps;

interface IBaseButtonOpacityProps extends BaseButtonOpacityProps {
  onPress?:
    | TouchableOpacityProps['onPress']
    | TouchableNativeFeedbackProps['onPress'];
  children: any;
}

export function BaseOpacityButton(props: IBaseButtonOpacityProps) {
  const {style, onPress, children, ...restProps} = props;
  const onPressWithFrame = useCallback(
    event => {
      requestAnimationFrame(() => {
        onPress && onPress(event);
      });
    },
    [onPress],
  );
  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback {...restProps} onPress={onPressWithFrame}>
        <View style={style}>{children}</View>
      </TouchableNativeFeedback>
    );
  }

  return (
    <TouchableOpacity {...restProps} style={style} onPress={onPressWithFrame}>
      {children}
    </TouchableOpacity>
  );
}
