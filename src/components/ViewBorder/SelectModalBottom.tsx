import {
  FilterBoxOption,
  FilterModalBottomProps,
} from '@/components/Filter/types';
import React, {memo, useCallback, useMemo, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  InteractionManager,
} from 'react-native';
import {
  BottomMenuContainer,
  BottomMenuHeader,
  BottomMenuModal,
} from '@/components/BottomMenu';

import {FilterModalItem} from '@/components/Filter/FilterModalItem';
import {IC_CLOSE, IC_DROPDOWN} from '@/assets';
import {Colors} from '@/themes/Colors';
import {styled} from '@/global';

type Props = FilterModalBottomProps;

const ContainerButton = styled.View`
  min-height: 56px;
  border-width: 1px;
  border-color: ${Colors.gray5};
  border-radius: 8px;
`;

const Row = styled.View`
  flex-direction: row;
`;
const Icon = styled.Image`
  tint-color: ${Colors.gray1};
  width: 24px;
  height: 24px;
`;

export const SelectModalBottom = memo(function SelectModalBottom({
  inputName,
  label,
  options,
  selectedValue,
  placeholder = '',
  onSelectOption,
  renderIcon,
  containerStyle,
  required,
  father,
  hideBottom,
  optionsChildren,
  onPressRight,
}: Props) {
  const [visible, setVisible] = useState(false);

  const selectedOption: FilterBoxOption | undefined = useMemo(() => {
    return !!options
      ? optionsChildren
        ? optionsChildren.filter((option) => option.value === selectedValue)[0]
        : options.filter((option) => option.value === selectedValue)[0]
      : undefined;
  }, [options, selectedValue]);

  const selectedOptionLabel = useMemo(
    () => (!!selectedOption ? selectedOption.label : ''),
    [selectedOption, placeholder],
  );

  const text = !!selectedOption ? selectedOptionLabel : '';

  const onSelectOptionCb = useCallback(
    (value: string | number) => {
      !father && setVisible(false);
      hideBottom && hideBottom();
      onSelectOption(inputName, value);
    },
    [inputName, onSelectOption],
  );

  const onClearSelect = useCallback(() => {
    onSelectOption(inputName, '');
  }, [inputName, onSelectOption]);

  const onPressActionRight = useCallback(() => {
    hideMenu();
    InteractionManager.runAfterInteractions(() => {
      onPressRight && onPressRight();
    });
  }, [onPressRight]);

  const showMenu = useCallback(() => {
    setVisible(true);
  }, [visible]);

  const hideMenu = useCallback(() => {
    setVisible(false);
    hideBottom && hideBottom();
  }, [visible, father, hideBottom]);

  return (
    <View style={containerStyle}>
      <ContainerButton>
        <TouchableOpacity onPress={showMenu}>
          <Row>
            <View style={styles.btnViewTitle}>
              <Text style={styles.titleText}>
                {label} {required ? '*' : ''}
              </Text>
              {text ? (
                <Text numberOfLines={1} style={styles.contentText}>
                  {text}
                </Text>
              ) : (
                <Text numberOfLines={1} style={styles.contentText}>
                  {placeholder}
                </Text>
              )}
            </View>

            <View style={styles.viewDrop}>
              <Icon resizeMode={'contain'} source={IC_DROPDOWN} />
            </View>
          </Row>
        </TouchableOpacity>
      </ContainerButton>
      <BottomMenuModal
        isVisible={visible}
        onClose={hideMenu}
        propagateSwipe={true}>
        <BottomMenuContainer>
          <BottomMenuHeader
            title={label}
            onClose={hideMenu}
            onPressRight={onPressActionRight}
          />
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
});

const ViewIcon = styled.View`
  background-color: ${Colors.gray5};
`;

const styles = StyleSheet.create({
  optionContainer: {
    marginHorizontal: 0,
  },
  viewDrop: {
    flexDirection: 'row',
    marginVertical: 16,
    marginRight: 8,
  },
  titleText: {
    paddingTop: 4,
    fontSize: 11,
    lineHeight: 13,
    color: Colors.gray1,
  },
  contentText: {
    fontSize: 15,
    lineHeight: 18,
    paddingTop: 2,
    color: Colors.gray3,
  },
  btnViewTitle: {
    flex: 1,
    paddingTop: 8,
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
  btnClear: {
    paddingRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconClear: {
    width: 10,
    height: 10,
    tintColor: Colors.gray3,
  },
  viewIcon: {
    width: 14,
    height: 14,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
