import React, {memo, PropsWithChildren, useEffect} from 'react';
import Modal, {ModalProps} from 'react-native-modal';
import {StatusBar, StyleSheet} from 'react-native';

interface OwnProps extends Partial<ModalProps> {
  isVisible: boolean;
  onClose?: () => void;
}

type Props = OwnProps;

export const BottomMenuModal = memo(
  ({onClose, children, ...rest}: PropsWithChildren<Props>) => {
    useEffect(() => {
      let stack = rest.isVisible
        ? StatusBar.pushStackEntry({
            translucent: true,
            showHideTransition: 'fade',
            networkActivityIndicatorVisible: true,
            animated: true,
            backgroundColor: 'rgba(0,0,0,0.4)',
            hidden: false,
            barStyle: 'light-content',
          })
        : null;
      return () => {
        stack && StatusBar.popStackEntry(stack);
      };
    }, [rest.isVisible]);

    return (
      <Modal
        style={styles.modal}
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
        onSwipeComplete={onClose}
        backdropTransitionOutTiming={0}
        swipeDirection="down"
        swipeThreshold={50}
        backdropOpacity={0.4}
        {...rest}>
        {children}
      </Modal>
    );
  },
);

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
