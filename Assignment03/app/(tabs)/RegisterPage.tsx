import React, { useState } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function RegisterPage() {
  const [displayName, setDisplayName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const response = await fetch(
        "https://realtime-chat-app-api-tbaf.onrender.com/v1/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ displayName, email, password, phone }),
        }
      );

      if (response.ok) {
        Alert.alert("Success", "Account registered successfully.");
        router.push({ pathname: "/(tabs)/VerifyPage", params: { email } });
      } else {
        Alert.alert("Error", "Registration failed. Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  };

  return (
    <View className="flex-1 justify-center px-5 bg-white">
      <Text className="text-2xl font-bold mb-8 text-center text-gray-800">
        Register
      </Text>
      <TextInput
        className="border border-gray-300 p-4 mb-4 rounded bg-gray-50 text-gray-800"
        value={displayName}
        onChangeText={setDisplayName}
        placeholder="Display Name"
        placeholderTextColor="#aaa"
      />
      <TextInput
        className="border border-gray-300 p-4 mb-4 rounded bg-gray-50 text-gray-800"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholder="Email"
        placeholderTextColor="#aaa"
      />
      <TextInput
        className="border border-gray-300 p-4 mb-4 rounded bg-gray-50 text-gray-800"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Password"
        placeholderTextColor="#aaa"
      />
      <TextInput
        className="border border-gray-300 p-4 mb-4 rounded bg-gray-50 text-gray-800"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        placeholder="Phone"
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity
        className="bg-cyan-800 p-4 rounded items-center mb-5"
        onPress={handleRegister}
      >
        <Text className="text-white text-lg font-bold">Register</Text>
      </TouchableOpacity>
    </View>
  );
}
