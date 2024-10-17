import useColor from "@/hooks/useColor";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const fonts = {
  SF: require("../assets/fonts/SF-Pro-Rounded-Regular.otf"),
  SF_Medium: require("../assets/fonts/SF-Pro-Rounded-Medium.otf"),
  SF_Semibold: require("../assets/fonts/SF-Pro-Rounded-Semibold.otf"),
  SF_Bold: require("../assets/fonts/SF-Pro-Rounded-Bold.otf"),
  SF_Black: require("../assets/fonts/SF-Pro-Rounded-Black.otf"),
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const color = useColor();
  const [loaded] = useFonts(fonts);
  const insets = useSafeAreaInsets();

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
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
