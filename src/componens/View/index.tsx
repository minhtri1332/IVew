import { Image, ImageSourcePropType, ImageStyle } from "react-native";
import React, { memo } from "react";
export const CssImage = ({
  source,
  size,
  ...props
}: ImageStyle & { source: ImageSourcePropType; size: number }) => {
  return (
    <Image
      source={source}
      style={size ? [props, { height: size, width: size }] : props}
    />
  );
};
