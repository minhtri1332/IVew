import React, { memo, useCallback } from "react";
import SectionContainerStyle from "@/componens/View/SectionView";
import { IC_CHART, IC_POWER } from "@/assets";
import { Colors } from "@/themes/Colors";
import { styled } from "@/global";
import BaseProgressView from "@/componens/View/BaseProgressView";
import PieChartHome from "@/screens/Home/components/PieChartHome";
import { RawDataStrengthGoal } from "@/store/home/function";
import {
  navigateToHitStatisticScreen,
  navigateToStrengthStatisticScreen,
} from "@/ultils/navigation";

interface PowerProps {
  dataStrength: RawDataStrengthGoal;
}

export const PowerComponent = memo(function PowerComponent(props: PowerProps) {
  const { dataStrength } = props;

  const goToStatistic = useCallback(() => {
    navigateToStrengthStatisticScreen();
  }, []);

  return (
    <SectionContainerStyle
      title={"Sức mạnh"}
      iconLeft={IC_POWER}
      iconRight={IC_CHART}
      rightAction={goToStatistic}
    >
      <Progress
        progress={0.1}
        hightLightColor={Colors.blue1}
        barColor={Colors.orange1}
      />
      <SViewContent>
        <PieChartHome dataStrength={dataStrength} />
      </SViewContent>
    </SectionContainerStyle>
  );
});

const Progress = styled(BaseProgressView)`
  height: 4px;
`;

const SViewContent = styled.View`
  flex: 1;

`;

export default PowerComponent;
