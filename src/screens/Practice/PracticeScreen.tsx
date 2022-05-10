import React, { memo } from "react";
import { Text, View } from "react-native";
import { DynamicHeader } from "@/componens/Header/DynamicHeader";
import { ScreenWrapper } from "@/common/CommonStyles";

export const PracticeScreen = memo(function PracticeScreen() {
  return (
    <ScreenWrapper>
      <DynamicHeader title={"Comming soon"} />
      <Text>Comming soon</Text>
    </ScreenWrapper>
  );
});

export default PracticeScreen;
