import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {styled} from '@/global';

interface Props extends TextInputProps {
  containerStyle: ViewStyle;
  leftIconContainerStyle: ViewStyle;
  leftIcon: React.ReactElement<{}>;
  rightIcon?: React.ReactElement<{}>;
  inputStyle?: TextStyle;
}

export const LeftIconInput = (props: Props) => {
  const {
    containerStyle,
    leftIconContainerStyle,
    leftIcon,
    rightIcon,
    inputStyle,
    ...restProps
  } = props;

  return (
    <SViewContainer style={containerStyle}>
      <View
        style={StyleSheet.flatten([
          styles.iconContainer,
          leftIconContainerStyle,
        ])}>
        <>{leftIcon && leftIcon}</>
      </View>
      <TextInput
        {...restProps}
        underlineColorAndroid={'transparent'}
        placeholderTextColor={'#616161'}
        style={StyleSheet.flatten([styles.input, inputStyle])}
      />
      {rightIcon && rightIcon}
    </SViewContainer>
  );
};

const SViewContainer = styled.View``;

const styles = StyleSheet.create({
  iconContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  input: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 18,
    flex: 1,
    minHeight: 40,
  },
});
