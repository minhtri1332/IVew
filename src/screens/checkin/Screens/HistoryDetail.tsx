import React, {memo, useCallback, useMemo, useState} from 'react';
import {styled} from '@/global';
import {ScreenWrapper} from '@/themes/BaseStyles';
import {HeaderBack} from '@/components/HeaderBack';
import {useNavigationParams} from '@/hooks/useNavigationParams';
import {SIcon} from '@/themes/BaseStyles';
import {IC_ARROW, IC_EDIT, IC_LOGO} from '@/assets';
import {SAvatar} from '@/themes/BaseStyles';
import {Item, ItemContent} from '@/components/ViewItem';
import moment from 'moment';
import {useHistory} from '@/store/history';

export interface HistoryDetailProps {
  id: string;
}

export const HistoryDetail = memo(function HistoryDetail() {
  const {id} = useNavigationParams<HistoryDetailProps>();
  const history = useHistory(id);

  return (
    <ScreenWrapper>
      <HeaderBack title={'Chi tiết'} />
      <SViewAvatar>
        <SAvatar
          source={{
            uri: history?.image,
          }}
          size={100}
        />
        <STextName>{history?.name}</STextName>
      </SViewAvatar>

      <Item label={'Checkin'} divider={true}>
        <ItemContent>{history?.checkIn}</ItemContent>
      </Item>
      <Item label={'Checkout'} divider={true}>
        <ItemContent>{history?.checkOut}</ItemContent>
      </Item>
      <Item label={'Phòng ban'}>
        <ItemContent>{history?.department}</ItemContent>
      </Item>
    </ScreenWrapper>
  );
});

const SViewAvatar = styled.View`
  align-items: center;
  margin: 16px;
`;

const STextName = styled.Text`
  font-family: Roboto-Medium;
  font-size: 20px;
  align-items: center;
  margin: 16px;
`;
