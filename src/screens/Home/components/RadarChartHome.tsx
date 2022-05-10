import React, { memo, useMemo } from "react";
import { RadarChart } from "react-native-charts-wrapper";
import { processColor, StyleSheet, View } from "react-native";
import { Colors } from "@/themes/Colors";

export const RadarChartHome = memo(function RadarChartHome() {
  const data = useMemo(() => {
    return {
      dataSets: [
        {
          values: [
            { value: 100 },
            { value: 110 },
            { value: 105 },
            { value: 115 },
            { value: 110 },
          ],
          label: "DS 1",
          config: {
            color: processColor(Colors.red1),
            drawFilled: true,
            fillColor: processColor(Colors.red1),
            valueTextColor: processColor("transparent"),
            fillAlpha: 1000,
            lineWidth: 2,
          },
        },
      ],
    };
  }, []);

  const xAxis = useMemo(() => {
    return {
      valueFormatter: [
        "Sức mạnh",
        "Chăm chỉ",
        "Phản xạ",
        "Đòn đánh",
        "Sức bền",
      ],
      textColor: processColor(Colors.colorText),
    };
  }, []);

  const legend = useMemo(() => {
    return {
      enabled: false,
      textSize: 14,
      drawInside: false,
      wordWrapEnabled: false,
    };
  }, []);

  return (
    <View style={styles.container}>
      <RadarChart
        style={styles.chart}
        data={data || undefined}
        xAxis={xAxis}
        yAxis={{ drawLabels: false }}
        chartDescription={{ text: "" }}
        legend={legend}
        drawWeb={true}
        webLineWidth={0.5}
        webLineWidthInner={0.5}
        webAlpha={255}
        webColor={processColor(Colors.colorText)}
        webColorInner={processColor(Colors.colorText)}
        skipWebLineCount={1}
        onChange={(event) => console.log(event.nativeEvent)}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    height: 180,
    width: 180,
  },
  chart: {
    flex: 1,
  },
});

export default RadarChartHome;
