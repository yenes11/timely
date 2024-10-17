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
import { ThemedText } from './ThemedText';
import useColor from '@/hooks/useColor';
import * as Haptics from 'expo-haptics';

const AnimatedOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface Props extends TouchableOpacityProps {
  title?: string;
  icon?: React.ReactNode;
  block?: boolean;
}

const ThemedButton = ({
  style,
  title,
  icon,
  block = false,
  ...rest
}: Props) => {
  const color = useColor();
  const isPressed = useSharedValue(false);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: isPressed.value ? withTiming(0.98) : withTiming(1) },
      ],
    };
  });

  return (
    <AnimatedOpacity
      activeOpacity={0.8}
      style={[
        animatedStyles,
        styles.button,
        { backgroundColor: color.tint, flex: block ? 1 : undefined },
        style,
      ]}
      onPressIn={() => {
        isPressed.value = true;
        Haptics.selectionAsync();
      }}
      onPressOut={() => {
        isPressed.value = false;
      }}
      {...rest}
    >
      {icon}
      {title && (
        <ThemedText style={{ color: '#313641' }} type="defaultSemiBold">
          {title}
        </ThemedText>
      )}
    </AnimatedOpacity>
  );
};

export default ThemedButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
});
