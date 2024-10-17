import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import useColor from "@/hooks/useColor";
import Animated, {
  clamp,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withClamp,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import { ThemedText } from "./ThemedText";

type Props = {
  containerStyle?: ViewStyle;
};

// function clamp(val: number, min: number, max: number) {
//   'worklet';
//   return Math.min(Math.max(val, min), max);
// }

const Slide = (props: Props) => {
  const color = useColor();
  const translateX = useSharedValue(0);
  const prevTranslateX = useSharedValue(0);
  const containerWidth = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          // translateX: withClamp(
          //   { min: 0, max: containerWidth.value - 72 },
          //   translateX.value
          // ),
          translateX: translateX.value,
        },
      ],
    };
  });

  const pan = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      prevTranslateX.value = translateX.value;
      runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Heavy);
    })
    .onUpdate((event) => {
      const maxTranslateX = containerWidth.value - 88;
      translateX.value = clamp(
        prevTranslateX.value + event.translationX,
        0,
        maxTranslateX
      );
    })
    .onEnd(() => {
      const maxTranslateX = containerWidth.value - 88;
      if (translateX.value > maxTranslateX - 24) {
        translateX.value = withTiming(maxTranslateX);
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Heavy);
      } else {
        translateX.value = withTiming(0);
      }
    });

  return (
    <View
      onLayout={({ nativeEvent }) => {
        containerWidth.value = nativeEvent.layout.width;
      }}
      style={[
        {
          alignSelf: "stretch",
          backgroundColor: color.card,
          padding: 8,
          alignItems: "flex-start",
          borderRadius: 99,
          justifyContent: "center",
        },
        props.containerStyle,
      ]}
    >
      <ThemedText
        style={{ position: "absolute", alignSelf: "center", opacity: 0.4 }}
      >
        Slide to end session
      </ThemedText>
      <GestureDetector gesture={pan}>
        <Animated.View
          style={[
            animatedStyles,
            {
              backgroundColor: color.text,
              height: 48,
              width: 72,
              borderRadius: 99,
            },
          ]}
        />
      </GestureDetector>
    </View>
  );
};

export default Slide;

const styles = StyleSheet.create({});
