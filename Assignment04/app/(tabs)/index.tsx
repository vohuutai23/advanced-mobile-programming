// // import { useRouter } from "expo-router";
// // import { useEffect } from "react";

// // export default function Index() {
// //   const router = useRouter();

// //   useEffect(() => {
// //     setTimeout(() => {
// //       router.replace("/(tabs)/LoginPage");
// //     }, 0);
// //   }, [router]);

// //   return null;
// // }

import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        console.log("accessToken Index", accessToken);
        if (accessToken) {
          router.replace("/(tabs)/ProfilePage");
        } else {
          router.replace("/(tabs)/LoginPage");
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        router.replace("/(tabs)/LoginPage");
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, [router]);

  if (isLoading) {
    return null;
  }

  return null;
}
// import React, { useEffect, useState } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import AppNavigator from "../navigation/AppNavigator";
// import Loading from "../../components/Loading";
// import LoginPage from "../(tabs)/LoginPage";

// export default function App() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const checkToken = async () => {
//       try {
//         const token = await AsyncStorage.getItem("accessToken");
//         if (token) {
//           setIsAuthenticated(true);
//         } else {
//           setIsAuthenticated(false);
//         }
//       } catch (error) {
//         console.log("Error checking token", error);
//         setIsAuthenticated(false);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     checkToken();
//   }, []);

//   if (isLoading) {
//     return <Loading />;
//   }

//   return (
//     <NavigationContainer>
//       {isAuthenticated ? <AppNavigator /> : <LoginPage />}
//     </NavigationContainer>
//   );
// }
