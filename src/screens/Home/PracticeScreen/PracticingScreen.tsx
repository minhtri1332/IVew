import React, { memo, useCallback } from "react";
import { ScreenWrapper } from "@/common/CommonStyles";
import { DynamicHeader } from "@/componens/Header/DynamicHeader";
import TimeStartPractice from "@/screens/Home/PracticeScreen/TimeStartPractice";
import { styled, useAsyncFn } from "@/global";
import { Colors } from "@/themes/Colors";
import GradientButton from "@/componens/Gradient/ButtonGradient";
import { InteractionManager, Text } from "react-native";
import {
  goBack,
  navigateToPracticeDetailScreen,
  navigateToPracticingScreen,
} from "@/ultils/navigation";
import MachineIdService from "@/services/MachineIdService";
import { requestConnectMachineHitMode } from "@/store/mechine/function";

const a =
  "{" +
  "  mode: 5," +
  "  start_time1: 1651237128," +
  "  start_time2: 1025," +
  '  user_id: "64d91c69-6ebb-4b3e-afa1-a32bc54071aa",' +
  '  boxid: "nodeesp32",' +
  "  data: [" +
  "    { f: 26, p: 1, t: 2021 }," +
  "    { f: 13, p: 2, t: 2051 }," +
  "    { f: 26, p: 3, t: 3021 }," +
  "    { f: 13, p: 4, t: 3021 }," +
  "    { f: 26.72, p: 1, t: 3024 }," +
  "    { f: 13, p: 4, t: 3028 }," +
  "    { f: 27.86, p: 3, t: 3039 }," +
  "    { f: 13, p: 4, t: 5021 }," +
  "    { f: 26.7, p: 1, t: 5024 }," +
  "    { f: 13, p: 3, t: 7028 }," +
  "    { f: 27.86, p: 3, t: 6039 }," +
  "    { f: 13, p: 4, t: 6021 }," +
  "    { f: 26.7, p: 1, t: 9024 }," +
  "    { f: 13, p: 3, t: 10028 }," +
  "    { f: 27.86, p: 3, t: 12039 }," +
  "    { f: 13, p: 4, t: 13021 }," +
  "  ]," +
  "  end_time: 1651245362," +
  "}";
export interface PracticingScreenProps {}

export const PracticingScreen = memo(function PracticingScreen() {
  const [{ loading }, endPracticing] = useAsyncFn(async () => {
    const machineId = MachineIdService.getMachineId();
    await requestConnectMachineHitMode(machineId, "-1");
    goBack();
  }, []);

  return (
    <ScreenWrapper>
      <DynamicHeader title={"Tập luyện"} />

      <SText>
        <TimeStartPractice stopTime={450000000} />
      </SText>

      <SButtonPractice>
        <GradientButton
          loading={loading}
          label={"Kết thức tập luyện"}
          onPress={endPracticing}
        />
      </SButtonPractice>
    </ScreenWrapper>
  );
});

const SButtonPractice = styled.View`
  flex: 1;
  margin: 16px;
`;

const SText = styled.Text`
  justify-content: center;
  align-self: center;
  color: ${Colors.colorText};
  font-size: 30px;
  margin-top: 20px;
`;

export default PracticingScreen;
