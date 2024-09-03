import { useState } from "react";
import { router } from "expo-router";
import { supabase } from "@/supabase";
import { View, Text } from "./Themed";
import { ITEM_STATUS } from "@/constants";
import { getRelativeDate } from "@/utils";
import type { FoodListing } from "@/types";
import { IconButton } from "react-native-paper";
import { Image, StyleSheet, Alert } from "react-native";
import { ConfirmationDialog } from "./ConfirmationDialog";

interface Props {
  items: FoodListing[] | null;
  reFetchItems: () => void;
}

interface ListItemProps {
  item: FoodListing;
  handleDelete: (id: number) => void;
  handleComplete: (id: number) => void;
}

const ListItem = ({ item, handleComplete, handleDelete }: ListItemProps) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    useState<boolean>(false);
  const [showCompleteConfirmation, setShowCompleteConfirmation] =
    useState<boolean>(false);

  const handleDeletePress = () => {
    setShowDeleteConfirmation(true);
  };

  const handleCompletePress = () => {
    setShowCompleteConfirmation(true);
  };

  const handleEditPress = () => {
    router.push(`/edit/${item.id}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image src={item.image} style={{ height: "100%", width: "100%" }} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.middleContainer}>
          <Text style={styles.subTitle}>{item.category}</Text>
          <Text style={styles.subTitle}>
            {getRelativeDate(item.created_at)}
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          {item.status === "AVAILABLE" ? (
            <>
              <IconButton
                icon="delete"
                mode="contained"
                size={15}
                onPress={handleDeletePress}
              />
              <IconButton
                icon="pencil"
                mode="contained"
                size={15}
                onPress={handleEditPress}
              />
              <IconButton
                icon="check"
                mode="contained"
                size={15}
                onPress={handleCompletePress}
              />
            </>
          ) : (
            <Text
              style={{
                marginTop: 5,
                fontSize: 15,
                fontWeight: "semibold",
                color: "green",
              }}
            >
              Completed
            </Text>
          )}
        </View>
      </View>
      <ConfirmationDialog
        visible={showDeleteConfirmation}
        onDismiss={() => setShowDeleteConfirmation(false)}
        onConfirm={() => {
          setShowDeleteConfirmation(false);
          handleDelete(item.id);
        }}
        title="Delete"
        content="Are you sure you want to delete this item?"
        primaryLabel="Yes"
        secondaryLabel="No"
      />
      <ConfirmationDialog
        visible={showCompleteConfirmation}
        onDismiss={() => setShowCompleteConfirmation(false)}
        onConfirm={() => {
          setShowCompleteConfirmation(false);
          handleComplete(item.id);
        }}
        title="Complete"
        content="Are you sure you want to complete this item?"
        primaryLabel="Yes"
        secondaryLabel="No"
      />
    </View>
  );
};

export const MyListItems = ({ items, reFetchItems }: Props) => {
  const handleDelete = async (id: number) => {
    const { error } = await supabase
      .from("food_listings")
      .delete()
      .eq("id", id);

    if (error) {
      Alert.alert("Error", "Failed to delete");
      return;
    }

    reFetchItems();
  };

  const handleComplete = async (id: number) => {
    const payload = {
      status: ITEM_STATUS.CLAIMED,
    };

    const { error } = await supabase
      .from("food_listings")
      .update(payload)
      .eq("id", id);

    if (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong");
      return;
    }

    Alert.alert("Success", "Successfully completed");
    reFetchItems();
  };

  return (
    <View>
      {items?.map((item) => (
        <ListItem
          key={item.id}
          item={item}
          handleComplete={handleComplete}
          handleDelete={handleDelete}
        />
      ))}
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
    marginTop: 20,
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
    justifyContent: "flex-end",
  },
  middleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
