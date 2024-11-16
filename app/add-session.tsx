import NumberPicker from "@/components/NumberPicker";
import ThemedButton from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import ThemedTextInput from "@/components/ThemedTextInput";
import { useToast } from "@/contexts/ToastContext";
import useColor from "@/hooks/useColor";
import useSessionStore from "@/store/SessionSlice";
import { useRouter } from "expo-router";
import moment from "moment";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const dateFormat = "YYYY-MM-DD";

type Props = {};

const durations = Array.from({ length: 12 }, (_, i) => (i + 1) * 5);
const reps = Array.from({ length: 10 }, (_, i) => i + 1);

const priorityOptions = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

const AddSessionSheet = (props: Props) => {
  const router = useRouter();
  const color = useColor();
  const toast = useToast();
  const insets = useSafeAreaInsets();
  const [selectedDay, setSelectedDay] = React.useState(
    moment().format(dateFormat)
  );
  const [title, setTitle] = useState("");
  const [duration, setDuration] = React.useState(25);
  const [repeat, setRepeat] = React.useState(1);
  const [addCalendar, setAddCalendar] = React.useState(false);
  const addSession = useSessionStore((state) => state.addSession);

  const saveSession = async () => {
    addSession({
      duration,
      repeat,
      title,
    });
    router.replace("..");
    toast.show({
      message: "Session added",
      icon: "tick-circle",
      visible: true,
    });
  };

  return (
    <ScrollView
      style={{
        paddingHorizontal: 16,
        paddingTop: 16,
        flex: 1,
        // paddingBottom: 205,
      }}
    >
      <View style={{ paddingBottom: insets.bottom + 24 }}>
        <ThemedText type="subtitle" style={{ marginBottom: 8 }}>
          Title
        </ThemedText>
        <ThemedTextInput
          onChangeText={setTitle}
          enterKeyHint="done"
          placeholder="Work on the exam"
        />
        <ThemedText type="subtitle" style={{ marginTop: 24 }}>
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

        <View style={{ marginBottom: 0 }}>
          <ThemedText type="subtitle" style={{}}>
            Repeat
          </ThemedText>
          <NumberPicker
            addon="pomodoro"
            data={reps}
            value={repeat}
            onChange={setRepeat}
          />
        </View>

        {/* <Checkbox
          // style={{ alignSelf: "center" }}
          value={addCalendar}
          setValue={setAddCalendar}
        /> */}
        {addCalendar && (
          <View
            style={{
              backgroundColor: "#00000015",
              borderRadius: 16,
              overflow: "hidden",
              marginTop: 24,
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
        )}

        <ThemedButton
          onPress={saveSession}
          style={{ borderRadius: 12, marginTop: 24 }}
          title="Add"
        />
      </View>
    </ScrollView>
  );
};

export default AddSessionSheet;

const styles = StyleSheet.create({});
