import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import useColor from "@/hooks/useColor";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  row?: boolean;
  centerX?: boolean;
  centerY?: boolean;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  row = false,
  centerX = false,
  centerY = false,
  ...otherProps
}: ThemedViewProps) {
  const color = useColor();

  return (
    <View
      style={[
        {
          flexDirection: row ? "row" : "column",
          alignItems: centerY ? "center" : "flex-start",
          justifyContent: centerX ? "center" : "flex-start",
        },
        style,
      ]}
      {...otherProps}
    />
  );
}
