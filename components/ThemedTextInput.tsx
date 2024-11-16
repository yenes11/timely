import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import React from "react";
import useColor from "@/hooks/useColor";

const HEIGHT = 52;

const ThemedTextInput = ({ style, ...rest }: TextInputProps) => {
  const color = useColor();
  return (
    <TextInput
      cursorColor={color.tint}
      selectionColor={color.tint}
      style={[
        {
          color: color.text,
          backgroundColor: color.card,
        },
        styles.input,
        style,
      ]}
      {...rest}
    />
  );
};

export default ThemedTextInput;

const styles = StyleSheet.create({
  input: {
    alignSelf: "stretch",
    height: HEIGHT,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderRadius: 12,
  },
});
