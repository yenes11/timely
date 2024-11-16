import { Tabs } from "expo-router";
import Icon from "@/components/Icon";
import useColor from "@/hooks/useColor";

export default function TabLayout() {
  const color = useColor();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: color.tint,
        headerShown: false,
        tabBarStyle: {
          // borderTopColor: color.border,
          // backgroundColor: color.card,
          // borderTopWidth: 0,
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
