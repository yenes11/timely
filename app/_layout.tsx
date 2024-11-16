import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import useColor from "@/hooks/useColor";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ToastProvider from "@/contexts/ToastContext";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { LayoutAnimationConfig } from "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const color = useColor();
  const [loaded] = useFonts({
    SF: require("../assets/fonts/SF-Pro-Display-Regular.otf"),
    SF_Medium: require("../assets/fonts/SF-Pro-Display-Medium.otf"),
    SF_Semibold: require("../assets/fonts/SF-Pro-Display-Semibold.otf"),
    SF_Bold: require("../assets/fonts/SF-Pro-Display-Bold.otf"),
    SF_Black: require("../assets/fonts/SF-Pro-Display-Heavy.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <LayoutAnimationConfig skipEntering>
          <ToastProvider>
            <BottomSheetModalProvider>
              <Stack
                screenOptions={{
                  headerShown: false,
                  contentStyle: {
                    backgroundColor: color.background,
                    // paddingTop: insets.top + 16,
                    // paddingBottom: insets.bottom + 16,
                  },
                }}
              >
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="add-session"
                  options={{
                    animation: "slide_from_bottom",
                    headerShown: true,
                    presentation: "modal",
                    headerTitle: "Add Session",
                    gestureDirection: "horizontal",
                    headerStyle: {
                      backgroundColor: color.card,
                    },
                  }}
                />
                <Stack.Screen name="+not-found" />
              </Stack>
              <StatusBar style="auto" />
            </BottomSheetModalProvider>
          </ToastProvider>
        </LayoutAnimationConfig>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
