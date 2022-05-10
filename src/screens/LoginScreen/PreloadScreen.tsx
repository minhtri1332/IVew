import React, {memo, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import NavigationService from '@/services/NavigationService';
import {ScreenWrapper} from '@/common/CommonStyles';
import {LoginForm} from '@/screens/LoginScreen/LoginForm';
import {fScale, fTabletScale, screenShortDimension} from '@/ultils/scale';
import {styled} from '@/global';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {isTablet} from 'react-native-device-info';
import {useDeviceOrientation} from '@react-native-community/hooks';
import {useSetupLanguage} from '@/languages';

const HEIGHT_IN_PORTRAIT = isTablet()
  ? fScale(80)
  : screenShortDimension <= 320
  ? 13
  : 43;

export const PreloadScreen = memo(function PreloadScreen() {
  const orientation = useDeviceOrientation();
  useSetupLanguage();
  const navigation: any = useNavigation();
  useEffect(() => {
    NavigationService.navigator = navigation;
  }, [navigation]);

  return (
    <ScreenWrapper>
      {/*<SImageBackground source={IMG_LOGIN_THEME} />*/}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        <KeyboardAvoidingView
          keyboardVerticalOffset={-100}
          behavior={'position'}
        >
          <UpperContainer>
            {/*<Spacer landscape={orientation.landscape} />*/}
            {/*<Logo />*/}
            {/*<Spacer landscape={orientation.landscape} />*/}
            <LoginForm />
          </UpperContainer>
        </KeyboardAvoidingView>
      </ScrollView>
    </ScreenWrapper>
  );
});

export default PreloadScreen;

const SImageBackground = styled.Image`
  flex: 1;
  width: 100%;
  position: absolute;
`;

const UpperContainer = styled.View`
  width: 100%;
  align-items: center;
  flex: 1;
`;

const Spacer = styled.View<{landscape: boolean}>`
  height: ${() =>
    HEIGHT_IN_PORTRAIT +
    (Platform.OS === 'ios' ? getStatusBarHeight(true) : 0)}px;
  width: 100%;
`;

const styles = StyleSheet.create({
  scrollView: {
    flex: 12,
    width: '100%',
  },
  scrollViewContent: {
    alignItems: 'center',
    flex: 1,
  },
  indicatorContainer: {
    width: '100%',
    marginTop: fTabletScale(42),
  },
});
