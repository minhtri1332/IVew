import {FilterBoxOption, FilterModalBottomProps} from './types';
import React, {memo, useCallback, useMemo, useState} from 'react';
import {FilterBoxContentBig} from './FilterBoxContentBig';
import {Dimensions, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {BottomMenuContainer, BottomMenuHeader, BottomMenuModal,} from '../BottomMenu';
import {FilterModalItem} from './FilterModalItem';
import {Colors} from "@/themes/Colors";

type Props = FilterModalBottomProps;

export const FilterModalBottom = memo(
  ({
    inputName,
    label,
    options,
    selectedValue,
    placeholder = '',
    onSelectOption,
    renderIcon,
    containerStyle,
    headerContainerStyle,
    labelStyle,
    textStyle,
    filtered,
    dropDownStyle,
    hideDivider,
  }: Props) => {
    const [visible, setVisible] = useState(false);
    const selectedOption: FilterBoxOption | undefined = useMemo(() => {
      return !!options
        ? options.filter((option) => option.value === selectedValue)[0]
        : undefined;
    }, [options, selectedValue]);

    const selectedOptionLabel = useMemo(
      () => (!!selectedOption ? selectedOption.label : placeholder),
      [selectedOption, placeholder],
    );

    const noTranslate = useMemo(
      () => (!!selectedOption ? !!selectedOption.noTranslate : false),
      [selectedOption],
    );

    const text = !!selectedOption
      ? noTranslate
        ? selectedOptionLabel
        : selectedOptionLabel
      : placeholder;

    const onSelectOptionCb = useCallback(
      (value: string | number) => {
        hideMenu();
        onSelectOption(inputName, value);
      },
      [inputName, onSelectOption],
    );

    const showMenu = useCallback(() => {
      setVisible(true);
    }, [visible]);
    const hideMenu = useCallback(() => {
      setVisible(false);
    }, [visible]);

    return (
      <View style={containerStyle}>
        <TouchableOpacity style={styles.filterPaddingHp} onPress={showMenu}>
          <FilterBoxContentBig
            containerStyle={headerContainerStyle}
            labelStyle={labelStyle}
            label={label}
            text={text}
            active={!!selectedOption}
            textStyle={filtered ? styles.filtered : textStyle}
            hideDivider={hideDivider}
            dropDownStyle={dropDownStyle}
            textContainerStyle={{
                flex: 1
            }}
          />
        </TouchableOpacity>
        <BottomMenuModal
          isVisible={visible}
          onClose={hideMenu}
          propagateSwipe={true}>
          <BottomMenuContainer>
            <BottomMenuHeader title={label} onClose={hideMenu} />
            <ScrollView style={styles.maxHeightScroll}>
              {options.map((option, index) => {
                const selected = option.value === selectedValue;
                return (
                  <View
                    style={styles.optionContainer}
                    key={
                      ((option.value && option.value.toString()) || '') +
                      index.toString()
                    }>
                    {/*{index > 0 && <SDivider />}*/}
                    <FilterModalItem
                      option={option}
                      renderIcon={renderIcon}
                      selected={selected}
                      onSelect={onSelectOptionCb}
                    />
                  </View>
                );
              })}
            </ScrollView>
          </BottomMenuContainer>
        </BottomMenuModal>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  optionContainer: {
    marginHorizontal: 0,
  },
  maxHeightScroll: {
    maxHeight: Dimensions.get('window').height * 0.6,
  },
  filterPaddingHp: {
    paddingHorizontal: 16,
  },
  filtered: {
    color: Colors.blue1,
  },
});
