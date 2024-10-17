import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import Slide from "@/components/Slide";

const SessionScreen = () => {
  return (
    <ThemedView style={{ flex: 1, paddingHorizontal: 16 }}>
      <Slide containerStyle={{ marginTop: "auto" }} />
    </ThemedView>
  );
};

export default SessionScreen;

const styles = StyleSheet.create({});
