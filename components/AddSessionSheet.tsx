import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { RefObject } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import AnimatedTextInput from "./AnimatedTextInput";
import Badge from "./Badge";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import useColor from "@/hooks/useColor";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import MinuteSelect from "./MinuteSelect";
import ThemedButton from "./ThemedButton";
import NumberPicker from "./MinuteSelect";
import { Calendar } from "react-native-calendars";
import ThemedTextInput from "./ThemedTextInput";
import moment from "moment";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const dateFormat = "YYYY-MM-DD";

const durations = Array.from({ length: 12 }, (_, i) => (i + 1) * 5);
const reps = Array.from({ length: 10 }, (_, i) => i + 1);

const AddSessionSheet = React.forwardRef(function AddSessionSheet(props, ref) {
  const color = useColor();
  const snapPoints = React.useMemo(() => ["40%", "80%"], []);
  const [name, setName] = React.useState("");

  const insets = useSafeAreaInsets();
  const [selectedDay, setSelectedDay] = React.useState(
    moment().format(dateFormat)
  );
  const [duration, setDuration] = React.useState(25);
  const [rep, setRep] = React.useState(1);

  const handleSheetChanges = React.useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <BottomSheetModal
      // enableContentPanningGesture={false}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop appearsOnIndex={1} {...backdropProps} />
      )}
      ref={ref as RefObject<BottomSheetModalMethods>}
      index={0}
      backgroundStyle={{
        borderRadius: 32,
        backgroundColor: color.background,
      }}
      handleStyle={{ top: -24 }}
      handleIndicatorStyle={{ backgroundColor: "#fff", width: 56 }}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      <BottomSheetScrollView>
        <View
          style={{ paddingBottom: insets.bottom + 24, paddingHorizontal: 16 }}
        >
          <ThemedText type="subtitle" style={{ marginBottom: 8 }}>
            Title
          </ThemedText>
          <ThemedTextInput enterKeyHint="done" placeholder="Work on the exam" />

          <View
            style={{
              backgroundColor: "#00000015",
              borderRadius: 16,
              overflow: "hidden",
              marginVertical: 24,
            }}
          >
            <Calendar
              onDayPress={(date) => setSelectedDay(date.dateString)}
              key={321222222}
              markedDates={{ [selectedDay]: { selected: true } }}
              theme={{
                calendarBackground: "transparent",
                // textSectionTitleColor: "white",
                selectedDayBackgroundColor: `${color.tint}30`,
                selectedDayTextColor: color.tint,
                dayTextColor: "white",
                monthTextColor: "white",
                arrowColor: color.tint,
                indicatorColor: color.tint,
                textDayFontFamily: "SF_Bold",
                todayTextColor: color.tint,
                textMonthFontFamily: "SF",
                textDayHeaderFontFamily: "SF",
              }}
            />
          </View>

          {/* <ThemedText type="subtitle" style={{ marginTop: 16, marginBottom: 16 }}>
        Priority
      </ThemedText>

      <RadioButton
        value={priority}
        onChange={setPriorty}
        options={priorityOptions}
      /> */}

          <ThemedText type="subtitle" style={{}}>
            Duration
          </ThemedText>
          <ThemedText style={{ fontSize: 12, opacity: 0.6 }}>
            The recomended duration for pomodoro technique is 25 minutes.
          </ThemedText>
          <NumberPicker
            addon="mins"
            data={durations}
            value={duration}
            onChange={setDuration}
            initialScrollIndex={4}
          />

          <View style={{ marginBottom: 24 }}>
            <ThemedText type="subtitle" style={{}}>
              Repeat
            </ThemedText>
            <NumberPicker
              addon="pomodoro"
              data={reps}
              value={rep}
              onChange={setRep}
            />
          </View>

          <ThemedButton style={{ borderRadius: 12 }} title="Add" />
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});

export default AddSessionSheet;

const styles = StyleSheet.create({});
