import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import AnimatedOpacity from "./AnimatedOpacity";
import Icon from "./Icon";
import useColor from "@/hooks/useColor";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

interface Props {
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
  style?: ViewStyle;
}

const Checkbox = ({ value, setValue, style }: Props) => {
  const color = useColor();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => setValue((prev) => !prev)}
      style={[{ alignItems: "center", flexDirection: "row" }, style]}
    >
      <AnimatedOpacity
        onPress={() => setValue((prev) => !prev)}
        style={{
          backgroundColor: value ? color.tint : color.card,
          width: 24,
          aspectRatio: 1,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 6,
          marginRight: 12,
        }}
      >
        {value && <Icon icon="check" color="white" size={16} />}
      </AnimatedOpacity>
      <ThemedText type="defaultSemiBold">Add to calendar</ThemedText>
    </TouchableOpacity>
  );
};

export default Checkbox;

const styles = StyleSheet.create({});
