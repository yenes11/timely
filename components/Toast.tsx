import useColor from "@/hooks/useColor";
import { ToastProps } from "@/lib/types";
import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  FadeInUp,
  FadeOutUp,
  LinearTransition,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "./Icon";
import { ThemedText } from "./ThemedText";

const Toast = ({ message, icon, iconColor, visible }: ToastProps) => {
  const color = useColor();
  const insets = useSafeAreaInsets();

  if (!visible) return null;

  return (
    <Animated.View
      layout={LinearTransition}
      entering={FadeInUp}
      exiting={FadeOutUp}
      style={[
        styles.container,
        { backgroundColor: color.card, top: insets.top },
      ]}
    >
      {icon && <Icon icon={icon} color={iconColor || color.green} size={32} />}
      <ThemedText>{message}</ThemedText>
    </Animated.View>
  );
};

export default Toast;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    position: "absolute",
    width: "95%",
    alignSelf: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    zIndex: 9999,
    height: 56,
    // marginRight: 24,
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
  },
});
