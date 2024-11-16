import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
  ViewToken,
} from "react-native";

import AddSessionSheet from "@/components/AddSessionSheet";
import Empty from "@/components/Empty";
import { HelloWave } from "@/components/HelloWave";
import Icon from "@/components/Icon";
import ListItem from "@/components/ListItem";
import StatusCard from "@/components/StatusCard";
import ThemedButton from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ThemeToggle from "@/components/ThemeToggle";
import { useToast } from "@/contexts/ToastContext";
import useColor from "@/hooks/useColor";
import useSessionStore from "@/store/SessionSlice";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation, useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import Animated, {
  LinearTransition,
  SlideOutLeft,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { getQuoteForToday } from "@/lib/helpers";

const viewabilityConfig = {
  minimumViewTime: 0,
  viewAreaCoveragePercentThreshold: 0, // herhangi bir kısmı görünür olduğunda tetiklensin
};

const quoteOfTheDay = getQuoteForToday();

export default function HomeScreen() {
  const color = useColor();
  const navigation = useNavigation();
  const router = useRouter();
  const toast = useToast();
  const insets = useSafeAreaInsets();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  // const [sessions, setSessions] = useState<Session[]>([]);
  const sessions = useSessionStore((state) => state.sessions);

  const viewableItems = useSharedValue<ViewToken[]>([]);
  const scrollY = useSharedValue(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.value = event.nativeEvent.contentOffset.y;
  };

  // useEffect(() => {
  //   getSessions().then((res) => {
  //     setSessions(res);
  //   });
  // }, []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const [flatListHeight, setFlatListHeight] = useState(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setFlatListHeight(height);
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 16,
        // gap: 16,
        paddingTop: insets.top + 16,
        backgroundClip: "black",
        backgroundColor: color.background,
      }}
    >
      <View
        style={{
          // justifyContent: "space-between",
          alignItems: "center",
          // marginBottom: 24,
          flexDirection: "row",
          gap: 8,
          // backgroundColor: "blue",
        }}
      >
        <ThemedText
          style={{
            fontSize: 32,
            fontFamily: "SF_Bold",
          }}
        >
          Hello, Enes
        </ThemedText>
        <HelloWave />
        <ThemeToggle style={{ marginLeft: "auto" }} />
      </View>
      <ThemedText
        style={{
          marginBottom: 16,
          opacity: 0.7,
        }}
      >
        {quoteOfTheDay.text}
      </ThemedText>
      <ThemedView style={{ flexDirection: "row", gap: 6, marginBottom: 24 }}>
        <StatusCard
          // bgColor="#B9F3FC"
          bgColor={"#ffda89"}
          title="Remaining Focus"
          stat="6"
          desc="hours"
        />
        <StatusCard
          bgColor={"#8dd4b5"}
          title="Total Focus"
          stat="38"
          desc="hours"
        />
      </ThemedView>

      <ThemedText type="subtitle">Sessions</ThemedText>
      <View style={{ flexDirection: "row", gap: 8, marginTop: 16 }}>
        <ThemedButton
          // onPress={handlePresentModalPress}
          onPress={() => router.navigate("/add-session")}
          icon={<Icon icon="calendar-add" size={24} color={color.background} />}
          block
          style={{ borderRadius: 16 }}
          title="Add Session"
        />
        <ThemedButton
          icon={<Icon icon="timer" size={24} color={color.background} />}
          block
          // onPress={() => router.navigate("/session")}
          onPress={() =>
            toast.show({
              message: "Success!!!",
              visible: true,
              icon: "tick-circle",
            })
          }
          style={{ borderRadius: 16 }}
          title="Start Session"
        />
      </View>
      <View style={{ flex: 1 }}>
        {/* FlatList with padding to avoid interference with gradient */}
        <Animated.FlatList
          viewabilityConfig={viewabilityConfig}
          onScroll={handleScroll}
          fadingEdgeLength={2}
          layout={LinearTransition}
          exiting={SlideOutLeft}
          onLayout={onLayout}
          keyExtractor={(i) => i.id}
          itemLayoutAnimation={LinearTransition}
          data={sessions}
          ListEmptyComponent={<Empty description="No sessions yet!" />}
          style={{ marginHorizontal: -16 }}
          onViewableItemsChanged={({ viewableItems: vItems }) => {
            viewableItems.value = vItems;
          }}
          contentContainerStyle={{
            gap: 8,
            paddingBottom: 16, // Add padding to avoid gradient interference at bottom
            paddingTop: 24, // Add padding to avoid gradient interference at top
          }}
          renderItem={({ item, index }) => (
            <ListItem
              flatListHeight={flatListHeight}
              scrollY={scrollY}
              index={index}
              session={item}
            />
          )}
        />

        {/* Top Gradient */}
        {/* <LinearGradient
          colors={["white", "transparent"]}
          style={[styles.gradient, styles.topGradient]}
        /> */}

        {/* Bottom Gradient */}
        {/* <LinearGradient
          colors={["transparent", "black"]}
          style={[styles.gradient, styles.bottomGradient]}
        /> */}
      </View>
      <AddSessionSheet ref={bottomSheetModalRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 24, // Adjust height to control fade length
    zIndex: 1,
  },
  topGradient: {
    top: 0,
  },
  bottomGradient: {
    bottom: 0,
  },
});
