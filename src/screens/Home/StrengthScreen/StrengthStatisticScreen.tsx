import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { ScreenWrapper } from "@/common/CommonStyles";
import { DynamicHeader } from "@/componens/Header/DynamicHeader";
import { styled, useAsyncFn } from "@/global";
import { Colors } from "@/themes/Colors";
import moment from "moment";
import {
  RawDataStrengthGoal,
  requestHitsStatistic,
  requestStrengthStatistic,
} from "@/store/home/function";
import BarChartComponent from "@/screens/Home/HitScreen/BarChartComponent";
import GradientText from "@/componens/Gradient/TextGradient";
import TabHeaderSelectTime, {
  paramFilter,
} from "@/screens/Home/components/TabHeaderSelectTime";
import PieChartHome from "@/screens/Home/components/PieChartHome";
import { processColor, ScrollView } from "react-native";

export const StrengthStatisticScreen = memo(function StrengthStatisticScreen() {
  const [paramFilter, setParamFilter] = useState<paramFilter>({
    statisticType: "byWeek",
    dateStart: moment(new Date()).startOf("isoWeek").unix(),
    dateEnd: moment(new Date()).endOf("isoWeek").unix(),
  });
  const [dataHitStatic, setDataHitStatic] = useState({
    list_strength: [],
    stat: [],
  });

  const setParamCustom = useCallback(
    (keyName: string, value: string) => {
      setParamFilter({ ...paramFilter, [keyName]: value });
    },
    [paramFilter]
  );

  const dataStrength = useMemo(() => {
    return {
      strength: 0,
      strength_goal: 0,
      list_point: dataHitStatic?.stat || [],
    } as RawDataStrengthGoal;
  }, [dataHitStatic]);

  const [{ loading }, onConfirm] = useAsyncFn(async () => {
    const strengthStatic = await requestStrengthStatistic(paramFilter);
    setDataHitStatic(strengthStatic);
  }, [paramFilter]);

  useEffect(() => {
    onConfirm().then();
  }, [paramFilter]);

  return (
    <ScreenWrapper>
      <DynamicHeader title={"Sức mạnh"} />

      <ScrollView contentContainerStyle={{ paddingBottom: 70 }}>
        <TabHeaderSelectTime
          params={paramFilter}
          setParamCustom={setParamCustom}
          setParamFilter={setParamFilter}
        />
        {!loading && dataStrength?.list_point?.length > 0 && (
          <SViewContent>
            <PieChartHome dataStrength={dataStrength} />
          </SViewContent>
        )}
        {!loading && (
          <BarChartComponent
            listData={dataHitStatic.list_strength}
            params={paramFilter}
          />
        )}
      </ScrollView>
    </ScreenWrapper>
  );
});

const SViewContent = styled.View`
  width: 100%;
  height: 200px;
  padding-right: 16px;
  margin-top: -20px;
`;

export default StrengthStatisticScreen;
