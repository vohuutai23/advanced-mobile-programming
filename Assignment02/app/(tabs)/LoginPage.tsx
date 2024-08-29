import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://food-app-api-demo.onrender.com/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        Alert.alert("Login succesful");
        router.push("/");
      } else {
        Alert.alert("Login fail!", "Please check email and password again!");
      }
    } catch (error) {
      Alert.alert("Error", "Errors are occurring. Please do again");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "white",
      }}
    >
      <Text>Email:</Text>
      <TextInput
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Text>Password:</Text>
      <TextInput
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={{ marginBottom: 20 }}>
        <Button title="Login" onPress={handleLogin} />
      </View>
      <View>
        <Button
          title="Do you have not an account? Register now"
          onPress={() => router.push("/(tabs)/RegisterPage")}
        />
      </View>
    </View>
  );
}
