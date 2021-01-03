import React, {memo} from 'react';
import {styled} from '@/global';
import {DefaultTheme} from 'styled-components';
import {Colors} from '@/themes/Colors';

interface LineSeparatorProps {
  color?: keyof DefaultTheme;
}
export const LineSeparator = memo(() => {
  return <SViewRoot />;
});

export const ViewLineSpace = memo(() => {
  return <SViewLine />;
});

const SViewLine = styled.View`
  height: 8px;
  width: 100%;
  background-color: ${(props: any) => props.theme.black10};
`;

const SViewRoot = styled.View<LineSeparatorProps>`
  height: 1px;
  background: ${Colors.grey4};
  width: 100%;
`;

const PadContainer = styled.View`
  width: 100%;
  padding: 0 16px;
`;
