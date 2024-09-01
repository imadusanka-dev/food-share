import { View, Text } from "./Themed";
import type { FoodListing } from "@/types";
import { Image, StyleSheet } from "react-native";

interface Props {
  items: FoodListing[] | null;
}

const ListItem = ({ item }: { item: FoodListing }) => {
  return (
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
          <Text>Today</Text>
        </View>
      </View>
    </View>
  );
};

export const MyListItems = ({ items }: Props) => {
  return (
    <View>{items?.map((item) => <ListItem key={item.id} item={item} />)}</View>
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
