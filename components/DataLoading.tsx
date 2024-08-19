import { View, StyleSheet, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export const DataLoading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator />
      <Text style={styles.text}>Loading</Text>
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
