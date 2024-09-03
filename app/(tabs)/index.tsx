import { supabase } from "@/supabase";
import Colors from "@/constants/Colors";
import { CATEGORIES } from "@/constants";
import { Chip } from "react-native-paper";
import type { FoodListing } from "@/types";
import { AuthContext } from "@/context/authContext";
import { StyleSheet, View, Text } from "react-native";
import { useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ListItem, SearchBar, DataLoading, EmptyData } from "@/components";
import { set } from "react-hook-form";

export default function TabOneScreen() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState<FoodListing[] | null>(null);

  const { setLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await AsyncStorage.getItem("supabase-session");
      if (session) {
        setLoggedIn(true);
      }
    };
    fetchSession();
  }, []);

  useEffect(() => {
    fetchItems();
  }, [searchQuery]);

  const fetchItems = async () => {
    setLoading(true);
    if (!searchQuery || searchQuery === "All") {
      const { data } = await supabase
        .from("food_listings")
        .select("*")
        .eq("status", "AVAILABLE")
        .order("created_at", { ascending: false });
      setItems(data);
      setLoading(false);
    } else {
      const { data } = await supabase
        .from("food_listings")
        .select("*")
        .eq("status", "AVAILABLE")
        .or(`title.like.%${searchQuery}%,category.like.%${searchQuery}%`)
        .order("created_at", { ascending: false });
      setItems(data);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar onChangeText={setSearchQuery} value={searchQuery} />
      <View style={styles.categoryContainer}>
        {CATEGORIES.map((category) => (
          <Chip
            key={category}
            onPress={() => setSearchQuery(category)}
            style={styles.chip}
          >
            <Text style={styles.chipText}>{category}</Text>
          </Chip>
        ))}
      </View>
      <View>
        {loading && <DataLoading />}
        {!loading &&
          items?.map((item) => <ListItem key={item.id} item={item} />)}
        {!loading && !items?.length && <EmptyData />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  chip: {
    backgroundColor: Colors.light.tint,
  },
  chipText: {
    color: "#fff",
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
});
