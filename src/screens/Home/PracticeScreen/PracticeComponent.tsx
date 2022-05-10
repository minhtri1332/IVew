import React, { memo, useCallback, useEffect } from "react";
import SectionContainerStyle from "@/componens/View/SectionView";
import { IC_CHART, IC_HISTORY } from "@/assets";
import { Colors } from "@/themes/Colors";
import { styled, useAsyncFn } from "@/global";
import BaseProgressView from "@/componens/View/BaseProgressView";
import { requestListPractice } from "@/store/home/function";
import { navigateToPracticeDetailScreen } from "@/ultils/navigation";
import { usePracticeByQuery } from "@/store/home";

export const PracticeComponent = memo(function PracticeComponent() {
  const data = usePracticeByQuery("all");
  const goToStatistic = useCallback(() => {}, []);

  const [{ loading }, getData] = useAsyncFn(async () => {
    await requestListPractice();
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <SectionContainerStyle
      title={"Bài tập gần nhất"}
      iconLeft={IC_HISTORY}
      iconRight={IC_CHART}
      rightAction={goToStatistic}
    >
      <Progress
        progress={0.1}
        hightLightColor={Colors.blue1}
        barColor={Colors.orange1}
      />
      <SViewContent>
        {(data || []).map((item, index) => {
          return <ItemPractice practiceId={item} index={index} key={item} />;
        })}
      </SViewContent>
    </SectionContainerStyle>
  );
});

const Progress = styled(BaseProgressView)`
  height: 4px;
`;

const SViewContent = styled.View``;

export default PracticeComponent;

export const ItemPractice = memo(function ItemPractice({
  practiceId,
  index,
}: {
  practiceId: string;
  index: number;
}) {
  const onPressItem = useCallback(() => {
    navigateToPracticeDetailScreen({ practiceId });
  }, [practiceId]);

  return (
    <SViewItem onPress={onPressItem}>
      <SText>Bài tập: {index + 1}</SText>
    </SViewItem>
  );
});

const SViewItem = styled.TouchableOpacity`
  margin: 16px;
`;
const SText = styled.Text`
  color: ${Colors.colorText};
`;
