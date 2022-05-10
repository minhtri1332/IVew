import React, { memo, useCallback, useEffect, useState } from "react";
import { ScreenWrapper } from "@/common/CommonStyles";
import { DynamicHeader } from "@/componens/Header/DynamicHeader";
import { styled, useAsyncFn } from "@/global";
import { Colors } from "@/themes/Colors";
import BarChartComponent from "@/screens/Home/HitScreen/BarChartComponent";
import GradientText from "@/componens/Gradient/TextGradient";
import TabHeaderSelectTime, {
  paramFilter,
} from "@/screens/Home/components/TabHeaderSelectTime";
import moment from "moment";
import { requestHitsStatistic } from "@/store/home/function";
import messaging from "@react-native-firebase/messaging";
import { requestTokenDevice } from "@/store/auth/function";

export const HitStatisticScreen = memo(function HitStatisticScreen() {
  const [paramFilter, setParamFilter] = useState<paramFilter>({
    statisticType: "byWeek",
    dateStart: moment(new Date()).startOf("isoWeek").unix(),
    dateEnd: moment(new Date()).endOf("isoWeek").unix(),
  });
  const [dataHitStatic, setDataHitStatic] = useState<number[]>([]);

  const setParamCustom = useCallback(
    (keyName: string, value: string) => {
      setParamFilter({
        ...paramFilter,
        [keyName]: value,
      });
    },
    [paramFilter]
  );

  const [{ loading }, onConfirm] = useAsyncFn(async () => {
    const strengthStatic = await requestHitsStatistic(paramFilter);

    setDataHitStatic(strengthStatic);
  }, [paramFilter]);

  useEffect(() => {
    onConfirm().then();
  }, [paramFilter]);

  return (
    <ScreenWrapper>
      <DynamicHeader title={"Thống kê"} />
      <TabHeaderSelectTime
        params={paramFilter}
        setParamCustom={setParamCustom}
        setParamFilter={setParamFilter}
      />

      {!loading && (
        <BarChartComponent listData={dataHitStatic} params={paramFilter} />
      )}
      <SViewTextHit>
        <STextGradient>1000 </STextGradient>
        <SText>đòn đánh</SText>
      </SViewTextHit>
    </ScreenWrapper>
  );
});

const SViewTextHit = styled.View`
  align-self: center;
  margin-top: 50px;
  flex-direction: row;
`;

const SText = styled.Text`
  color: ${Colors.colorText};
  font-size: 30px;
  font-family: Roboto-Medium;
`;

const STextGradient = styled(GradientText)`
  font-size: 30px;
  font-family: Roboto-Medium;
`;

export default HitStatisticScreen;
