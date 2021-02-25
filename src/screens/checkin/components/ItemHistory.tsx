import React, {memo, useCallback} from 'react';
import {styled} from '@/global';
import {SAvatar, SIcon} from '@/themes/BaseStyles';
import {IC_ARROW, IC_ARROW_DOWN, IC_LOGO} from '@/assets';
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

  return (
    <SViewContainer activeOpacity={0.6} onPress={onPress}>
      <SAvatar
        source={{
          uri:
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        }}
        size={40}
      />
      <SViewContent>
        <STextName>{history?.name}</STextName>
        <STextTitle>{`Khách đã ghé thăm ${history?.late} lần`}</STextTitle>
        <STextTime>{`Lần cuối ghé thăm vào ${history?.date}`}</STextTime>
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
  font-size: 18px;
  line-height: 22px;
  font-family: Roboto;
  color: ${Colors.blue};
`;
const STextTitle = styled.Text`
  font-size: 15px;
  line-height: 20px;
`;
const STextTime = styled.Text`
  font-size: 13px;
  line-height: 18px;
  font-family: Roboto-Medium;
  color: ${Colors.grey3};
  padding-bottom: 8px;
`;
