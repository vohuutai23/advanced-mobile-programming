import React, { useState, useEffect } from "react";
import { View, Text, Image, Button } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function ProfilePage() {
  const router = useRouter();
  const { name, avatar } = useLocalSearchParams(); // Retrieve params passed from LoginPage
  const [isMounted, setIsMounted] = useState(false);

  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);

  // useEffect(() => {
  //   if (isMounted) {
  //     router.replace("/(tabs)ProfilePage");
  //   }
  // }, [isMounted, router]);

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Image
        source={
          avatar ? { uri: avatar } : require("../../assets/images/avatar.jpg")
        }
        className="w-24 h-24 rounded-full"
      />
      <Text className="text-xl font-bold text-red-800 mt-4">Võ Hữu Tài</Text>
      <Text className="text-base text-gray-600 mt-2">Welcome to Home page</Text>
    </View>
  );
}
