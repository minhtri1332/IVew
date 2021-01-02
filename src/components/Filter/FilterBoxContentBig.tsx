import React, {memo} from 'react';
import {ImageStyle, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {IC_ARROW_DOWN} from '@/assets';
import {styled} from '@/global';
import {Colors} from "@/themes/Colors";

const SContainer = styled.View<{ hideDivider?: boolean }>`
  height: 56px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: ${props => props.hideDivider ? 0 : 1}px;
  border-bottom-color: ${Colors.gray7};
`;

const SLabel = styled.Text`
  width: 100%;
  font-size: 13px;
  color: ${Colors.gray3};
`;

const SText = styled.Text`
  width: 100%;
  font-size: 16px;
  color: ${Colors.gray1};
`;

const SPlaceholder = styled.Text`
  width: 100%;
  font-size: 16px;
  color: ${Colors.gray2};
`;

interface ArrowIconProps {
    disabled?: boolean;
}

const SArrowIcon = styled.Image.attrs((props) => ({
    source: IC_ARROW_DOWN,
}))<ArrowIconProps>`
  width: 12px;
  height: 6px;
  tint-color: ${(props) =>
    props.disabled ? Colors.gray4 : Colors.gray2};
`;

interface OwnProps {
    label: string;
    text: string;
    active: boolean;
    hideDivider?: boolean;
    containerStyle?: ViewStyle;
    textContainerStyle?: ViewStyle;
    labelStyle?: TextStyle;
    textStyle?: TextStyle;
    dropDownStyle?: ImageStyle;
}

type Props = OwnProps;

export const FilterBoxContentBig = memo(
    ({
         textContainerStyle,
         containerStyle,
         label,
         text,
         active,
         textStyle,
         labelStyle,
         hideDivider,
         dropDownStyle
     }: Props) => {
        return (
            <SContainer style={containerStyle} hideDivider={hideDivider}>
                <View style={[styles.textContainer, textContainerStyle]}>
                    <SLabel style={labelStyle}>{label}</SLabel>
                    {active ? (
                        <SText style={textStyle}>{text}</SText>
                    ) : (
                        <SPlaceholder>{text}</SPlaceholder>
                    )}
                </View>
                <SArrowIcon style={dropDownStyle}/>
            </SContainer>
        );
    },
);

const styles = StyleSheet.create({
    iconButton: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8,
    },
    textContainer: {
        paddingRight: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    prevIcon: {
        transform: [{rotate: '90deg'}],
    },
    nextIcon: {
        transform: [{rotate: '-90deg'}],
    },
});
