import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

type Option = {
  label: string;
  value: string;
};

interface Props {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

const RadioButton: React.FC<Props> = ({ options, onChange, value }) => {
  return (
    <ThemedView row style={{ backgroundColor: "#ffffff15", borderRadius: 12 }}>
      {options.map((option) => (
        <TouchableOpacity
          onPress={() => onChange(option.value)}
          activeOpacity={0.8}
          style={{
            flex: 1,
            padding: 12,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor:
              value === option.value ? "#ffffff30" : "transparent",
          }}
          key={option.value}
        >
          <ThemedText style={{ fontFamily: "SF_Semibold", fontSize: 18 }}>
            {option.label}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </ThemedView>
  );
};

export default RadioButton;

const styles = StyleSheet.create({});
