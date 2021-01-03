import React, {memo, PropsWithChildren, ReactElement} from 'react';
import {styled} from '@/global';
import {ImageSourcePropType, TouchableOpacity} from 'react-native';
import {Colors} from '@/themes/Colors';

const ItemContainer = styled.View`
  width: 100%;
  min-height: 44px;
  padding: 0 16px;
  flex-direction: row;
  justify-content: space-between;
`;

const Icon = styled.Image`
  tint-color: ${Colors.grey3};
  margin: 8px 8px 6px -4px;
  width: 24px;
  height: 24px;
`;

const Label = styled.Text`
  color: ${Colors.grey3};
  padding-top: 13px;
  padding-right: 16px;
  font-size: 15px;
  line-height: 18px;
`;

const SDivider = styled.View`
  margin: 0 16px;
  height: 1px;
  background-color: ${Colors.grey5};
`;
interface ItemProps {
  icon?: ImageSourcePropType;
  label: string;
  divider?: boolean;
  children?: React.ReactNode;
  willTranslate?: boolean;
}

export const Item = memo(({icon, label, children, divider}: ItemProps) => {
  return (
    <>
      <ItemContainer>
        {icon && <Icon source={icon} />}
        <Label>{label}</Label>
        {children}
      </ItemContainer>
      {divider && <SDivider />}
    </>
  );
});

interface ClickableItemProps extends ItemProps {
  disabled?: boolean;
  onPress?: () => void;
}

export const ClickableItem = memo(
  ({disabled, onPress, ...itemProps}: ClickableItemProps) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onPress}
        disabled={disabled}>
        <Item {...itemProps} />
      </TouchableOpacity>
    );
  },
);

interface SimpleClickableItemProps
  extends Omit<ClickableItemProps, 'children'> {
  content?: string;
}

export const SimpleClickableItem = memo(
  ({content, ...itemProps}: SimpleClickableItemProps) => {
    return (
      <ClickableItem {...itemProps}>
        <ClickableText clickable={!itemProps.disabled}>{content}</ClickableText>
      </ClickableItem>
    );
  },
);
export const SimpleItem = memo(function SimpleItem({
  content,
  ...props
}: ItemProps & {content?: string}) {
  return (
    <Item {...props}>
      <ItemContent>{content}</ItemContent>
    </Item>
  );
});

export const ItemContent = styled.Text`
  color: ${Colors.grey1};
  flex: 1;
  font-size: 15px;
  line-height: 18px;
  text-align: right;
  margin: 13px 0;
`;

export const ClickableText = styled(ItemContent)<{clickable?: boolean}>`
  color: ${(props: any) =>
    props.clickable ? props.theme.blue : props.theme.grey1};
`;

const SectionContainer = styled.View<{withDivider: boolean}>`
  height: 44px;
  margin: 8px 16px 0 16px;
  flex-direction: row;
  border-bottom-color: ${(props: any) => props.theme.grey5}80;
  border-bottom-width: ${(props: any) => (props.withDivider ? 1 : 0)}px;
  justify-content: space-between;
`;

const SectionText = styled.Text`
  font-size: 18px;
  line-height: 21px;
  color: ${Colors.grey1};
  font-family: Roboto-Medium;
  margin-top: 12px;
  text-align: left;
`;

interface SectionTitleProps {
  title: string;
  withDivider?: boolean;
  children?: ReactElement | ReactElement[];
}

export const SectionTitle = memo(function SectionTitle({
  title,
  withDivider = true,
  children,
}: PropsWithChildren<SectionTitleProps>) {
  return (
    <SectionContainer withDivider={withDivider}>
      <SectionText>{title}</SectionText>
      {children}
    </SectionContainer>
  );
});

const Pad = styled.View`
  width: 100%;
  padding: 0 16px;
`;

const Divider = styled.View`
  width: 100%;
  height: 1px;
  background: ${(props: any) => props.theme.grey5}80;
`;

export const FullDivider = memo(() => <Divider />);
export const PadDivider = memo(() => (
  <Pad>
    <Divider />
  </Pad>
));

const ItemSeparatorContainer = styled.View`
  width: 100%;
  padding: 0 16px;
`;

export const ItemSeparator = memo(() => (
  <ItemSeparatorContainer>
    <Divider />
  </ItemSeparatorContainer>
));

export const ItemsWrapper = styled.View`
  width: 100%;
  padding: 8px 0;
`;
