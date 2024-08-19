import { z } from "zod";
import { supabase } from "@/supabase";
import { Link, router } from "expo-router";
import { StyleSheet, Alert } from "react-native";
import { Text, View } from "@/components/Themed";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
};

const signUpSchema = z
  .object({
    name: z.string().nonempty("Name is required"),
    email: z.string().email().nonempty("Email is required"),
    password: z
      .string()
      .min(6, "Password must contains minimum 6 characters")
      .nonempty("Password is required"),
    confirmPassword: z.string().nonempty("Confirm Password is required"),
    phone: z
      .string()
      .min(10, "Invalid phone number")
      .nonempty("Phone is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
  });

export default function RgisterScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },
  });

  console.log(errors);

  const onSubmit = async (input: FormData) => {
    const { name, email, password, phone } = input;

    const {
      data: { session, user },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
      phone,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) {
      Alert.alert("Failed", "Something went wrong");
      console.error(error);
      return;
    }

    await AsyncStorage.setItem("supabase-session", JSON.stringify(session));

    Alert.alert("Success", "Account created successfully");

    console.log(session, user);
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
              label="Name"
              mode="outlined"
              value={value}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              error={!!errors.name}
            />
          )}
          name="name"
        />
        {errors.name && (
          <Text style={styles.error}>{errors.name?.message}</Text>
        )}
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
              style={{ marginTop: 10 }}
              onChangeText={(value) => onChange(value)}
              error={!!errors.email}
            />
          )}
          name="email"
        />
        {errors.email && (
          <Text style={styles.error}>{errors.email?.message}</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Password"
              mode="outlined"
              value={value}
              onBlur={onBlur}
              style={{ marginTop: 10 }}
              onChangeText={(value) => onChange(value)}
              secureTextEntry={true}
              error={!!errors.password}
            />
          )}
          name="password"
        />
        {errors.password && (
          <Text style={styles.error}>{errors.password?.message}</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Confirm Password"
              mode="outlined"
              value={value}
              onBlur={onBlur}
              style={{ marginTop: 10 }}
              onChangeText={(value) => onChange(value)}
              secureTextEntry={true}
              error={!!errors.confirmPassword}
            />
          )}
          name="confirmPassword"
        />
        {errors.confirmPassword && (
          <Text style={styles.error}>{errors.confirmPassword?.message}</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Telephone Number"
              mode="outlined"
              value={value}
              onBlur={onBlur}
              style={{ marginTop: 10 }}
              onChangeText={(value) => onChange(value)}
              error={!!errors.phone}
            />
          )}
          name="phone"
        />
        {errors.phone && (
          <Text style={styles.error}>{errors.phone?.message}</Text>
        )}
        <Button
          style={styles.loginButton}
          mode="contained"
          onPress={handleSubmit(onSubmit)}
        >
          Register
        </Button>
        <Link href="/login" style={styles.text}>
          <Text>Already have an account</Text>
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
  error: {
    color: "#C3040D",
    marginTop: 5,
  },
});
