import React from 'react';
import {StyleSheet} from 'react-native';
import ScrollableTabView, {
  ScrollableTabBar,
  DefaultTabBar,
} from 'react-native-scrollable-tab-view';
import {Colors} from '@/themes/Colors';
import {styled} from '@/global';

const SScrollableTabBar = styled(ScrollableTabBar)`
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.black10};
  height: 44px;
`;

const SDefaultTabBar = styled(DefaultTabBar)`
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.black10};
  height: 44px;
`;
const renderTabBar = (props: any) => {
  return (
    <SScrollableTabBar
      tabsContainerStyle={styles.tabsContainerStyle}
      {...props}
    />
  );
};

const renderDefaultTabBar = () => <SDefaultTabBar tabStyle={styles.tabStyle} />;

const styles = StyleSheet.create({
  tabStyle: {
    paddingBottom: 0,
  },
  tabsContainerStyle: {
    height: 43,
  },
  tabBarTextStyle: {
    fontFamily: 'Roboto-Medium',
    borderBottomWidth: 0,
    paddingBottom: 4,
    alignItems: 'center',
    textAlignVertical: 'center',
  },
  defaultTabBarTextStyle: {
    fontFamily: 'Roboto-Medium',
    borderBottomWidth: 0,
    alignItems: 'center',
    textAlignVertical: 'center',
  },
  tabBarUnderline: {
    height: 3,
    backgroundColor: Colors.blue1,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});

export const STabView = styled(ScrollableTabView).attrs({
  tabBarTextStyle: styles.tabBarTextStyle,
  tabBarInactiveTextColor: Colors.grey1,
  tabBarActiveTextColor: Colors.red1,
  tabBarUnderlineStyle: styles.tabBarUnderline,
  renderTabBar: renderTabBar,
})``;

export const SDefaultTabView = styled(ScrollableTabView).attrs({
  tabBarTextStyle: styles.defaultTabBarTextStyle,
  tabBarInactiveTextColor: Colors.grey3,
  tabBarActiveTextColor: Colors.blue1,
  tabBarUnderlineStyle: styles.tabBarUnderline,
  renderTabBar: renderDefaultTabBar,
})``;

export const TabViewItem = styled.View<{tabLabel: string}>`
  flex: 1;
  background-color: coral;
`;
