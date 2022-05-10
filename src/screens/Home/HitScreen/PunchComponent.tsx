import React, { memo, useCallback } from "react";
import SectionContainerStyle from "@/componens/View/SectionView";
import { IC_CHART, IC_PUNCH } from "@/assets";
import { Colors } from "@/themes/Colors";
import { styled } from "@/global";
import BaseProgressView from "@/componens/View/BaseProgressView";
import GradientText from "@/componens/Gradient/TextGradient";
import { RawDataGoal } from "@/store/home/function";
import {
  navigateToHitStatisticScreen,
  navigateToStrengthStatisticScreen,
} from "@/ultils/navigation";

interface PunchProps {
  dataHit: RawDataGoal;
}

export const PunchComponent = memo(function PunchComponent(props: PunchProps) {
  const { dataHit } = props;

  const goToStatistic = useCallback(() => {
    navigateToHitStatisticScreen();
  }, []);

  return (
    <SectionContainerStyle
      title={"Đòn đánh"}
      iconLeft={IC_PUNCH}
      iconRight={IC_CHART}
      rightAction={goToStatistic}
      key={1}
    >
      <Progress
        progress={0.1}
        hightLightColor={Colors.blue1}
        barColor={Colors.orange1}
      />
      <SViewContent>
        <SViewItem>
          <STextNumberPunch>{dataHit?.total_hits || 0}</STextNumberPunch>
          <STextTitlePunch>Đòn đánh</STextTitlePunch>
        </SViewItem>
        <SViewItem>
          <STextTitleGoal>Mục tiêu</STextTitleGoal>
          <STextNumberGoal>{dataHit?.goal || 0}</STextNumberGoal>
        </SViewItem>
      </SViewContent>
    </SectionContainerStyle>
  );
});

const Progress = styled(BaseProgressView)`
  height: 4px;
`;

const STextNumberPunch = styled(GradientText)`
  color: ${Colors.colorText};
  font-size: 30px;
  padding-bottom: 8px;
  font-family: Roboto-Medium;
`;
const STextTitlePunch = styled.Text`
  color: ${Colors.colorText};
  font-family: Roboto-Medium;
  font-size: 30px;
`;

const STextNumberGoal = styled.Text`
  color: ${Colors.colorText};
  font-size: 20px;
  padding-bottom: 8px;
  padding-top: 20px;
`;
const STextTitleGoal = styled.Text`
  color: ${Colors.colorText};
  font-family: Roboto-Medium;
  font-size: 18px;
  margin-top: 6px;
`;

const SViewItem = styled.View`
  flex: 1;
  align-items: center;
  padding: 16px 0;
`;

const SViewContent = styled.View`
  flex-direction: row;
`;

export default PunchComponent;
