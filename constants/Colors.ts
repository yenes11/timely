/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#80d8b8";
const tintColorDark = "#80d8b8";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    list: "#F7F9F2",
    tint: tintColorLight,
    icon: "#687076",
    green: "#91DDCF",
    yellow: "#ffcc90",
    pink: "#f894c3",
    // yellow: '#FEF9D9',
    blueForeground: "#C4D7FF",
    // blue: '#87A2FF',
    blue: "#9cacff",
    tabIconDefault: "#687076",
    card: "#455061",
    tabIconSelected: tintColorLight,
    danger: "#fc3c44",
  },
  dark: {
    text: "#ECEDEE",
    background: "#313641",
    list: "#F7F9F2",
    green: "#91DDCF",
    // yellow: '#FEF9D9',
    yellow: "#ffcc90",
    pink: "#f894c3",
    card: "#455061",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    blueForeground: "#C4D7FF",
    // blue: '#87A2FF',
    blue: "#9cacff",
    tabIconSelected: tintColorDark,
    danger: "#fc3c44",
  },
};
