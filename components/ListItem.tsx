import { StyleSheet } from "react-native";
import { View, Text, Image } from "react-native";

export const ListItem = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          src={"https://picsum.photos/200/300"}
          style={{ height: "100%", width: "100%" }}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Fired Rice</Text>
        <Text style={styles.subTitle}>Rice</Text>
        <Text>Restuarent Name</Text>
        <View style={styles.bottomContainer}>
          <Text style={styles.location}>Colombo</Text>
          <Text>Today</Text>
        </View>
      </View>
    </View>
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
