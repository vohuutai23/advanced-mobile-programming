import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function RegisterPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const response = await fetch(
        "https://food-app-api-demo.onrender.com/api/users/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      if (response.ok) {
        Alert.alert("Register succesful!", "You can log in rightnow.");
        router.push("/(tabs)/LoginPage");
      } else {
        Alert.alert("Register fail", "Please check the information again.");
      }
    } catch (error) {
      Alert.alert("Error", "Errors are occurring. Please do again.");
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
      <Text>Name:</Text>
      <TextInput
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
        value={name}
        onChangeText={setName}
      />
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
        <Button title="Register" onPress={handleRegister} />
      </View>
      <View>
        <Button
          title="Do you have an account? Log in now"
          onPress={() => router.push("/(tabs)/LoginPage")}
        />
      </View>
    </View>
  );
}
