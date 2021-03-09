import React, {memo, useState} from 'react';
import {styled} from '@/global';
import {Image, StyleSheet, Text, View} from 'react-native';
import {HeaderBack} from '@/components/HeaderBack';
import {useAsyncEffect} from '@/hooks/useAsyncEffect';
import {requestProfile} from '@/store/auth/function';
import {LineSeparator, ViewLineSpace} from '@/components/LineSeparator';
import {ClickableItem, Item, ItemContent} from '@/components/ViewItem';
import {ScreenWrapper} from '@/themes/BaseStyles';
import {IC_LOGOUT, IC_VERSION} from '@/assets';
import {logout} from '@/utils/fetch';
import {Colors} from '@/themes/Colors';
import DeviceInfo from 'react-native-device-info';
import FastImage from 'react-native-fast-image';

export const ProfileScreen = memo(function ProfileScreen() {
  const [user, setUser] = useState({name: '', email: '', phoneNumber: ''});
  const buildVersion = DeviceInfo.getVersion();
  const {call, loading} = useAsyncEffect(async () => {
    const user = await requestProfile();
    setUser(user);
  }, []);

  return (
    <SView>
      <View style={styles.avatarContainer}>
        <HeaderBack title={'Thông tin người dùng'} />
        <SViewAvatar>
          <FastImage
            style={styles.avatar}
            source={{
              uri:
                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
            }}
          />
        </SViewAvatar>

        <View style={styles.infoContainer}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.nameText}>
            {user?.name}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.jobTitleText}>
            {user?.email} {user?.phoneNumber}
          </Text>
        </View>
      </View>
      <ViewLineSpace />

      <Item icon={IC_VERSION} label={'Phiên bản hiện tại'} divider={true}>
        <ItemContent>{buildVersion}</ItemContent>
      </Item>

      <ClickableItem
        onPress={logout}
        labelStyle={{color: Colors.red1}}
        iconStyle={{tintColor: Colors.red1}}
        icon={IC_LOGOUT}
        label={'Đăng xuất'}
        divider={true}></ClickableItem>
    </SView>
  );
});

const SView = styled.View`
  flex: 1;
`;
const SViewAvatar = styled.View`
  margin-top: 30px;
  border-radius: 100px;
  border-color: ${Colors.grey5};
  border-width: 1px;
`;

const styles = StyleSheet.create({
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 100,
    alignItems: 'center',
    borderColor: Colors.white,
    borderWidth: 2,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    paddingBottom: 16,
    paddingTop: 16,
    justifyContent: 'center',
  },
  nameText: {
    alignSelf: 'center',
    width: '100%',
    fontSize: 17,
  },
  jobTitleText: {
    width: '100%',
    alignSelf: 'center',
    marginTop: 3,
    fontSize: 13,
    lineHeight: 20,
  },
});
