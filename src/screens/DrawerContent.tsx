import React, {memo, useCallback} from 'react';
import {Animated, ImageSourcePropType, ScrollView, StyleSheet, Text, TouchableOpacityProps, View} from 'react-native';

import {Colors} from '@/themes/Colors';
import {styled} from '@/global';
import {IC_TAB_APPS, IC_TAB_COMPANY, IC_TAB_HOME, IC_USER} from '@/assets';
import {getStatusBarHeight} from 'react-native-status-bar-height';

interface Props {}

const Header = styled(Animated.View)`
  flex: 1;
  padding-top: ${getStatusBarHeight() + 20}px;
  padding-bottom: 20px;
  background-color: ${Colors.backgroundColor};
  align-items: center;
  justify-content: center;
`;

const ImageHeader = styled.View`
  height: 100px;
  width: 100px;
  border-radius: 50px;
  background-color: white;
`;

const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  color: ${Colors.white};
  padding-top: 16px;
`;

interface ItemProps extends TouchableOpacityProps {
  icon: ImageSourcePropType;
  title: string;
  color?: string;
  bold?: boolean;
}
const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
  height: 56px;
`;
const ItemIcon = styled.Image<{color?: string}>`
  width: 24px;
  height: 24px;
  tint-color: ${(props) => props.color || Colors.gray1};
`;
const ItemTitle = styled.Text<{color?: string; bold?: boolean}>`
  font-size: 16px;
  color: ${(props) => props.color || Colors.gray1};
  padding-left: 16px;
  font-weight: ${(p) => (p.bold ? 'bold' : 'normal')};
`;

const SubView = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 0 20px 0 44px;
  height: 56px;
`;

const Item = memo((props: ItemProps) => {
  const {icon, title, color, bold, ...restProps} = props;

  return (
    <ItemContainer {...restProps}>
      <ItemIcon source={icon} color={color} />
      <ItemTitle color={color} bold={bold}>
        {title}
      </ItemTitle>
    </ItemContainer>
  );
});
export const DrawerContent = memo(function DrawerContent(props: Props) {
  const hideDrawer = useCallback(() => {
    // @ts-ignore
    props && props.navigation && props.navigation.closeDrawer();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <Header>
          <ImageHeader
          />
          <HeaderTitle>
              Nguyễn Quyết Định
          </HeaderTitle>
        </Header>
        <Item icon={IC_TAB_HOME}
              title={'Trang chủ'}
              onPress={hideDrawer} />

        <Item
          icon={IC_TAB_COMPANY}
          title={'Cảnh báo'}

        />
        <Item
            icon={IC_TAB_APPS}
            title={'Cài đặt'}

        />
            <Item
              icon={IC_USER}
              title={'Đăng nhập'}

            />
      </ScrollView>
      <View style={styles.bottom}>
        <Text style={styles.bottomText} numberOfLines={1}>
          Phiên bản 1.0
        </Text>
      </View>
    </View>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  bottom: {
    height: 40,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 12,
    borderTopColor: Colors.black10,
    borderTopWidth: 1,
  },
  bottomText: {
    fontSize: 12,
    lineHeight: 15,
    color: Colors.gray3,
  },
  iconRight: {width: 20, height: 20},
});
