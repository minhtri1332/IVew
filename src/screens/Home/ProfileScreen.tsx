import React, {memo, useState} from 'react';
import {styled} from '@/global';
import {Image, StyleSheet, Text, View} from 'react-native';
import {HeaderBack} from '@/components/HeaderBack';
import {useAsyncEffect} from '@/hooks/useAsyncEffect';
import {requestProfile} from '@/store/auth/function';

export const ProfileScreen = memo(function ProfileScreen() {
  const [user, setUser] = useState({name: '', email: '', phoneNumber: ''});
  const {call, loading} = useAsyncEffect(async () => {
    const user = await requestProfile();
    setUser(user);
  }, []);

  return (
    <SView>
      <View style={styles.avatarContainer}>
        <HeaderBack title={'Thông tin người dùng'} />

        <Image
          style={styles.avatar}
          source={{
            uri:
              'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
          }}
        />
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
    </SView>
  );
});

const SView = styled.View`
  flex: 1;
`;
const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginTop: 30,
    alignItems: 'center',
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
