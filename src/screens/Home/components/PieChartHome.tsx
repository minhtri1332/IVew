import React, { memo, useMemo } from "react";
import { PieChart } from "react-native-charts-wrapper";
import { processColor, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/themes/Colors";
import { styled } from "@/global";
import { RawDataStrengthGoal } from "@/store/home/function";

interface dataProps {
  dataStrength: RawDataStrengthGoal;
}
const color = ["#C31FE6", "#5A6FF0", "#FF0000", "#8CEAFF"];

export const PieChartHome = memo(function PieChartHome(props: dataProps) {
  const { dataStrength } = props;

  const valueStrength = useMemo(() => {
    let data: { value: number }[] = [];
    dataStrength?.list_point.map((item) => {
      data.push({ value: item });
    });
    return data;
  }, [dataStrength?.list_point]);

  const valueColor = useMemo(() => {
    let data: any[] = [];
    dataStrength?.list_point.map((item, index) => {
      if (item == 0) return;
      data.push(processColor(color[index]));
    });
    return data;
  }, [dataStrength?.list_point]);

  const data = useMemo(() => {
    return {
      dataSets: [
        {
          values: valueStrength,
          label: "",
          config: {
            colors: valueColor,
            valueLineColor: processColor("transparent"),
            sliceSpace: 2,
          },
        },
      ],
    };
  }, [valueStrength, valueColor]);

  const legend = useMemo(() => {
    return {
      enabled: false,
      formSize: 1000,
    };
  }, []);

  return (
    <View style={styles.container}>
      <PieChart
        style={styles.chart}
        logEnabled={false}
        data={data}
        chartDescription={{ text: "" }}
        legend={legend}
        drawEntryLabels={false}
        rotationEnabled={true}
        styledCenterText={{
          text: String(dataStrength?.strength.toFixed(0) || 0),
          color: processColor(Colors.colorText),
          size: 30,
        }}
        holeRadius={90}
        holeColor={processColor(Colors.colorTab)}
        maxAngle={1000}
        onSelect={() => {}}
        onChange={(event) => console.log(event.nativeEvent)}
      />
      <SViewWrapperNote>
        {dataStrength?.list_point?.map((item, index) => {
          return (
            <SViewItemNote key={index}>
              <SViewNote isColor={color[index]} />
              <STextNote isColor={Colors.grey4}>
                Point {index + 1}:{" "}
                <STextNote isColor={Colors.colorText}>
                  {item.toFixed(0)}
                </STextNote>
              </STextNote>
            </SViewItemNote>
          );
        })}

        <STextStrengthGoal>
          Mục tiêu: {dataStrength.strength_goal}
        </STextStrengthGoal>
      </SViewWrapperNote>
    </View>
  );
});

const SViewNote = styled.View<{ isColor: any }>`
  background-color: ${(props) => props.isColor};
  height: 15px;
  width: 15px;
`;

const STextNote = styled.Text<{ isColor: string }>`
  color: ${(props) => props.isColor};
  margin-left: 8px;
`;

const STextStrengthGoal = styled.Text`
  color: ${Colors.colorText};
  font-family: Roboto-Medium;
  padding-left: 10px;
  margin-top: 16px;
  font-size: 16px;
`;

const SViewItemNote = styled.View`
  align-self: center;
  flex-direction: row;
  margin-top: 8px;
  margin-left: 4px;
  width: 100px;
`;
const SViewWrapperNote = styled.View`
  margin-right: 16px;
  margin-top: 16px;
  padding-left: 50px;
`;

const styles = StyleSheet.create({
  container: {
    height: 170,
    flex: 1,
    flexDirection: "row",
  },
  chart: {
    flex: 1,
  },
});

export default PieChartHome;
