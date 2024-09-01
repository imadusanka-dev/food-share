import { supabase } from "@/supabase";
import { Link, router } from "expo-router";
import { Alert, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (input) => {
    const { email, password } = input;

    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert("Failed", error.message);
      return;
    }

    await AsyncStorage.setItem("supabase-session", JSON.stringify(session));
    router.push("/my_list");
  };

  return (
    <View style={styles.container}>
      <View style={styles.fromContainer}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Email"
              mode="outlined"
              value={value}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
            />
          )}
          name="email"
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Password"
              mode="outlined"
              style={{ marginTop: 10 }}
              secureTextEntry={true}
              value={value}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
            />
          )}
          name="password"
        />
        <Button
          style={styles.loginButton}
          mode="contained"
          onPress={handleSubmit(onSubmit)}
        >
          Login
        </Button>
        <Link href="/register" style={styles.text}>
          <Text>Don't have an account</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
  },
  fromContainer: {
    width: "80%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  loginButton: {
    marginTop: 10,
  },
  text: {
    textAlign: "center",
    marginTop: 10,
  },
});
