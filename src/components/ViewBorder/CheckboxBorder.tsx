import React, {memo, useCallback} from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import {styled} from '@/global';
import {FilterBoxOption} from '@/components/Filter/types';
import {IC_CHECK, IC_UN_CHECK} from '@/assets';
import {Colors} from '@/themes/Colors';

interface CheckboxBottomProps {
  label: string;
  options: FilterBoxOption[];
  selectedValue?: string | number;
  placeholder?: string;
  inputName: string;
  onSelectOption: (inputName: string, value: string | number) => void;
  containerStyle?: ViewStyle;
  flexDirection?: boolean;
  filtered?: boolean | undefined;
  required?: boolean | undefined;
}

export const CheckBoxBorder = memo(function CheckBoxBorder({
  inputName,
  label,
  options,
  selectedValue,
  placeholder = '',
  flexDirection,
  onSelectOption,
  containerStyle,
  required,
}: CheckboxBottomProps) {
  const onSelectOptionCb = useCallback(
    (value: string) => {
      onSelectOption(inputName, value);
    },
    [inputName, onSelectOption],
  );

  return (
    <View style={containerStyle}>
      <ContainerButton>
        <Row>
          <View style={styles.btnViewTitle}>
            <STextGrey style={styles.titleText}>
              {label} {required ? '*' : ''}
            </STextGrey>
          </View>
        </Row>
        <View style={flexDirection ? {flexDirection: 'row'} : {}}>
          {options.map((option, index) => {
            const selected = option.value === selectedValue;

            return (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => onSelectOptionCb(String(option.value))}
                style={styles.optionContainer}
                key={index}>
                <SImageCheck source={selected ? IC_CHECK : IC_UN_CHECK} />
                <SText numberOfLines={1}>{option.label}</SText>
              </TouchableOpacity>
            );
          })}
        </View>
      </ContainerButton>
    </View>
  );
});

const SImageCheck = styled.Image`
  margin: 0px 8px 0px 12px;
  justify-content: center;
`;
const SText = styled.Text`
  align-self: center;
`;

const ContainerButton = styled.View`
  min-height: 56px;
  border-width: 1px;
  border-color: ${Colors.grey5};
  border-radius: 8px;
`;

const Row = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;

const STextGrey = styled.Text`
  color: ${Colors.grey3};
`;

const styles = StyleSheet.create({
  optionContainer: {
    marginHorizontal: 0,
    flexDirection: 'row',
    paddingBottom: 16,
    paddingRight: 8,
  },
  titleText: {
    fontSize: 11,
    lineHeight: 13,
  },
  contentText: {
    fontSize: 15,
    lineHeight: 18,
    paddingTop: 4,
  },
  btnViewTitle: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
  },
  selectedText: {},
  maxHeightScroll: {
    maxHeight: Dimensions.get('window').height * 0.6,
  },
  filterPaddingHp: {},
  filtered: {
    color: Colors.blue1,
  },
});
