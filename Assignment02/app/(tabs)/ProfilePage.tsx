import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
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
            router.push("/(tabs)/LoginPage");
          }, 0);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <View style={styles.container}>
      <Image source={avatar} style={styles.avatar} />
      <Text style={styles.name}>Võ Hữu Tài</Text>
      <Text style={styles.email}>21110294@student.hcmute.edu.vn</Text>
      <Text style={styles.phone}>Phone: 0353199067</Text>
      <Text style={styles.timer}>
        Redirecting to Login page in {timeLeft} seconds...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: "#777",
    marginBottom: 5,
  },
  phone: {
    fontSize: 16,
    color: "#777",
    marginBottom: 20,
  },
  timer: {
    marginTop: 20,
    fontSize: 16,
    color: "#FF6347",
    fontStyle: "italic",
  },
});
