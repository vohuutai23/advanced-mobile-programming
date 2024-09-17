import React, { useState } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
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
        Alert.alert("Register successful!", "You can log in right now.");
        router.push("/(tabs)/LoginPage");
      } else {
        Alert.alert("Register failed", "Please check the information again.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  };

  return (
    <View className="flex-1 justify-center p-5 bg-gray-100">
      <Text className="text-2xl font-bold mb-8 text-center text-gray-800">
        Create Your Account
      </Text>

      <Text className="text-lg mb-2 text-gray-600">Name</Text>
      <TextInput
        className="border border-gray-300 p-4 mb-4 rounded bg-white text-gray-800"
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
        placeholderTextColor="#aaa"
      />

      <Text className="text-lg mb-2 text-gray-600">Email</Text>
      <TextInput
        className="border border-gray-300 p-4 mb-4 rounded bg-white text-gray-800"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholder="Enter your email"
        placeholderTextColor="#aaa"
      />

      <Text className="text-lg mb-2 text-gray-600">Password</Text>
      <TextInput
        className="border border-gray-300 p-4 mb-6 rounded bg-white text-gray-800"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Enter your password"
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity
        className="bg-cyan-800 p-4 rounded items-center mb-5"
        onPress={handleRegister}
      >
        <Text className="text-white text-lg font-bold">Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(tabs)/LoginPage")}>
        <Text className="text-teal-600 text-center">
          Already have an account? Log in now
        </Text>
      </TouchableOpacity>
    </View>
  );
}
