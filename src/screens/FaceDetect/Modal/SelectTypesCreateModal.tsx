import * as React from 'react';
import {memo, PropsWithChildren} from 'react';
import Modal, {ModalProps} from 'react-native-modal';
import {styled} from '@/global';
import {Colors} from '@/themes/Colors';
import {IC_CHECKIN_EMPLOYEE} from '@/assets';
interface Props extends Partial<ModalProps> {
  isVisible: boolean;
  onPressItem: (value: string) => void;
  onCloseRequest?: () => void;
}

const SelectTypesCreateModal = memo(function SelectTypesCreateModal({
  isVisible,
  onCloseRequest,
  onPressItem,
  children,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <Modal
      isVisible={isVisible}
      swipeDirection={'down'}
      onBackdropPress={onCloseRequest}
      onBackButtonPress={onCloseRequest}
      useNativeDriver={true}
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}
      hideModalContentWhileAnimating={true}
      style={{alignItems: 'center'}}
      {...props}>
      <SViewContainer>
        <SViewContainerHome
          onPress={() => {
            onPressItem('employee');
          }}>
          <SImage source={IC_CHECKIN_EMPLOYEE} />
          <STextLabel>Thêm nhân viên</STextLabel>
        </SViewContainerHome>

        <SViewContainerHome
          onPress={() => {
            onPressItem('customer');
          }}>
          <SImage source={IC_CHECKIN_EMPLOYEE} />
          <STextLabel>Thêm khách hàng</STextLabel>
        </SViewContainerHome>
      </SViewContainer>
    </Modal>
  );
});

const SViewContainer = styled.View`
  height: 130px;
  width: 100%;
  background-color: ${Colors.white};
  border-radius: 16px;
  flex-direction: row;
  justify-content: center;
`;

const SViewContainerHome = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 110px;
  height: 100px;
  margin: 16px 32px;
  border-radius: 30px;
  border-width: 1px;
  border-color: ${Colors.grey5};
`;
const STextLabel = styled.Text`
  font-family: Roboto;
  font-size: 12px;
`;

const SImage = styled.Image`
  width: 40px;
  height: 40px;
  margin-bottom: 8px;
`;

export default SelectTypesCreateModal;
