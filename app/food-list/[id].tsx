import dayjs from "dayjs";
import { supabase } from "@/supabase";
import type { FoodListing } from "@/types";
import { DataLoading } from "@/components";
import { useEffect, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { useLocalSearchParams } from "expo-router";
import { Divider, Button } from "react-native-paper";
import { Text, StyleSheet, View, Image, Linking, Alert } from "react-native";
import Colors from "@/constants/Colors";

const Details = () => {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<FoodListing | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      const { data, error } = await supabase
        .from("food_listings")
        .select("*")
        .eq("id", id)
        .single();

      setItem(data);
      setLoading(false);
    };

    fetchItem();
  }, [id]);

  const handleCall = () => {
    const phoneNumber = `tel:0779132867`;

    Linking.openURL(phoneNumber).catch((err) => {
      Alert.alert("Error", "Unable to open dialer.");
    });
  };

  return (
    <View>
      {loading && <DataLoading />}
      {!loading && item && (
        <>
          <Image
            source={{ uri: item.image }}
            style={{ height: 300, width: "100%" }}
          />
          <View style={styles.container}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.subTitleContainer}>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.date}>
                Posted on: {dayjs(item.created_at).format("YYYY-MM-DD hh:mm A")}
              </Text>
            </View>
            <Divider />
            <View style={styles.locationContainer}>
              <View style={styles.locationContainer}>
                <Entypo
                  name="location-pin"
                  size={24}
                  color={Colors.light.tint}
                />
                <Text>{item.city}</Text>
              </View>
              <Text>Iusru Madusanka</Text>
            </View>
            <Text>{item.special_notes}</Text>
            <View style={styles.contactButtonContainer}>
              <Button icon="phone" mode="outlined" onPress={handleCall}>
                Contact Now
              </Button>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: "100%",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  subTitleContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  category: {
    fontSize: 15,
    fontWeight: "semibold",
  },
  date: {
    fontSize: 15,
    fontWeight: "semibold",
  },
  locationContainer: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  contactButtonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});
