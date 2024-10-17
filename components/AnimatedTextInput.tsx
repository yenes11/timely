import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
} from "react-native";
import React, { useEffect } from "react";
import useColor from "@/hooks/useColor";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import NumberPicker from "./MinuteSelect";

const INITIAL_FONT_SIZE = 16;
const FOCUSED_FONT_SIZE = 12;
const FOCUSED_TRANSLATE_Y = -12;
const HEIGHT = 52;

interface Props extends TextInputProps {}

const AnimatedTextInput: React.FC<Props> = ({
  value,
  style,
  onFocus,
  onBlur,
  ...rest
}) => {
  const color = useColor();
  const fontSize = useSharedValue(INITIAL_FONT_SIZE);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);
  const ref = React.useRef<TextInput>(null);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      fontSize: fontSize.value,
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    if (!ref.current?.isFocused() && !value) {
      fontSize.value = withTiming(INITIAL_FONT_SIZE);
      translateY.value = withTiming(0);
      opacity.value = withTiming(1);
    } else if (!ref.current?.isFocused() && value) {
      fontSize.value = withTiming(FOCUSED_FONT_SIZE);
      translateY.value = withTiming(FOCUSED_TRANSLATE_Y);
      opacity.value = withTiming(0.8);
    }
  }, [value]);

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (value) return;
    fontSize.value = withTiming(FOCUSED_FONT_SIZE);
    translateY.value = withTiming(FOCUSED_TRANSLATE_Y);
    opacity.value = withTiming(0.8);
    onFocus && onFocus(e);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (value) return;
    fontSize.value = withTiming(INITIAL_FONT_SIZE);
    translateY.value = withTiming(0);
    opacity.value = withTiming(1);
    onBlur && onBlur(e);
  };

  return (
    <View style={[{ justifyContent: "center" }]}>
      <TextInput
        cursorColor={color.tint}
        selectionColor={color.tint}
        ref={ref}
        onFocus={handleFocus}
        onBlur={handleBlur}
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
      <Animated.Text
        style={[
          { color: color.text, position: "absolute", left: 16 },
          animatedStyles,
        ]}
      >
        Label
      </Animated.Text>
    </View>
  );
};

export default AnimatedTextInput;

const styles = StyleSheet.create({
  input: {
    alignSelf: "stretch",
    height: HEIGHT,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderRadius: 12,
    paddingTop: 22,
  },
});
