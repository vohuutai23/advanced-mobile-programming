import React, { useState } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router"; // Sử dụng useLocalSearchParams

export default function ResetPasswordPage() {
  const [otp, setOtp] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const router = useRouter();
  const { email } = useLocalSearchParams(); // Lấy email từ params

  const handleResetPassword = async () => {
    try {
      const response = await fetch(
        "https://food-app-api-demo.onrender.com/api/users/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp, newPassword }),
        }
      );

      if (response.ok) {
        Alert.alert("Success", "Password has been reset successfully.");
        router.push("/(tabs)/LoginPage");
      } else {
        Alert.alert(
          "Error",
          "Failed to reset password. Check your OTP or try again."
        );
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  };

  return (
    <View className="flex-1 justify-center p-5 bg-white">
      <Text className="text-2xl font-bold mb-8 text-center text-gray-800">
        Reset Password
      </Text>

      <Text className="text-base mb-2 text-gray-600">
        Enter the OTP sent to your email
      </Text>
      <TextInput
        className="border border-gray-300 p-4 mb-4 rounded bg-gray-50 text-gray-800"
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
        placeholder="Enter OTP"
        placeholderTextColor="#aaa"
      />

      <TextInput
        className="border border-gray-300 p-4 mb-6 rounded bg-gray-50 text-gray-800"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        placeholder="Enter new password"
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity
        className="bg-green-600 p-4 rounded items-center mb-5"
        onPress={handleResetPassword}
      >
        <Text className="text-white text-lg font-bold">Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
}
