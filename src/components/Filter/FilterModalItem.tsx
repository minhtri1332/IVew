import React, {memo, useCallback} from 'react';
import {Image, ImageSourcePropType, StyleSheet, TouchableOpacity} from 'react-native';
import {IC_CHECK_ROUND} from '@/assets';
import styled from 'styled-components/native';
import {FilterBoxOption} from './types';
import {Colors} from "@/themes/Colors";

interface OwnProps {
  option: FilterBoxOption;
  onSelect: (value: any) => void;
  selected: boolean;
  renderIcon?: (icon: ImageSourcePropType) => React.ReactElement | null;
}

type Props = OwnProps;

const STranslatedText = styled.Text`
  flex: 1;
  color: ${Colors.gray2};
  font-size: 17px;
`;

const Icon = styled.Image`
  tint-color: ${Colors.gray1}
`;
export const FilterModalItem = memo(
  ({option, onSelect, renderIcon, selected}: Props) => {
    const onPress = useCallback(() => {
      onSelect(option.value);
    }, [option, onSelect, selected]);

    return (
      <TouchableOpacity style={styles.menuItem} onPress={onPress}>
        <>
          {option.icon &&
            (typeof renderIcon === 'function' ? (
              renderIcon(option.icon)
            ) : (
              <Image source={option.icon} style={styles.icon} />
            ))}
          <STranslatedText numberOfLines={1}>
            {option.label}
          </STranslatedText>
          {selected && (
            <Icon
              resizeMode="contain"
              style={styles.selectedIcon}
              source={IC_CHECK_ROUND}
            />
          )}
        </>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  menuItem: {
    width: '100%',
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  selectedIcon: {
    width: 16,
    height: 16,
    marginRight: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
});
