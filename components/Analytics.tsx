import { View, Text } from "./Themed";
import { StyleSheet } from "react-native";

export const Analytics = () => {
  return (
    <View>
      <Text>Analytics</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  topContainer: {
    alignItems: "flex-end",
  },
});
