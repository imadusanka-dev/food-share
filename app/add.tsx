import { TextInput, Button } from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import Colors from "@/constants/Colors";

const AddItem = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      lastName: "",
      quantity: "",
      special_notes: "",
    },
  });
  const onSubmit = (data) => console.log(data);

  return (
    <View style={styles.container}>
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
  buttonContainer: {
    alignItems: "center",
  },
  formItem: {
    marginBottom: 10,
    backgroundColor: "#fff",
  },
});
