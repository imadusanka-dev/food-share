import { Link } from "expo-router";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { Text, View } from "@/components/Themed";

export default function MyList() {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Link href="/add">
          <Button icon="plus" mode="contained-tonal">
            Add New
          </Button>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    alignItems: "flex-end",
  },
});
