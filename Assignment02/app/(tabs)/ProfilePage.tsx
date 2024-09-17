import React from "react";
import { View, Text, Image, Button } from "react-native";
import { useRouter } from "expo-router";

export default function ProfilePage() {
  const router = useRouter();
  const avatar = require("../../assets/images/avatar.jpg");

  const handleLogout = () => {
    router.replace("/(tabs)/LoginPage");
  };

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Image source={avatar} className="w-24 h-24 rounded-full mb-4" />
      <Text className="text-xl font-bold mb-2">Võ Hữu Tài</Text>
      <Text className="text-base text-gray-600">Welcome to Home page</Text>

      <View className="mt-5">
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
}
