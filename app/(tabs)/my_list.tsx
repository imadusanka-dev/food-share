import { Link } from "expo-router";
import { supabase } from "@/supabase";
import { StyleSheet } from "react-native";
import type { FoodListing } from "@/types";
import { useState, useEffect } from "react";
import { Button } from "react-native-paper";
import { Session } from "@supabase/supabase-js";
import { Text, View } from "@/components/Themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Analytics, MyListItems, DataLoading, EmptyData } from "@/components";

export default function MyList() {
  const [session, setSession] = useState<Session | null>(null);
  const [items, setItems] = useState<FoodListing[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await AsyncStorage.getItem("supabase-session");
      if (session) {
        setSession(JSON.parse(session));
      }
    };
    fetchSession();
  }, []);

  useEffect(() => {
    //get items by user id
    if (session) {
      fetchFoodListingsByUserId();
    }
  }, [session]);

  const fetchFoodListingsByUserId = async () => {
    const { data, error } = await supabase
      .from("food_listings")
      .select("*")
      .eq("user_id", session?.user?.id)
      .order("created_at", { ascending: false });
    setItems(data);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        {session ? (
          <Link href="/add">
            <Button icon="plus" mode="contained-tonal">
              Add New
            </Button>
          </Link>
        ) : (
          <Link href="/login">
            <Button mode="outlined">Login</Button>
          </Link>
        )}
      </View>
      {session && (
        <View>
          {loading && <DataLoading />}
          {!loading && items?.length === 0 && <EmptyData />}
          {!loading && items?.length && (
            <>
              <Analytics />
              <MyListItems items={items} />
            </>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  topContainer: {
    alignItems: "flex-end",
  },
});
