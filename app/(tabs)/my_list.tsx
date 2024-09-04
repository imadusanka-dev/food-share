import { useContext } from "react";
import { Link } from "expo-router";
import { supabase } from "@/supabase";
import type { FoodListing } from "@/types";
import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { View, Text } from "@/components/Themed";
import { AuthContext } from "@/context/authContext";
import { StyleSheet, ScrollView } from "react-native";
import { Button, SegmentedButtons } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Analytics, MyListItems, DataLoading, EmptyData } from "@/components";

export default function MyList() {
  const [value, setValue] = useState("list");
  const [session, setSession] = useState<Session | null>(null);
  const [items, setItems] = useState<FoodListing[] | null>(null);
  const [loading, setLoading] = useState(true);

  const { isLoggedIn } = useContext(AuthContext);

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
    const { data } = await supabase
      .from("food_listings")
      .select("*")
      .eq("user_id", session?.user?.id)
      .order("created_at", { ascending: false });
    setItems(data);
    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topContainer}>
        {isLoggedIn ? (
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
      {isLoggedIn ? (
        <View style={{ marginTop: 20 }}>
          {loading && <DataLoading />}
          {!loading && items?.length === 0 && <EmptyData />}
          {!loading && items && items?.length > 0 && (
            <>
              <SegmentedButtons
                value={value}
                onValueChange={setValue}
                buttons={[
                  {
                    value: "list",
                    label: "List",
                    icon: "format-list-bulleted",
                  },
                  {
                    value: "summary",
                    label: "Summary",
                    icon: "chart-pie",
                  },
                ]}
              />
              {value === "summary" && <Analytics items={items} />}
              {value === "list" && (
                <MyListItems
                  items={items}
                  reFetchItems={fetchFoodListingsByUserId}
                />
              )}
            </>
          )}
        </View>
      ) : (
        <View style={styles.messageContainer}>
          <Text style={styles.message}>
            Please log in to view your list or add a donation.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  topContainer: {
    alignItems: "flex-end",
  },
  messageContainer: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontWeight: "semibold",
  },
});
