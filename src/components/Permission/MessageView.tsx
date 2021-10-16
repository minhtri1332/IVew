import React, {memo} from 'react';
import {styled} from '@/global';
import {ViewProps} from 'react-native';
import {Colors} from '@/themes/Colors';

export type MessageViewType = 'default' | 'success' | 'error';

const Wrapper = styled.View`
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text<{type: MessageViewType}>`
  font-size: 20px;
  font-family: Roboto-Regular;
  color: ${(p:any) => {
    if (p.type === 'success') {
      return Colors.green1;
    }
    if (p.type === 'error') {
      return Colors.red0;
    }

    return Colors.grey1;
  }};
`;
const Description = styled.Text`
  font-family: Roboto-Regular;
  margin-top: 4px;
  font-size: 14px;
`;

export type MessageViewProps = {
  title: string;
  description?: string;
  type?: MessageViewType;
} & Partial<ViewProps>;

export const MessageView = memo(function MessageView({
  title,
  description,
  type = 'default',
  ...props
}: MessageViewProps) {
  return (
    <Wrapper {...props}>
      <Title type={type}>{title}</Title>
      <Description>{description}</Description>
    </Wrapper>
  );
});

export default MessageView;
