import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { useRouter } from "expo-router";

export default function ProfilePage() {
  const router = useRouter();
  const avatar = require("../../assets/images/avatar.jpg");
  const [timeLeft, setTimeLeft] = useState<number>(10);

  useEffect(() => {
    setTimeLeft(10);
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          setTimeout(() => {
            router.push("/ProfilePage");
          }, 0);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 px-5">
      <Image
        source={avatar}
        style={{ width: 120, height: 120, borderRadius: 60, marginBottom: 20 }}
      />
      <Text className="text-2xl font-bold text-gray-800 mb-2">Võ Hữu Tài</Text>
      <Text className="text-base text-gray-600 mb-1">
        21110294@student.hcmute.edu.vn
      </Text>
      <Text className="text-base text-gray-600 mb-5">Phone: 0353199067</Text>
      <Text className="text-lg text-red-500 italic">
        Redirecting to Login page in {timeLeft} seconds...
      </Text>
    </View>
  );
}
