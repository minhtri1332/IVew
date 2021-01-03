import React, {memo, ReactNode} from 'react';
import {ViewProps} from 'react-native';
import {styled} from '@/global';
import {Colors} from '@/themes/Colors';

const Wrapper = styled.View``;

const TopSeparator = styled.View`
  background-color: ${Colors.grey5};
  height: 0.5px;
`;

const HeaderWrapper = styled.View`
  flex-direction: row;
  height: 40px;
  align-items: center;
  padding: 10px 16px 0;
`;

const Title = styled.Text`
  color: ${Colors.grey1};
  font-family: Roboto-Medium;
  font-size: 18px;
  flex: 1;
`;

export interface SectionContainerProps extends ViewProps {
  title: string;
  children?: ReactNode;
  withTopSeparator?: boolean;
  right?: ReactNode;
  required?: boolean;
}

export const SectionContainer = memo(function SectionContainer({
  title,
  children,
  withTopSeparator = true,
  right,
  required,
  ...props
}: SectionContainerProps) {
  return (
    <Wrapper {...props}>
      {withTopSeparator ? <TopSeparator /> : null}
      <HeaderWrapper>
        <Title>
          {title} {required ? '*' : ''}
        </Title>
        {right}
      </HeaderWrapper>
      {children}
    </Wrapper>
  );
});

export default SectionContainer;
