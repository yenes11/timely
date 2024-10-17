import React, { useState } from "react";
import {
  View,
  Text,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Dimensions,
  StyleSheet,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  runOnJS,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import {
  BottomSheetFlatList,
  useScrollEventsHandlersDefault,
  useScrollHandler,
  useScrollableSetter,
} from "@gorhom/bottom-sheet";
import {
  FlatList,
  GestureHandlerRootView,
  PanGestureHandler,
  ScrollView,
} from "react-native-gesture-handler";
import { ThemedText } from "./ThemedText";

interface Props {
  data: number[];
  addon: string;
  value: number;
  onChange: (val: number) => void;
  initialScrollIndex?: number;
}

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.2; // Adjust the width for each number item

const NumberPicker: React.FC<Props> = ({
  data,
  addon,
  onChange,
  value,
  initialScrollIndex,
}) => {
  const scrollX = useSharedValue(0);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollX.value = event.nativeEvent.contentOffset.x;
    const index = Math.round(event.nativeEvent.contentOffset.x / ITEM_WIDTH);
    if (data[index] !== value) {
      // runOnJS(setSelectedNumber)(numbers[index]);
      runOnJS(onChange)(data[index]);

      runOnJS(Haptics.selectionAsync)();
    }
  };

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / ITEM_WIDTH);
    // setSelectedNumber(numbers[index]);
    onChange(data[index]);
  };

  return (
    <View style={{ height: 84 }}>
      <FlatList
        onScroll={onScroll}
        data={data}
        initialScrollIndex={initialScrollIndex}
        getItemLayout={(data, index) => ({
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * index,
          index,
        })}
        style={{ marginHorizontal: -16 }}
        keyExtractor={(item) => item.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        contentContainerStyle={styles.flatListContent}
        snapToInterval={ITEM_WIDTH}
        renderItem={({ item, index }) => (
          <RenderItem
            item={item}
            index={index}
            scrollX={scrollX}
            addon={addon}
          />
        )}
      />
    </View>
  );
};

const RenderItem = ({
  item,
  index,
  scrollX,
  addon,
}: {
  item: number;
  index: number;
  scrollX: any;
  addon: string;
}) => {
  // Animated styles for scale and opacity
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollX.value,
      [(index - 1) * ITEM_WIDTH, index * ITEM_WIDTH, (index + 1) * ITEM_WIDTH],
      [0.8, 1.5, 0.8], // Scale effect for center number
      "clamp"
    );

    const opacity = interpolate(
      scrollX.value,
      [(index - 1) * ITEM_WIDTH, index * ITEM_WIDTH, (index + 1) * ITEM_WIDTH],
      [0.4, 1, 0.4], // Opacity effect for center number
      "clamp"
    );

    return { transform: [{ scale }], opacity };
  });

  return (
    <Animated.View style={[styles.item, animatedStyle]}>
      <Text style={styles.numberText}>{item}</Text>
      <ThemedText style={{ marginTop: -4, fontSize: 10 }}>{addon}</ThemedText>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: -16,
  },
  flatListContent: {
    paddingHorizontal: (width - ITEM_WIDTH) / 2, // Center the numbers on the screen
  },
  item: {
    width: ITEM_WIDTH,
    justifyContent: "center",
    alignItems: "center",
    // flexDirection: "row",
    // gap: 2,
    // backgroundColor: "blue",
  },
  numberText: {
    fontSize: 24,
    color: "#fff",
    fontFamily: "SF_Bold",
  },
  selectedNumberContainer: {
    marginTop: 20,
  },
  selectedNumberText: {
    fontSize: 18,
    color: "gray",
  },
});

export default NumberPicker;

{
  /* <Animated.FlatList
        data={numbers}
        keyExtractor={(item) => item.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler} // Using Animated scroll handler
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
        contentContainerStyle={styles.flatListContent}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="normal"
        renderItem={({ item, index }) => (
          <RenderItem item={item} index={index} scrollX={scrollX} />
        )}
      /> */
}
