import React, {
  memo,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {
  Animated,
  KeyboardType,
  Platform,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {styled} from '@/global';
import {Colors} from '@/themes/Colors';
import useBoolean from '@/hooks/useBoolean';

const Container = styled.View<{disabled?: boolean}>`
  min-height: 56px;
  border-width: 1px;
  border-color: ${Colors.gray5};
  border-radius: 8px;
  background-color: ${(p: any) => (p.disabled ? Colors.gray6 : Colors.white)};
  flex-direction: row;
  overflow: hidden;
`;

const STextInput = styled.TextInput`
  color: ${Colors.gray1};
  margin-left: ${Platform.OS === 'android' ? -3 : 0}px;
`;
const Gray1Text = styled.Text`
  color: ${Colors.gray1};
`;

interface Props extends TextInputProps {
  containerStyle?: ViewStyle;
  value: string;
  keyName: string;
  placeHolder: string;
  multiline?: boolean;
  onTextChange: (keyName: string, value: string) => void;
  disabled?: boolean;
  rightComponent?: ReactElement;
  keyboardType?: KeyboardType;
  required?: boolean;
}

export const InputBorder = memo(function InputBorder(props: Props) {
  const {
    placeHolder,
    value,
    keyName,
    onTextChange,
    disabled,
    containerStyle,
    rightComponent,
    multiline,
    keyboardType,
    required,
    ...restProps
  } = props;
  const inputRef = useRef<TextInput>(null);
  const [isFocus, setFocus, setNoFocus] = useBoolean(false);
  let focusedAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

  const toggle = useCallback(
    (isActive: boolean) => {
      Animated.timing(focusedAnim, {
        toValue: isActive ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    },
    [value, focusedAnim],
  );

  useEffect(() => {
    if (!isFocus) {
      toggle(!!value);
    }
  }, [value, toggle, isFocus]);

  const focus = useCallback(() => {
    inputRef.current && inputRef.current.focus();
  }, [inputRef]);

  const blur = useCallback(() => {
    inputRef.current && inputRef.current.blur();
  }, [inputRef]);

  const onChange = useCallback(
    (_value) => {
      onTextChange(keyName, _value);
    },
    [onTextChange, keyName],
  );
  const onFocus = useCallback(() => {
    if (disabled) {
      return;
    }
    setFocus();
    toggle(true);
  }, [disabled, isFocus, toggle]);

  const onBlur = useCallback(() => {
    setNoFocus();
    toggle(false);
  }, [toggle, isFocus]);

  const setRequired = useMemo(() => {
    return required ? ' *' : '';
  }, [required]);

  return (
    <Container disabled={disabled} style={containerStyle}>
      <View style={styles.contentContainer}>
        <TouchableWithoutFeedback onPress={focus}>
          <Animated.View
            style={{
              position: 'absolute',
              left: 12,
              top: focusedAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [18, 11],
              }),
              right: 0,
            }}>
            <Animated.Text
              numberOfLines={1}
              style={[
                styles.label,
                {
                  fontSize: focusedAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [15, 11],
                  }),
                  color: Colors.grey3,
                },
              ]}>
              {placeHolder + setRequired}
            </Animated.Text>
          </Animated.View>
        </TouchableWithoutFeedback>
        <View style={styles.valueView}>
          {disabled ? (
            <Gray1Text
              numberOfLines={Platform.OS == 'ios' ? 10 : 1}
              style={styles.textInputLabel}>
              {value}
            </Gray1Text>
          ) : (
            <STextInput
              multiline={multiline}
              ref={inputRef}
              style={styles.textInput}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              onFocus={onFocus}
              underlineColorAndroid={'transparent'}
              keyboardType={keyboardType}
              {...restProps}
            />
          )}
        </View>
      </View>
      {rightComponent && rightComponent}
    </Container>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingBottom: Platform.OS === 'android' ? 8 : 32,
  },
  valueView: {
    top: Platform.OS === 'android' ? 18 : 24,
    left: 0,
    paddingLeft: 12,
    paddingRight: 12,
  },
  label: {
    backgroundColor: 'transparent',
  },
  textInputLabel: {
    paddingLeft: 0,
    paddingTop: Platform.OS === 'android' ? 8 : 2,
    fontSize: 15,
    lineHeight: 18,
    textAlignVertical: 'top',
  },
  textInput: {
    paddingLeft: 0,
    paddingTop: Platform.OS === 'android' ? 8 : 4,
    fontSize: 15,
    lineHeight: 18,
    textAlignVertical: 'top',
  },
});
