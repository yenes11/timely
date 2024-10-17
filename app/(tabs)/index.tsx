import { FlatList, Keyboard, StyleSheet, View } from "react-native";

import ThemedButton from "@/components/ThemedButton";
import ListItem from "@/components/ListItem";
import { ThemedText } from "@/components/ThemedText";
import StatusCard from "@/components/StatusCard";
import { ThemedView } from "@/components/ThemedView";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Badge from "@/components/Badge";
import { HelloWave } from "@/components/HelloWave";
import Icon from "@/components/Icon";
import useColor from "@/hooks/useColor";
import { useNavigation, useRouter } from "expo-router";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetTextInput,
  TouchableWithoutFeedback,
} from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef, useState } from "react";
import { useSharedValue } from "react-native-reanimated";
import ThemeToggle from "@/components/ThemeToggle";
import AnimatedTextInput from "@/components/AnimatedTextInput";
import AddSessionSheet from "@/components/AddSessionSheet";
import NumberPicker from "@/components/MinuteSelect";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const color = useColor();
  const navigation = useNavigation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 16,
        gap: 16,
        paddingTop: insets.top + 16,
        paddingBottom: insets.bottom + 16,
      }}
    >
      <ThemedView
        row
        style={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <ThemedText style={{ fontSize: 32, fontFamily: "SF_Bold" }}>
          Hello, Enes <HelloWave />
        </ThemedText>
        <ThemeToggle />
      </ThemedView>
      <ThemedView style={{ flexDirection: "row", gap: 6 }}>
        <StatusCard
          // bgColor="#B9F3FC"
          bgColor={color.yellow}
          title="Remaining Focus"
          stat="6"
          desc="hours"
        />
        <StatusCard
          bgColor={color.pink}
          title="Total Focus"
          stat="38"
          desc="hours"
        />
      </ThemedView>

      <ThemedText type="subtitle">Sessions</ThemedText>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <ThemedButton
          onPress={handlePresentModalPress}
          icon={<Icon icon="calendar-add" size={20} color={color.background} />}
          block
          style={{ borderRadius: 16, backgroundColor: color.blue }}
          title="Add Session"
        />
        <ThemedButton
          icon={<Icon icon="timer" size={18} color={color.background} />}
          block
          onPress={() => router.navigate("/add-session")}
          style={{ borderRadius: 16 }}
          title="Start Session"
        />
      </View>
      <FlatList
        data={[1, 2, 3]}
        style={{ marginHorizontal: -16 }}
        contentContainerStyle={{ gap: 8 }}
        renderItem={() => <ListItem />}
      />
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
});
