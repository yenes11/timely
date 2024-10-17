import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Appearance,
} from "react-native";
import Icon from "./Icon";

interface Props {}

const ThemeToggle: React.FC<Props> = ({}) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  return (
    <TouchableOpacity
      onPress={() =>
        isDarkMode
          ? Appearance.setColorScheme("light")
          : Appearance.setColorScheme("dark")
      }
    >
      <Icon
        icon={isDarkMode ? "sun" : "moon"}
        size={24}
        color={isDarkMode ? "yellow" : "black"}
      />
    </TouchableOpacity>
  );
};

export default ThemeToggle;

const styles = StyleSheet.create({});
