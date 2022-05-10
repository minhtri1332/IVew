import React, { memo, useMemo, useState } from "react";
import { BarChart } from "react-native-charts-wrapper";
import { processColor, StyleSheet, View } from "react-native";
import { Colors } from "@/themes/Colors";
import { paramFilter } from "@/screens/Home/components/TabHeaderSelectTime";
import moment from "moment";

interface dataProps {
  listData: number[];
  params: paramFilter;
}

export const BarChartComponent = memo(function BarChartComponent(
  props: dataProps
) {
  const { listData, params } = props;
  const [todayHighLight, setTodayHighLight] = useState(1);
  const valueChart = useMemo(() => {
    if (listData && listData?.length == 0) return [{ y: 0 }];

    return listData?.map((item) => {
      return { y: Number(item) || 0 };
    });
  }, [listData]);

  const data = useMemo(() => {
    return {
      dataSets: [
        {
          values: valueChart,
          label: "Bar dataSet",
          config: {
            barShadowColor: processColor(Colors.white),
            valueTextColor: processColor(Colors.colorText),
            chartBackgroundColor: processColor(Colors.colorText),
            textColor: processColor(Colors.colorText),
            color: processColor(Colors.blue3),
            highlightAlpha: 100,
            highlightColor: processColor(Colors.purple2),
          },
        },
      ],

      config: {
        barWidth: 0.6,
        autoScaleMinMaxEnabled: true,
        scaleYEnabled: true,
      },
    };
  }, [listData, valueChart, params.statisticType]);

  const legend = useMemo(() => {
    return {
      enabled: false,
      formSize: 1000,
      textColor: processColor(Colors.colorText),
    };
  }, []);

  const highlights = useMemo(() => {
    return [{ x: todayHighLight }];
  }, [todayHighLight]);

  const xAxisValueFormatter = useMemo(() => {
    if (params.statisticType !== "byYear") {
      const start = new Date(params.dateStart * 1000);
      const end = new Date(params.dateEnd * 1000);

      const daysBetween =
        (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
      const arr = [];

      for (let i = 0; i <= daysBetween; i++) {
        const temp = new Date();
        temp.setDate(start.getDate() + i);
        if (moment().format("DD") === moment(temp).format("DD")) {
          setTodayHighLight(i - 1);
        }
        arr.push(moment(temp).format("DD/MM"));
      }
      return arr;
    } else {
      const year = moment(params.dateStart, "X").format("YY");
      const arr = [];
      for (let i = 1; i < 13; i++) {
        arr.push(`${i}/${year}`);
      }
      return arr;
    }
  }, [params]);

  const xAxis = useMemo(() => {
    return {
      valueFormatter: xAxisValueFormatter,
      drawGridLines: false,
      drawAxisLine: false,
      granularityEnabled: true,
      granularity: 1,
      position: "BOTTOM",
      textColor: processColor(Colors.colorText),
    };
  }, [xAxisValueFormatter]);

  const yAxis = useMemo(() => {
    return {
      left: {
        drawLabels: true,
        drawAxisLine: false,
        drawGridLines: true,
        spaceTop: 0.4,
        textColor: processColor(Colors.colorText),
      },
      right: {
        drawLabels: false,
        drawAxisLine: false,
        drawGridLines: false,
        spaceTop: 0.4,
      },
    };
  }, [params.statisticType]);

  return (
    <View style={styles.container}>
      <BarChart
        marker={{ textColor: processColor("#ffffff") }}
        style={styles.chart}
        data={data}
        xAxis={xAxis}
        yAxis={yAxis}
        animation={{ durationX: 1000, easingX: "EaseInOutSine" }}
        legend={legend}
        gridBackgroundColor={processColor("#ffffff")}
        visibleRange={{ x: { min: 1, max: 8 } }}
        drawBarShadow={false}
        drawValueAboveBar={false}
        highlightFullBarEnabled={false}
        autoScaleMinMaxEnabled={true}
        onSelect={() => {}}
        highlights={highlights}
        onChange={(event) => console.log(event.nativeEvent)}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    height: 400,
  },
  chart: {
    flex: 1,
  },
});

export default BarChartComponent;
