import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons/faDownload";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Notification = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        "https://car-wash-backend-api.onrender.com/api/notification"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleIconPressNotification = () => {
    navigation.navigate("Notification");
  };

  return (
    <>
      <View
        style={{
          height: 50,
          width: 360,
          backgroundColor: "#F2F3F4",
          marginVertical: 10,
          marginHorizontal: 15,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 10 }}>
          <Text style={styles.text}>Notification Inbox</Text>
          <FontAwesomeIcon icon={faDownload} size={25} />
        </View>
      </View>
      <ScrollView Vertical={true} showsVerticalScrollIndicator={false}>
        {notifications.map((notification, index) => (
          <View
            key={index}
            style={{
              height: 70,
              width: 360,
              backgroundColor: "#F2F3F4",
              marginVertical: 10,
              marginHorizontal: 15,
            }}
          >
            <View style={{ flexDirection: "row", margin: 15 }}>
              <MaterialCommunityIcons
                name="code-braces-box"
                size={40}
                color="black"
              />
              <View>
                <Text style={{ margin: 2 }}>{notification.title}</Text>
                <Text>{notification.message}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      {/* ... Rest of your component code ... */}
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
  },
  footer: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 5,
    alignItems: "center",
  },
  iconsContainer1: {
    flexDirection: "row",
  },
  icon4: {
    marginHorizontal: 20,
  },
  text9: {
    alignItems: "center",
  },
  text10: {
    fontSize: 10,
  },
});

export default Notification;
