import { StyleSheet, TextStyle, View, ViewProps } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import useColor from "@/hooks/useColor";

interface Props extends ViewProps {
  title: string;
  desc: string;
  stat: string;
  bgColor?: string;
  color?: string;
  titleStyle?: TextStyle;
  descriptionStyle?: TextStyle;
}

const StatusCard = ({
  title,
  desc,
  stat,
  style,
  descriptionStyle,
  titleStyle,
  bgColor = "#BEADFA",
  ...rest
}: Props) => {
  const color = useColor();
  return (
    <ThemedView
      style={[styles.container, style, { backgroundColor: bgColor }]}
      {...rest}
    >
      <ThemedText color="dark" style={[{}, titleStyle]} type="defaultSemiBold">
        {title}
      </ThemedText>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
        }}
      >
        <ThemedText color="dark" style={[descriptionStyle]} type="title">
          {stat}
        </ThemedText>
        <ThemedText color="dark" style={{ marginBottom: 4, fontSize: 18 }}>
          &nbsp;{desc}
        </ThemedText>
      </View>
    </ThemedView>
  );
};

export default StatusCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#BEADFA",
    flex: 1,
    padding: 16,
    borderRadius: 16,
  },
});
