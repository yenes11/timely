import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import AnimatedOpacity from "./AnimatedOpacity";
import Icon from "./Icon";
import useColor from "@/hooks/useColor";

const Counter = () => {
  const color = useColor();

  return (
    <ThemedView
      row
      style={{ alignItems: "center", justifyContent: "center", gap: 12 }}
    >
      <AnimatedOpacity
        style={{
          padding: 10,
          borderRadius: 8,
          backgroundColor: color.card,
          // borderWidth: 1,
          // borderColor: color.card,
        }}
      >
        <Icon icon="minus" color={color.tint} size={18} />
      </AnimatedOpacity>
      <ThemedText style={{ fontFamily: "SF_Semibold", fontSize: 42 }}>
        0
      </ThemedText>
      <AnimatedOpacity
        style={{
          padding: 10,
          borderRadius: 8,
          backgroundColor: color.card,
          // borderWidth: 1,
          // borderColor: color.card,
        }}
      >
        <Icon icon="plus" color={color.tint} size={18} />
      </AnimatedOpacity>
    </ThemedView>
  );
};

export default Counter;

const styles = StyleSheet.create({});
