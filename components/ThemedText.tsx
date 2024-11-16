import { Colors } from "@/constants/Colors";
import useColor from "@/hooks/useColor";
import { StyleSheet, Text, TextProps } from "react-native";

interface Props extends TextProps {
  type?: "default" | "defaultSemiBold" | "title" | "subtitle" | "link";
  color?: "light" | "dark";
}

export function ThemedText({ style, color, type = "default", ...rest }: Props) {
  const themeColor = useColor();
  const _style = styles[type];
  const _color =
    color === "light"
      ? Colors.dark.text
      : color === "dark"
      ? Colors.light.text
      : themeColor.text;

  return <Text style={[_style, { color: _color }, style]} {...rest} />;
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    // lineHeight: 24,
    fontFamily: "SF_Medium",
  },
  defaultSemiBold: {
    fontSize: 16,
    // lineHeight: 24,
    fontFamily: "SF_Semibold",
  },
  title: {
    fontSize: 32,
    fontFamily: "SF_Black",
    // lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "SF_Bold",
  },
  link: {
    // lineHeight: 30,
    fontSize: 16,
    fontFamily: "SF_Medium",
    color: "#0a7ea4",
  },
});
