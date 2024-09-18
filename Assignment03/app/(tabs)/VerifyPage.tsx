import React, { useState } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function VerifyPage() {
  const [otp, setOtp] = useState<string>("");
  const { email } = useLocalSearchParams();
  const router = useRouter();

  const handleVerify = async () => {
    try {
      const response = await fetch(
        "https://realtime-chat-app-api-tbaf.onrender.com/v1/user/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
        }
      );

      if (response.ok) {
        Alert.alert("Success", "OTP verified successfully.");
        router.push("/(tabs)/LoginPage");
      } else {
        Alert.alert("Error", "Invalid OTP. Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  };

  const emailString = Array.isArray(email) ? email[0] : email || "";

  return (
    <View className="flex-1 justify-center px-5 bg-white">
      <Text className="text-2xl font-bold mb-8 text-center text-gray-800">
        Verify Account
      </Text>
      <TextInput
        className="border border-gray-300 p-4 mb-4 rounded bg-gray-50 text-gray-800"
        value={emailString}
        editable={false}
        placeholder="Email"
        placeholderTextColor="#aaa"
      />
      <TextInput
        className="border border-gray-300 p-4 mb-4 rounded bg-gray-50 text-gray-800"
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
        placeholder="Enter OTP"
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity
        className="bg-cyan-800 p-4 rounded items-center mb-5"
        onPress={handleVerify}
      >
        <Text className="text-white text-lg font-bold">Verify OTP</Text>
      </TouchableOpacity>
    </View>
  );
}
