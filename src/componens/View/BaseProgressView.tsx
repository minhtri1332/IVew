import React from "react";
import { memo, useMemo } from "react";
import styled from "styled-components/native";
import { Colors } from "@/themes/Colors";

interface Props {
  height?: number;
  hightLightColor?: string;
  barColor?: string;
  progress: number;
  style?: {};
}

const BaseProgressView = memo((props: Props) => {
  const height = useMemo((): number => {
    if (props.height != null) {
      return props.height;
    }
    return 10;
  }, [props.height]);

  const barBackgroundColor = useMemo(() => {
    if (props.barColor == null) {
      return Colors.backgroundColor;
    }
    return props.barColor;
  }, [props.barColor]);

  const hightlightBarColor = useMemo(() => {
    if (props.hightLightColor == null) {
      return Colors.grey6;
    }
    return props.hightLightColor;
  }, [props.hightLightColor]);

  return (
    <RootView color={barBackgroundColor} height={height} style={props.style}>
      <ProgressBar
        color={hightlightBarColor}
        height={height}
        progress={props.progress}
      />
    </RootView>
  );
});

export default BaseProgressView;

const RootView = styled.View<{ color: string; height: number }>`
  background-color: ${(props) => props.color};
  height: ${(props) => props.height}px;
  border-radius: ${(props) => props.height / 2}px;
`;

const ProgressBar = styled.View<{
  color: string;
  progress: number;
  height: number;
}>`
  flex: 1;
  height: ${(props) => props.height}px;
  background-color: ${(props) => props.color};
  width: ${(props) => {
    let value = props.progress * 100;
    return value > 100 ? "100%" : value + "%";
  }};
`;
