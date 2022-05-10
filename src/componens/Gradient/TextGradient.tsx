import MaskedView from "@react-native-masked-view/masked-view";
import { Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Colors } from "@/themes/Colors";
import React, { memo } from "react";

const GradientText = (props: any) => {
  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient
        colors={[Colors.red1, Colors.orange1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text {...props} style={[props.style, { opacity: 0 }]} />
      </LinearGradient>
    </MaskedView>
  );
};

export default memo(GradientText);
