import React, {memo} from 'react';
import {ScreenWrapper} from '@/themes/BaseStyles';
import {HeaderBack} from '@/components/HeaderBack';
import {SDefaultTabView, TabViewItem} from '@/components/Tabs/TabView';
import TabEmployeeCheckin from '@/screens/checkin/Tabs/TabEmployeeCheckin';
import TabCustomerCheckin from '@/screens/checkin/Tabs/TabCustomerCheckin';

export const HistoryScreen = memo(function HistoryScreen() {
  return (
    <ScreenWrapper>
      <HeaderBack title={'Lịch sử'} />

      <SDefaultTabView>
        <TabViewItem key={'1'} tabLabel={'Nhân viên'}>
          <TabEmployeeCheckin />
        </TabViewItem>
        <TabViewItem key={'2'} tabLabel={'Khách hàng'}>
          <TabCustomerCheckin />
        </TabViewItem>
      </SDefaultTabView>
    </ScreenWrapper>
  );
});
