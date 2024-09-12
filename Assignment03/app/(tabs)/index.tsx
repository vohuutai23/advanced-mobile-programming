import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center text-orange-600 justify-center bg-white">
      <Text className="text-orange-600">Hello Tailwind</Text>
      <StatusBar style="auto" />
    </View>
  );
}
