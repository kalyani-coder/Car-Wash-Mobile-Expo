// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
// } from "react-native";
// import { Appearance } from 'react-native';
// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import { faDownload } from "@fortawesome/free-solid-svg-icons/faDownload";
// import { MaterialCommunityIcons } from "@expo/vector-icons";

// const Notification = ({ navigation }) => {
//   const [notifications, setNotifications] = useState([]);
//   const colorScheme = Appearance.getColorScheme();

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   const fetchNotifications = async () => {
//     try {
//       const response = await fetch(
//         "https://car-wash-backend-api.onrender.com/api/notification"
//       );
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const data = await response.json();
//       setNotifications(data);
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
//     }
//   };

//   const handleIconPressNotification = () => {
//     navigation.navigate("Notification");
//   };

//   const commonStyles = {
//     // backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
//     color: colorScheme === 'dark' ? '#fff' : '#000',
//   };

//   return (
//     <>
//     <View style={[styles.header,commonStyles]}>
//       <View
//         style={{
//           height: 50,
//           width: 360,
//           backgroundColor: "#F2F3F4",
//           marginVertical: 10,
//           marginHorizontal: 15,
//         }}
//       >
//         <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 10 }}>
//           <Text style={styles.text}>Notification Inbox</Text>
//           <FontAwesomeIcon icon={faDownload} size={25} />
//         </View>
//       </View>
//       <ScrollView Vertical={true} showsVerticalScrollIndicator={false}  style={{flex:1}}>
//         {notifications.map((notification, index) => (
//           <View
//             key={index}
//             style={{
//               height: 70,
//               width: 360,
//               backgroundColor: "#F2F3F4",
//               marginVertical: 10,
//               marginHorizontal: 15,
//             }}
//           >
//             <View style={{ flexDirection: "row", margin: 15 }}>
//               <MaterialCommunityIcons
//                 name="code-braces-box"
//                 size={40}
//                 color="black"
//               />
//               <View>
//                 <Text style={{ margin: 2 }}>{notification.title}</Text>
//                 <Text>{notification.message}</Text>
//               </View>
//             </View>
//           </View>
          
//         ))}
//       </ScrollView>
//       {/* ... Rest of your component code ... */}
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   header:{
//     flex:1
//   },
//   text: {
//     fontSize: 15,
//   },
//   footer: {
//     position: "fixed",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     padding: 5,
//     alignItems: "center",
//   },
//   iconsContainer1: {
//     flexDirection: "row",
//   },
//   icon4: {
//     marginHorizontal: 20,
//   },
//   text9: {
//     alignItems: "center",
//   },
//   text10: {
//     fontSize: 10,
//   },
// });

// export default Notification;
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Appearance } from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons/faDownload";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Notification = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const colorScheme = Appearance.getColorScheme();

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

  const commonStyles = {
    color: colorScheme === 'dark' ? '#fff' : '#000',
  };

  return (
    <View style={[styles.container, commonStyles]}>
      <View style={styles.header}>
        <View style={styles.headerBackground}>
          <View style={styles.headerContent}>
            <Text style={styles.headerText}>Notification Inbox </Text>
            <TouchableOpacity onPress={handleIconPressNotification}>
              <FontAwesome name="envelope" size={20} color="black" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView
        Vertical={true}
        showsVerticalScrollIndicator={false}
        style={styles.notificationList}
      >
        {notifications.map((notification, index) => (
          <TouchableOpacity
            key={index}
            style={styles.notificationItem}
          >
            {/* <MaterialCommunityIcons
              name="code-braces-box"
              size={40}
              color="black"
              style={styles.icon}
            /> */}

              <FontAwesome name="bell" 
              size={30} 
              color="#FFA700" 
              style={styles.icon} />


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
  header: {
    height: 50,
  },
  headerBackground: {
    backgroundColor: "#F2F3F4",
    marginVertical: 10,
    marginHorizontal: 15,
    // flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius:10,
    marginTop:10
    
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height:20,
    marginBottom:20,
    verticalAlign:"center",
    gap:10,
   
  },
  headerText: {
    // fontSize: 18,
    fontWeight: "bold",
    // lineHeight:30
    textAlign:"center",
    display:"flex",
    
  },
  notificationList: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop:40
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
