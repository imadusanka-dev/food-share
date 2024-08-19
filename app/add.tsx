import { useState } from "react";
import { router } from "expo-router";
import { supabase } from "@/supabase";
import Colors from "@/constants/Colors";
import { decode } from "base64-arraybuffer";
import * as ImagePicker from "expo-image-picker";
import { useForm, Controller } from "react-hook-form";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import { TextInput, Button, RadioButton } from "react-native-paper";
import { SUPABASE_STORAGE_BASE_URL, ITEM_STATUS } from "@/constants";

const AddItem = () => {
  const [image, setImage] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      quantity: "",
      special_notes: "",
      category: "",
      city: "",
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

  const onSubmit = async (data) => {
    const { title, quantity, special_notes, category, city } = data;
    const uploadedImage = await uploadImage(image);

    if (!uploadedImage) {
      Alert.alert("Error", "Image uploading failed");
      return;
    }

    const payload = {
      title,
      quantity,
      special_notes,
      category,
      city,
      image: `${SUPABASE_STORAGE_BASE_URL}${uploadedImage.fullPath}`,
      status: ITEM_STATUS.AVAILABLE,
    };

    //save data in supabase
    const { data: item, error } = await supabase
      .from("food_listings")
      .insert([payload]);

    if (error) {
      console.log(error);
      Alert.alert("Error", "Failed to save data");
      return;
    }

    Alert.alert("Success", "Data saved successfully");
    router.push("/my_list");
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {image && (
          <Image
            source={{ uri: image.uri }}
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
          />
        )}
        name="title"
      />
      {errors.title && <Text>This is required.</Text>}

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
          />
        )}
        name="quantity"
      />

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
          />
        )}
        name="city"
      />

      <Controller
        control={control}
        rules={{
          required: true,
        }}
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
        >
          Submit
        </Button>
      </View>
    </View>
  );
};

export default AddItem;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: "100%",
    backgroundColor: "#fff",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: "center",
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
});
