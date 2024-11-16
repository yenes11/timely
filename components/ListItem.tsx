import { useToast } from "@/contexts/ToastContext";
import useColor from "@/hooks/useColor";
import { Session } from "@/lib/types";
import useSessionStore from "@/store/SessionSlice";
import React, { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Animated, {
  interpolate,
  LayoutAnimationConfig,
  LinearTransition,
  SharedValue,
  SlideInLeft,
  SlideOutLeft,
  useAnimatedStyle,
} from "react-native-reanimated";
import AnimatedOpacity from "./AnimatedOpacity";
import Icon from "./Icon";
import { ThemedText } from "./ThemedText";

type Props = {
  session: Session;
  scrollY: SharedValue<number>;
  index: number;
  flatListHeight: number;
};

// const animateds = Animated.createAnimatedComponent(Swipeable);

function RightAction({ id }: { id: string }) {
  const toast = useToast();
  const deleteSession = useSessionStore((state) => state.deleteSession);
  const color = useColor();
  return (
    <View style={{ flexDirection: "row" }}>
      <AnimatedOpacity
        activeOpacity={0.8}
        style={[
          styles.actionButton,
          {
            backgroundColor: color.blue,
          },
        ]}
      >
        <Icon icon="tick-circle" size={24} color="#000" />
        <ThemedText
          color="dark"
          style={{ fontSize: 12, fontFamily: "SF", marginTop: 4 }}
        >
          Done
        </ThemedText>
      </AnimatedOpacity>
      <AnimatedOpacity
        onPress={() => deleteSession(id)}
        style={[
          styles.actionButton,
          {
            backgroundColor: "#FF8080",
          },
        ]}
      >
        <Icon icon="trash" size={24} color="#000" />
        <ThemedText
          color="dark"
          style={{ fontSize: 12, fontFamily: "SF", marginTop: 4 }}
        >
          Delete
        </ThemedText>
      </AnimatedOpacity>
    </View>
  );
}

const ListItem = ({ session, scrollY, index, flatListHeight }: Props) => {
  const color = useColor();

  const ITEM_HEIGHT = 64; // adjust this based on your list item height
  const ITEM_GAP = 8;
  const TOTAL_ITEM_HEIGHT = ITEM_HEIGHT + ITEM_GAP;

  const rStyle = useAnimatedStyle(() => {
    const position = index * TOTAL_ITEM_HEIGHT;

    // Calculate item visibility within the viewport
    const itemTopEdge = position;
    const itemBottomEdge = position + ITEM_HEIGHT;
    const viewportTopEdge = scrollY.value;
    const viewportBottomEdge = scrollY.value + flatListHeight - 24;

    // Calculate the visible height of the item within the viewport
    const visibleHeight = Math.max(
      0,
      Math.min(itemBottomEdge, viewportBottomEdge) -
        Math.max(itemTopEdge, viewportTopEdge)
    );

    // Calculate the visibility percentage of the item
    const visibilityPercentage = visibleHeight / ITEM_HEIGHT;

    // Interpolate opacity and scale based on visibility percentage
    const opacity = interpolate(
      visibilityPercentage,
      [0, 1],
      [0.3, 1],
      "clamp"
    );

    const scale = interpolate(visibilityPercentage, [0, 1], [0.8, 1], "clamp");
    return {
      opacity,
      transform: [{ scale }],
    };
  }, [scrollY.value, flatListHeight]);

  return (
    <Animated.View
      style={[rStyle]}
      layout={LinearTransition}
      entering={SlideInLeft}
      exiting={SlideOutLeft.springify()}
    >
      <Swipeable renderRightActions={({}) => <RightAction id={session.id} />}>
        <Animated.View
          style={[
            {
              backgroundColor: color.card,
              borderColor: color.border,
            },
            styles.container,
          ]}
        >
          <Icon
            icon="receipt-2-1"
            size={24}
            color={color.tint}
            style={{ marginRight: 12 }}
          />
          <View>
            <ThemedText
              style={{
                fontFamily: "SF_Semibold",
                // fontSize: 16,
                marginBottom: 4,
                // letterSpacing: 0,
              }}
            >
              {session.title}
            </ThemedText>
            <ThemedText
              type="defaultSemiBold"
              style={{ fontSize: 12, opacity: 0.7, marginTop: -4 }}
            >
              {session.repeat} &times; {session.duration}
            </ThemedText>
          </View>
          <AnimatedOpacity
            style={{
              marginLeft: "auto",
            }}
          >
            <Icon icon="play-circle" size={36} color={"#53d3af"} />
            {/* <FontAwesome6 name="play-circle" size={28} color="#53d3af" /> */}
          </AnimatedOpacity>
        </Animated.View>
      </Swipeable>
    </Animated.View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    // borderLeftWidth: 12,
    borderWidth: StyleSheet.hairlineWidth,
    height: 64,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
  },
  actionButton: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    marginLeft: -8,
    borderRadius: 12,
    width: 72,
    height: "100%",
  },
});
