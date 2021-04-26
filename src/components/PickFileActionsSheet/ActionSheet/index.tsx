import {styled} from '@/global';
import Modal from 'react-native-modal';
import * as React from 'react';
import {ComponentProps, memo, PropsWithChildren, useEffect} from 'react';
import {
  ActivityIndicatorProps,
  Image,
  ImageProps,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '@/themes/Colors';

const SWrapper = styled(Modal)`
  margin: 0;
  justify-content: flex-end;
`;

const SContainer = styled.View`
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  background-color: ${Colors.white};
`;

interface Props {
  isVisible: boolean;
  onCloseRequest: () => any;
}
export const ActionSheetWrapper = memo(
  ({isVisible, onCloseRequest, children}: PropsWithChildren<Props>) => {
    useEffect(() => {
      isVisible && Keyboard.dismiss();
    }, [isVisible]);

    return (
      <SWrapper
        isVisible={isVisible}
        swipeDirection={'down'}
        onSwipeComplete={onCloseRequest}
        onDismiss={onCloseRequest}
        onBackdropPress={onCloseRequest}
        onBackButtonPress={onCloseRequest}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropTransitionOutTiming={0}
        avoidKeyboard={true}>
        <SContainer>{children}</SContainer>
      </SWrapper>
    );
  },
);

const SHeader = styled.View`
  height: 44px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom-width: 0.5px;
  border-bottom-color: ${Colors.grey4};
`;
const STitle = styled.Text`
  font-size: 17px;
  font-family: Roboto-Medium;
  color: ${Colors.grey1};
  flex: 1;
`;

const SCloseIcon = styled.Image`
  color: ${Colors.grey4};
  font-size: 24px;
  height: 40px;
  line-height: 40px;
  margin-left: 16px;
`;
interface ActionSheetHeaderProps {
  title: string;
  onCloseRequest?: () => any;
}
export const ActionSheetHeader = memo(
  ({title, onCloseRequest}: ActionSheetHeaderProps) => {
    return (
      <SHeader>
        <STitle numberOfLines={1}>{title}</STitle>
        {!!onCloseRequest && (
          <SCloseIcon name={'close'} onPress={onCloseRequest} />
        )}
      </SHeader>
    );
  },
);

const SRow = styled.TouchableOpacity`
  flex-flow: row;
  align-items: center;
  height: 44px;
  padding: 0 16px;
`;

const SIcon = styled.Image`
  width: 24px;
  height: 24px;
  margin-right: 16px;
  color: ${Colors.grey1};
`;

const SText = styled.Text`
  font-size: 15px;
  color: ${Colors.grey1};
`;

const LoadingIndicator = styled.ActivityIndicator.attrs(
  ({}): ActivityIndicatorProps => ({
    size: 24,
    color: Colors.red0,
  }),
)`
  margin-right: 8px;
`;

interface ActionSheetRowProps {
  iconName: any;
  text: string;
  onPress: ComponentProps<typeof TouchableOpacity>['onPress'];
  isLoading?: boolean;
}
export const ActionSheetRow = memo(
  ({iconName, text, onPress, isLoading}: ActionSheetRowProps) => {
    return (
      <SRow onPress={onPress}>
        {isLoading ? <LoadingIndicator /> : <SIcon source={iconName} />}
        <SText>{text}</SText>
      </SRow>
    );
  },
);
