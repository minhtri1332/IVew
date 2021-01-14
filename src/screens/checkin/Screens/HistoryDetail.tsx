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
  const rightHeader = useMemo(() => {
    return <SIcon source={IC_EDIT} size={24} />;
  }, []);

  return (
    <ScreenWrapper>
      <HeaderBack title={'Chi tiết khách hàng'} right={rightHeader} />
      <SViewAvatar>
        <SAvatar
          source={{
            uri:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1_YImJiJsDBeVjqy19Tq6M7MchZafcD32mg&usqp=CAU',
          }}
          size={100}
        />
        <STextName>{history?.value}</STextName>
      </SViewAvatar>

      <Item label={'Độ tuổi'} divider={true}>
        <ItemContent>32</ItemContent>
      </Item>
      <Item label={'Cảm xúc'} divider={true}>
        <ItemContent>Surprised</ItemContent>
      </Item>
      <Item label={'Số lần ghé thăm'} divider={true}>
        <ItemContent>12</ItemContent>
      </Item>
      <Item label={'Ghé thăm lại'} divider={true}>
        <ItemContent>Store 1</ItemContent>
      </Item>
      <Item label={'Ngày/giờ'} divider={true}>
        <ItemContent>{moment().format('DD/MM/YYYY HH:mm')}</ItemContent>
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
