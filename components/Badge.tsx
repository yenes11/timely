import { StyleSheet, Text, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import useColor from "@/hooks/useColor";

type Props = {
  color?: string;
};

const Badge = (props: Props) => {
  const themeColor = useColor();
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: themeColor.blue,
        alignSelf: "flex-start",
        paddingVertical: 2,
        borderStyle: "dashed",
        paddingHorizontal: 12,
        borderRadius: 99,
        backgroundColor: themeColor.blue + "30",
      }}
    >
      <ThemedText
        style={{
          color: themeColor.blueForeground,
          fontFamily: "SF_Semibold",
          fontSize: 12,
        }}
      >
        3 &times; 25m
      </ThemedText>
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create({});
