import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useTheme } from "@/contexts/ThemeContext";
import useColor from "@/hooks/useColor";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ThemedButton from "@/components/ThemedButton";
import Icon from "@/components/Icon";

export default function TabLayout() {
  const color = useColor();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      sceneContainerStyle={{
        backgroundColor: color.background,
      }}
      screenOptions={{
        tabBarActiveTintColor: color.tint,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: color.card,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused, size }) => (
            // <TabBarIcon
            //   name={focused ? 'home' : 'home-outline'}
            //   color={color}
            // />
            <Icon icon="home" size={size} color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="add"
        options={{
          tabBarButton: () => (
            <ThemedButton
              style={{
                // zIndex: 999,
                // position: 'absolute',
                width: 52,
                marginTop: -26,
                aspectRatio: 1,
                paddingHorizontal: 0,
                paddingVertical: 0,
              }}
              icon={<Ionicons name="add" size={32} color="#313641" />}
            />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused, size }) => (
            // <TabBarIcon
            //   name={focused ? 'code-slash' : 'code-slash-outline'}
            //   color={color}
            // />
            <Icon icon="setting-2" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
