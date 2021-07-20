import React, {memo, useCallback} from 'react';
import {styled} from '@/global';
import {SAvatar, SIcon} from '@/themes/BaseStyles';
import {IC_ARROW} from '@/assets';
import {Colors} from '@/themes/Colors';
import {LineSeparator} from '@/components/LineSeparator';
import {navigateToHistoryDetail} from '@/utils/navigation';
import {useHistory} from '@/store/history';

interface ItemHistoryProps {
  historyId: string;
}

export const ItemHistory = memo(function ItemHistory({
  historyId,
}: ItemHistoryProps) {
  const history = useHistory(historyId);
  const onPress = useCallback(() => {
    navigateToHistoryDetail({id: historyId});
  }, [historyId]);

  if (!history) return null;

  return (
    <SViewContainer activeOpacity={0.6} onPress={onPress}>
      <SAvatar
        source={{
          uri: history?.image,
        }}
        size={40}
      />
      <SViewContent>
        <STextName>{history?.name}</STextName>
        <STextTitle>{`Chấm công lúc ${history?.checkIn}`}</STextTitle>
        <STextTime>{`Thời gian muộn: ${
          history?.checkOut || 0
        } phút`}</STextTime>
        <LineSeparator />
      </SViewContent>
      <SIcon source={IC_ARROW} size={28} tintColor={Colors.grey3} />
    </SViewContainer>
  );
});

const SViewContainer = styled.TouchableOpacity`
  margin: 8px 16px 0px 16px;
  flex-direction: row;
  align-items: center;
`;

const SViewContent = styled.View`
  flex: 1;
  margin-left: 16px;
`;

const STextName = styled.Text`
  font-size: 16px;
  line-height: 22px;
  font-family: Roboto;
  color: ${Colors.grey2};
`;
const STextTitle = styled.Text`
  font-size: 14px;
  line-height: 20px;
`;
const STextTime = styled.Text<{isLate: boolean}>`
  font-size: 13px;
  line-height: 18px;
  font-family: Roboto-Medium;
  color: ${(props: any) => (props.isLate ? Colors.green1 : Colors.red0)};
  padding-bottom: 8px;
`;
