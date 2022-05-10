import React, { memo, useCallback } from "react";
import { ScreenWrapper } from "@/common/CommonStyles";
import { styled, useAsyncFn } from "@/global";
import {
  BottomMenuContainer,
  BottomMenuHeader,
  BottomMenuModal,
} from "@/componens/BottomMenu";
import { InteractionManager, ScrollView, StyleSheet } from "react-native";
import { screenShortDimension } from "@/ultils/scale";
import {
  IMG_BACKGROUND_ACCORDING_LED,
  IMG_BACKGROUND_FREE_FIGHT,
} from "@/assets";
import { Colors } from "@/themes/Colors";
import ToastService from "@/services/ToastService";
import MachineIdService from "@/services/MachineIdService";
import { requestConnectMachineHitMode } from "@/store/mechine/function";
import { navigateToPracticingScreen } from "@/ultils/navigation";

interface PracticingBottomProps {
  isVisible: boolean;
  hideMenu: () => void;
}

export const PracticingBottomModal = memo(function PracticingBottomModal({
  isVisible,
  hideMenu,
}: PracticingBottomProps) {
  const [{ loading }, onPressFreeFight] = useAsyncFn(async () => {
    const machineId = MachineIdService.getMachineId();
    await requestConnectMachineHitMode(machineId, "5");
    hideMenu();
    InteractionManager.runAfterInteractions(() => {
      navigateToPracticingScreen();
    });
  }, [hideMenu]);

  const onPressAccordingLed = useCallback(() => {
    ToastService.show("Coming soon");
  }, []);

  return (
    <ScreenWrapper>
      <BottomMenuModal
        isVisible={isVisible}
        onClose={hideMenu}
        propagateSwipe={true}
      >
        <BottomMenuContainer>
          <BottomMenuHeader
            noDivider={true}
            title={"Chọn kiểu đánh"}
            onClose={hideMenu}
            onPressRight={hideMenu}
          />
          <ScrollView style={styles.maxHeightScroll}>
            <SViewItemStyleFight onPress={onPressFreeFight}>
              <SViewBackgroundItem source={IMG_BACKGROUND_FREE_FIGHT} />
              <SViewContainerText>
                <SViewTextItem>Đánh tự do</SViewTextItem>
                <SViewSubTextItem>Free fight</SViewSubTextItem>
              </SViewContainerText>
            </SViewItemStyleFight>
            <SViewItemStyleFight onPress={onPressAccordingLed}>
              <SViewBackgroundItem source={IMG_BACKGROUND_ACCORDING_LED} />
              <SViewContainerText>
                <SViewTextItem>Đánh theo Led</SViewTextItem>
                <SViewSubTextItem>According to led</SViewSubTextItem>
              </SViewContainerText>
            </SViewItemStyleFight>
          </ScrollView>
        </BottomMenuContainer>
      </BottomMenuModal>
    </ScreenWrapper>
  );
});

export default PracticingBottomModal;

const SViewItemStyleFight = styled.TouchableOpacity`
  margin: 16px 16px;
  height: 150px;
  border-width: 1px;
  border-color: ${Colors.red1};
`;
const SViewContainerText = styled.View`
  flex: 1;
  justify-content: center;
  align-self: center;
`;

const SViewBackgroundItem = styled.Image`
  width: 100%;
  height: 148px;
  border-radius: 4px;
  position: absolute;
`;

const SViewTextItem = styled.Text`
  font-family: Roboto-Medium;
  color: ${Colors.white};
  font-size: 35px;
`;
const SViewSubTextItem = styled.Text`
  color: ${Colors.white};
  align-self: center;
  font-size: 20px;
`;

const styles = StyleSheet.create({
  portrait: {
    width: "100%",
  },
  landscape: {
    width: "100%",
    maxHeight: screenShortDimension,
  },
  fullScreen: {
    width: "100%",
    height: "100%",
    maxHeight: "100%",
  },
  maxHeightScroll: {
    maxHeight: "100%",
  },
});
