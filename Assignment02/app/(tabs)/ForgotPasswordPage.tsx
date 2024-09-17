import React, { useState } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  const handleForgotPassword = async () => {
    try {
      const response = await fetch(
        "https://food-app-api-demo.onrender.com/api/users/forget-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        Alert.alert("Success", "OTP sent to your email.");
        router.push({ pathname: "/(tabs)/ResetPassword", params: { email } });
      } else {
        Alert.alert("Error", "Failed to send OTP. Try again.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  };

  return (
    <View className="flex-1 justify-center px-5 bg-white">
      <Text className="text-2xl font-bold mb-8 text-center text-gray-800">
        Forgot Password
      </Text>
      <Text className="text-base mb-2 text-gray-600">
        Enter your email to reset your password
      </Text>
      <TextInput
        className="border border-gray-300 p-4 mb-4 rounded bg-gray-50 text-gray-800"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholder="Enter your email"
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity
        className="bg-cyan-800 p-4 rounded items-center mb-5"
        onPress={handleForgotPassword}
      >
        <Text className="text-white text-lg font-bold">Send OTP</Text>
      </TouchableOpacity>
    </View>
  );
}
