import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const AnimatedOpacity = (props: TouchableOpacityProps) => {
  const { style, onPressIn, onPressOut, ...rest } = props;
  const isPressed = useSharedValue(false);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: isPressed.value ? withTiming(0.95) : withTiming(1) },
      ],
    };
  });
  return (
    <AnimatedTouchableOpacity
      onPressIn={(e) => {
        isPressed.value = true;
        Haptics.selectionAsync();
        onPressIn && onPressIn(e);
      }}
      onPressOut={(e) => {
        isPressed.value = false;
        onPressOut && onPressOut(e);
      }}
      style={[animatedStyles, style]}
      activeOpacity={0.8}
      {...rest}
    />
  );
};

export default AnimatedOpacity;
