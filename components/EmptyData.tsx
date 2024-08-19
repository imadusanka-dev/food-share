import { View, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export const EmptyData = () => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="flask-empty-remove"
        size={24}
        color="black"
      />
      <Text style={styles.text}>No data available</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 15,
    color: "black",
  },
});
