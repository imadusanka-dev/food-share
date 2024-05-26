import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ListItem, SearchBar } from "@/components";

export default function TabOneScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <View style={styles.container}>
      <SearchBar onChangeText={setSearchQuery} value={searchQuery} />
      <View>
        <ListItem />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
});
