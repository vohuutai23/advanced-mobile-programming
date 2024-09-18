import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfilePage() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const avatar = require("../../assets/images/avatar.jpg");

  const fetchUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      console.log("tokenProfile, ", token);
      if (!token) {
        router.replace("/(tabs)/LoginPage");
        return;
      }

      const response = await fetch(
        "https://realtime-chat-app-api-tbaf.onrender.com/v1/user/profile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const user = data.data;
        console.log("user name:", user.displayName);
        console.log("user phone:", user.phone);
        console.log("user email:", user.email);
        setUserInfo(user);
      } else {
        Alert.alert("Error", "Failed to fetch user info");
        router.replace("/(tabs)/LoginPage");
      }
    } catch (error) {
      console.log("Error fetching user info", error);
      router.replace("/(tabs)/LoginPage");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("accessToken");
    router.replace("/(tabs)/LoginPage");
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!userInfo) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg">Failed to load user info</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Image source={avatar} className="w-24 h-24 rounded-full mb-4" />
      <Text className="text-xl font-bold mb-2">{userInfo.displayName}</Text>

      <Text className="text-base text-gray-600">Phone: {userInfo.phone}</Text>

      <Text className="text-base text-gray-600">Email: {userInfo.email}</Text>

      <View className="mt-5">
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
}
