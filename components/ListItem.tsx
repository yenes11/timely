import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ThemedText } from "./ThemedText";
import Badge from "./Badge";
import useColor from "@/hooks/useColor";
import { Ionicons } from "@expo/vector-icons";
import AnimatedOpacity from "./AnimatedOpacity";
import Icon from "./Icon";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { ThemedView } from "./ThemedView";

type Props = {};

function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
  const color = useColor();
  return (
    <ThemedView row>
      <AnimatedOpacity
        activeOpacity={0.8}
        style={[
          styles.actionButton,
          {
            backgroundColor: color.blue,
          },
        ]}
      >
        <Icon icon="verify" size={24} color="#fff" />
        <ThemedText style={{ fontSize: 12, fontFamily: "SF", marginTop: 4 }}>
          Done
        </ThemedText>
      </AnimatedOpacity>
      <AnimatedOpacity
        style={[
          styles.actionButton,
          {
            backgroundColor: color.danger,
          },
        ]}
      >
        <Icon icon="trash" size={24} color="#fff" />
        <ThemedText style={{ fontSize: 12, fontFamily: "SF", marginTop: 4 }}>
          Delete
        </ThemedText>
      </AnimatedOpacity>
    </ThemedView>
  );
}

const ListItem = (props: Props) => {
  const color = useColor();
  return (
    <Swipeable
      containerStyle={{ backgroundColor: color.background }}
      renderRightActions={RightAction}
    >
      <View
        style={[
          {
            backgroundColor: color.card,
          },
          styles.container,
        ]}
      >
        <View>
          <ThemedText
            color="light"
            style={{
              fontFamily: "SF_Semibold",
              fontSize: 16,
              marginBottom: 8,
              letterSpacing: 0,
            }}
          >
            Work on the project
          </ThemedText>
          <View>
            <Badge />
          </View>
        </View>
        <AnimatedOpacity>
          <Icon icon="to-right" size={24} color={"#53d3af"} />
        </AnimatedOpacity>
      </View>
    </Swipeable>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderLeftWidth: 12,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderLeftColor: "#53d3af",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
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
