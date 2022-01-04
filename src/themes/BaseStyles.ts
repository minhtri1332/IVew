import {StyleSheet} from 'react-native';
import {styled} from '@/global';
import {Colors} from '@/themes/Colors';
import FastImage from 'react-native-fast-image';

export const BaseStyles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  ph16: {
    paddingHorizontal: 16,
  },
  ph20: {
    paddingHorizontal: 20,
  },
  ph9: {
    paddingHorizontal: 9,
  },
  mt20: {
    marginTop: 20,
  },
  mt16: {
    marginTop: 16,
  },
  mt12: {
    marginTop: 12,
  },
  mb16: {
    marginBottom: 16,
  },
  mr16: {
    marginRight: 16,
  },
  ml16: {
    marginLeft: 16,
  },
  mr20: {
    marginRight: 20,
  },
  ml20: {
    marginLeft: 20,
  },
  pl20: {
    paddingLeft: 20,
  },
  mb20: {
    marginBottom: 20,
  },
  textShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 2},
    textShadowRadius: 3,
  },
  viewShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export const SAvatar = styled(FastImage)<{size?: number}>`
  width: ${(props: any) => props.size || 40};
  height: ${(props: any) => props.size || 40};
  border-radius: ${(props: any) => props.size || 40};
`;

export const SIcon = styled.Image<{size?: number; tintColor?: string}>`
  width: ${(props: any) => props.size || 24};
  height: ${(props: any) => props.size || 24};
  tint-color: ${(props: any) => props.tintColor || Colors.grey5};
`;

export const STextLabel = styled.Text<{size?: number}>`
  font-family: Roboto-Medium;
  font-size: ${(props: any) => props.size || 24};
  tint-color: ${Colors.grey1};
  margin: 16px 16px 8px 16px;
`;

export const ScreenWrapper = styled.View`
  flex: 1;
  background-color: ${Colors.white};
`;

export default ScreenWrapper;
