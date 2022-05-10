import React, {memo} from 'react';
import {styled} from '@/global';
import {Colors} from '@/themes/Colors';

interface LineSeparatorProps {
  color?: string;
}
export const LineSeparator = memo(({color = 'grey5'}: LineSeparatorProps) => {
  return <SViewRoot color={color} />;
});

export const PadLineSeparator = memo((props: LineSeparatorProps) => {
  return (
    <PadContainer>
      <LineSeparator {...props} />
    </PadContainer>
  );
});

export const ViewLineSpace = memo(() => {
  return <SViewLine />;
});

const SViewLine = styled.View`
  height: 8px;
  width: 100%;
  background-color: ${props => props.theme.black10};
`;

const SViewRoot = styled.View<LineSeparatorProps>`
  height: 1px;
  background: ${Colors.grey5};
  width: 100%;
`;

const PadContainer = styled.View`
  width: 100%;
  padding: 0 16px;
`;
