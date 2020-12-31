import React, {memo, useMemo} from 'react';
import {
  SelectorItem,
  SelectorItemProps,
} from '@/components/BottomMenu/SelectorItem';
interface BottomMenuItemProps {
  label: string;
  onPress?: SelectorItemProps['onSelect'];
  renderIcon?: SelectorItemProps['renderIcon'];
  selected?: boolean;
}
export const BottomMenuItem = memo(function BottomMenuItem({
  label,
  onPress,
  renderIcon,
  selected,
}: BottomMenuItemProps) {
  const values = useMemo((): SelectorItemProps => {
    return {
      option: {
        label,
        value: undefined,
      },
      onSelect: onPress,
      renderIcon: renderIcon,
      selected: selected ? selected : false,
    };
  }, [label, onPress, renderIcon, selected]);
  return <SelectorItem {...values} />;
});

export default BottomMenuItem;
