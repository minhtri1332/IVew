import React, {memo, useCallback} from 'react';
import {styled} from '@/global';
import {SAvatar, SIcon} from '@/themes/BaseStyles';
import {IC_ARROW, IC_ARROW_DOWN, IC_LOGO} from '@/assets';
import {Colors} from '@/themes/Colors';
import {LineSeparator} from '@/components/LineSeparator';
import {navigateToHistoryDetail} from '@/utils/navigation';

interface ItemHistoryProps {
  idItem: string;
}

export const ItemHistory = memo(function ItemHistory({
  idItem,
}: ItemHistoryProps) {
  const onPress = useCallback(() => {
    navigateToHistoryDetail({id: idItem});
  }, []);

  return (
    <SViewContainer activeOpacity={0.6} onPress={onPress}>
      <SAvatar source={IC_LOGO} size={40} />
      <SViewContent>
        <STextName>Nguyen Minh Tri</STextName>
        <STextTitle>Khách đã ghé thăm 2 lần</STextTitle>
        <STextTime>Lần cuối ghé thăm vào 10:00 3/1/2021</STextTime>
        <LineSeparator />
      </SViewContent>
      <SIcon source={IC_ARROW} size={30} />
    </SViewContainer>
  );
});

const SViewContainer = styled.TouchableOpacity`
  flex: 1;
  margin: 8px 16px 0px 16px;
  flex-direction: row;
  align-items: center;
`;

const SViewContent = styled.View`
  flex: 1;
  margin-left: 16px;
`;

const STextName = styled.Text`
  font-size: 18px;
  line-height: 24px;
  font-family: Roboto-Medium;
  color: darkblue;
`;
const STextTitle = styled.Text`
  font-size: 15px;
  line-height: 22px;
  font-family: Roboto-Medium;
`;
const STextTime = styled.Text`
  font-size: 13px;
  line-height: 20px;
  font-family: Roboto-Medium;
  color: ${Colors.grey3};
  padding-bottom: 8px;
`;
