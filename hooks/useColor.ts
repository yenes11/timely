import { Colors } from "@/constants/Colors";
import { useColorScheme, Appearance } from "react-native";

export default function useColor() {
  const colorScheme = useColorScheme();
  return Colors[colorScheme || "light"];
}
