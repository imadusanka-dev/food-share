import { router } from "expo-router";
import { StyleSheet } from "react-native";
import { getRelativeDate } from "@/utils";
import type { FoodListing } from "@/types";
import { View, Text, Image, TouchableOpacity } from "react-native";

interface ListItemProps {
  item: FoodListing;
}

export const ListItem = ({ item }: ListItemProps) => {
  const handlePress = () => {
    router.push(`/food-list/${item.id}`);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image src={item.image} style={{ height: "100%", width: "100%" }} />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subTitle}>{item.category}</Text>
          <Text>{item.user_name}</Text>
          <View style={styles.bottomContainer}>
            <Text style={styles.location}>{item.city}</Text>
            <Text>{getRelativeDate(item.created_at)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 100,
    borderStyle: "solid",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 7,
    backgroundColor: "white",
    marginBottom: 20,
  },
  imageContainer: {
    width: "40%",
  },
  content: {
    padding: 7,
    width: "60%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 15,
    fontWeight: "semibold",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  location: {
    color: "grey",
  },
});
