import React, { useState } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://realtime-chat-app-api-tbaf.onrender.com/v1/user/login",
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
        const accessToken = data.data.accessToken;
        await AsyncStorage.setItem("accessToken", data.data.accessToken);

        Alert.alert("Login successful");

        router.replace("/(tabs)/ProfilePage");
      } else {
        Alert.alert("Login failed!", "Please check email and password again!");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again." + error);
    }
  };

  return (
    <View className="flex-1 justify-center px-5 bg-white">
      <Text className="text-2xl font-bold mb-8 text-center text-gray-800">
        Welcome Back!
      </Text>

      <Text className="text-lg mb-2 text-gray-600">Email</Text>
      <TextInput
        className="border border-gray-300 p-4 mb-4 rounded bg-gray-50 text-gray-800"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholder="Enter your email"
        placeholderTextColor="#aaa"
      />

      <Text className="text-lg mb-2 text-gray-600">Password</Text>
      <TextInput
        className="border border-gray-300 p-4 mb-4 rounded bg-gray-50 text-gray-800"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Enter your password"
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity
        className="bg-cyan-800 p-4 rounded items-center mb-5"
        onPress={handleLogin}
      >
        <Text className="text-white text-lg font-bold">Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(tabs)/RegisterPage")}>
        <Text className="text-center text-blue-600 text-base">
          Don't have an account? Register now
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="mt-5 items-center"
        onPress={() => router.push("/(tabs)/ForgotPasswordPage")}
      >
        <Text className="text-teal-900 text-base">Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
}
