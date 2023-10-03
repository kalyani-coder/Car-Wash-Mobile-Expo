
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Appearance } from 'react-native';
import { RefreshControl } from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons/faDownload";
import { faBell } from '@fortawesome/free-regular-svg-icons/faBell';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Notification = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const colorScheme = Appearance.getColorScheme();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  //for refreshing the field 

  const onRefresh = () => {
        
    setRefreshing(true);

    setTimeout(() => {
      
      setRefreshing(false);
    }, 2000); 
  };

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

  const commonStyles = {
    color: colorScheme === 'dark' ? '#fff' : '#000',
  };

  return (
    <View style={[styles.container, commonStyles]}>
      <View style={styles.header}>
        <View style={styles.headerBackground}>
          <View style={styles.headerContent}>
            <Text style={styles.headerText}>Notification Inbox</Text>
            {/* <TouchableOpacity onPress={handleIconPressNotification}>
              <FontAwesomeIcon icon={faDownload} size={25} color="black" />
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
      <ScrollView
        Vertical={true}
        showsVerticalScrollIndicator={false}
        style={styles.notificationList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#5B7586" 
            title="Refreshing..." 
            titleColor="#5B7586"
          />
        }
      >
        {notifications.map((notification, index) => (
          <TouchableOpacity
            key={index}
            style={styles.notificationItem}
          >
            
             <FontAwesomeIcon icon={faBell} size={35} color="black" style={styles.icon} />
            <View style={styles.notificationText}>
              <Text style={styles.title}>{notification.title}</Text>
              <Text>{notification.message}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* ... Rest of your component code ... */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#D8D8D8'
  },
  // header: {
  //   height: 100,
  // },
  headerBackground: {
    backgroundColor: "#F2F3F4",
    marginVertical: 10,
    marginHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  notificationList: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  notificationItem: {
    height: 70,
    backgroundColor: "#F2F3F4",
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 5,
  },
  icon: {
    marginRight: 15,
  },
  notificationText: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default Notification;
