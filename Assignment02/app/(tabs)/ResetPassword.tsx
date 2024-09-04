import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
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
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.label}>Enter the OTP sent to your email</Text>
      <TextInput
        style={styles.input}
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
        placeholder="Enter OTP"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        placeholder="Enter new password"
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
    color: "#333",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
