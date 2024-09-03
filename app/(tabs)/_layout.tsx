import Colors from "@/constants/Colors";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import React, { useContext } from "react";
import { Button } from "react-native-paper";
import { AuthContext } from "@/context/authContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import AsyncStorage from "@react-native-async-storage/async-storage";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isLoggedIn, setLoggedIn } = useContext(AuthContext);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("supabase-session");
    setLoggedIn(false);
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () =>
            isLoggedIn ? (
              <Pressable onPress={handleLogout}>
                {({ pressed }) => (
                  <FontAwesome
                    name="sign-out"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            ) : (
              <Link href="/login" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="sign-in"
                      size={25}
                      color={Colors[colorScheme ?? "light"].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
        }}
      />
      <Tabs.Screen
        name="my_list"
        options={{
          title: "My List",
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
    </Tabs>
  );
}
