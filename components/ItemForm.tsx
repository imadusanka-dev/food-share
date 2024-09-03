import React from "react";
import { router } from "expo-router";
import { supabase } from "../supabase";
import Colors from "../constants/Colors";
import type { FoodListing } from "@/types";
import { useState, useEffect } from "react";
import { decode } from "base64-arraybuffer";
import { Session } from "@supabase/supabase-js";
import * as ImagePicker from "expo-image-picker";
import { useForm, Controller } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SUPABASE_STORAGE_BASE_URL, ITEM_STATUS } from "../constants";
import { TextInput, Button, RadioButton, HelperText } from "react-native-paper";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  SafeAreaView,
} from "react-native";

interface Props {
  item?: FoodListing;
}

export const ItemForm = ({ item }: Props) => {
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState<string | null>(item?.image || null);
  const [loading, setLoading] = useState<boolean>(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await AsyncStorage.getItem("supabase-session");
      if (session) {
        setSession(JSON.parse(session));
      }
    };
    fetchSession();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: item?.title || "",
      quantity: item?.quantity || "",
      special_notes: item?.special_notes || "",
      category: item?.category || "",
      city: item?.city || "",
    },
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: false,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
      setImageURL(result.assets[0]?.uri);
    }
  };

  const uploadImage = async (image) => {
    const { data, error } = await supabase.storage
      .from("food-share")
      .upload(
        `${new Date().getTime()}-${image.fileName}`,
        decode(image.base64),
        {
          contentType: "image/*",
        },
      );
    if (error) {
      console.log(error);
      return;
    }
    return data;
  };

  const onSubmit = async (formData) => {
    setLoading(true);
    const { title, quantity, special_notes, category, city } = formData;
    let uploadedImage;
    if (image) {
      uploadedImage = await uploadImage(image);
    }

    if (image && !uploadedImage) {
      Alert.alert("Error", "Image uploading failed");
      setLoading(false);
      return;
    }

    if (item) {
      const payload = {
        title,
        quantity,
        special_notes,
        category,
        city,
        image: uploadedImage
          ? `${SUPABASE_STORAGE_BASE_URL}${uploadedImage?.fullPath}`
          : imageURL,
      };

      //update data in supabase
      const { error } = await supabase
        .from("food_listings")
        .update(payload)
        .eq("id", item.id);

      if (error) {
        console.log(error);
        Alert.alert("Error", "Failed to update data");
        setLoading(false);
        return;
      }

      Alert.alert("Success", "Data updated successfully");
      router.push("/my_list");
    } else {
      const payload = {
        title,
        quantity,
        special_notes,
        category,
        city,
        image: `${SUPABASE_STORAGE_BASE_URL}${uploadedImage?.fullPath}`,
        status: ITEM_STATUS.AVAILABLE,
        user_id: session?.user.id,
        user_name: session?.user.user_metadata.name,
        phone: session?.user.user_metadata.phone,
      };

      //save data in supabase
      const { error } = await supabase.from("food_listings").insert([payload]);

      if (error) {
        console.log(error);
        Alert.alert("Error", "Failed to save data");
        setLoading(false);
        return;
      }

      Alert.alert("Success", "Data saved successfully");
      router.push("/my_list");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        {imageURL && (
          <Image
            source={{ uri: imageURL }}
            style={{ width: 200, height: 200 }}
          />
        )}
      </View>
      <Button onPress={pickImage} icon="folder-multiple-image">
        Select Image
      </Button>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.formItem}
            label="Title"
            mode="outlined"
            value={value}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            error={!!errors.title}
          />
        )}
        name="title"
      />
      <HelperText type="error" visible={!!errors.title}>
        Title is required
      </HelperText>

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <RadioButton.Group
            onValueChange={(newValue) => onChange(newValue)}
            value={value}
          >
            <View style={styles.categoryContainer}>
              <View>
                <Text>Rice</Text>
                <RadioButton value="Rice" />
              </View>
              <View>
                <Text>Bakery</Text>
                <RadioButton value="Bakery" />
              </View>
              <View>
                <Text>Desserts</Text>
                <RadioButton value="Desserts" />
              </View>
              <View>
                <Text>Other</Text>
                <RadioButton value="Other" />
              </View>
            </View>
          </RadioButton.Group>
        )}
        name="category"
      />
      <HelperText type="error" visible={!!errors.category}>
        Category is required
      </HelperText>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.formItem}
            label="Quantity"
            mode="outlined"
            value={value}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            error={!!errors.quantity}
          />
        )}
        name="quantity"
      />
      <HelperText type="error" visible={!!errors.quantity}>
        Quantity is required.
      </HelperText>

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.formItem}
            label="Pickup location"
            mode="outlined"
            value={value}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            error={!!errors.city}
          />
        )}
        name="city"
      />
      <HelperText type="error" visible={!!errors.city}>
        Pickup location is required.
      </HelperText>

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.formItem}
            label="Special Notes"
            mode="outlined"
            multiline={true}
            numberOfLines={6}
            value={value}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
          />
        )}
        name="special_notes"
      />
      <View style={styles.buttonContainer}>
        <Button
          style={{ backgroundColor: Colors.light.tint }}
          textColor="#fff"
          mode="contained-tonal"
          onPress={handleSubmit(onSubmit)}
          loading={loading}
        >
          Submit
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  formItem: {
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  error: {
    color: "#BD301C",
  },
});
