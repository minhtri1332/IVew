import {Animated, Keyboard, Platform} from 'react-native';
import {useEffect, useRef} from 'react';

export const useKeyboardAnimate = (value1: number, value2: number) => {
  const value = useRef(
    new Animated.Value(Platform.OS === 'ios' ? value1 : value2),
  );

  useEffect(() => {
    if (Platform.OS === 'ios') {
      const keyboardWillShowSub = Keyboard.addListener(
        'keyboardWillShow',
        (event) => {
          Animated.timing(value.current, {
            duration: event.duration,
            toValue: value2,
            useNativeDriver: false,
          }).start();
        },
      );

      const keyboardWillHideSub = Keyboard.addListener(
        'keyboardWillHide',
        (event) => {
          Animated.timing(value.current, {
            duration: event.duration,
            toValue: value1,
            useNativeDriver: false,
          }).start();
        },
      );
      return () => {
        keyboardWillShowSub.remove();
        keyboardWillHideSub.remove();
      };
    }
    return;
  }, [value, value1, value2]);
  return value;
};
