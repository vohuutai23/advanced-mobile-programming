import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://your-phttps://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/219342202_102945122080470_84211212289614708_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeFKyOqdZG5S-Zu_cq_IKHzKJXli96aLNjgleWL3pos2ODRyVF3XARh7aMO3tPk5a-jE3Gj51OIN_EnAlgQx9Ok1&_nc_ohc=5GXRkVGhZiwQ7kNvgEn2I0p&_nc_pt=1&_nc_ht=scontent.fsgn8-4.fna&oh=00_AYAsQb7fmbHxM2S2tLHIlLhoPAfp96BZSoK39zPWOLUY5A&oe=66CC71F5rofile-image-url.com",
        }}
        style={styles.profileImage}
      />
      <Text style={styles.name}>Name: Vo Huu Tai</Text>
      <Text style={styles.info}>Student ID: 21110294</Text>
      <Text style={styles.info}>Contact: 21110294@student.hcmute.edu.vn</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  info: {
    fontSize: 18,
    marginTop: 5,
  },
});
