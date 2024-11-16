import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Appearance,
  TouchableOpacityProps,
} from "react-native";
import Icon from "./Icon";

interface Props {}

const ThemeToggle: React.FC<TouchableOpacityProps> = (props) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  return (
    <TouchableOpacity
      onPress={() =>
        isDarkMode
          ? Appearance.setColorScheme("light")
          : Appearance.setColorScheme("dark")
      }
      {...props}
    >
      <Icon
        icon={isDarkMode ? "sun-1" : "moon"}
        size={24}
        color={isDarkMode ? "yellow" : "black"}
      />
    </TouchableOpacity>
  );
};

export default ThemeToggle;

const styles = StyleSheet.create({});
