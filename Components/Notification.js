import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Linking,
} from "react-native";
import { Calendar } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Ionicons } from "@expo/vector-icons";
import { Icon } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          
    
        };
      }
    //for home
  handleIconPressHome = () => {
    this.props.navigation.navigate('Home'); // Navigate to the home screen
  };
  //for Booking 
  handleIconPressBooking = () => {
    this.props.navigation.navigate('Washing'); // Navigate to the Washing screen
  };
  //inbox page
  handleIconPressInbox = () => {
    this.props.navigation.navigate('Confirmation'); // Navigate to the Confirmation page screen
  };
  //for  setting
  openSettings = async () => {
    try {
      await Linking.openSettings();
    } catch (error) {
      console.error("Error opening settings:", error);
    }
  };

    render() {
        const { navigation } = this.props;

        return (
            <>
            <View style={styles.container}>
             <View
                    style={{
                        height: 50,
                        width: 360,
                        backgroundColor: "#F2F3F4",
                        marginVertical: 10,
                        marginHorizontal: 15
                    }}
                > 
                <View style={{flexDirection:'row',justifyContent:'space-between',margin:10}}>
                <Text style={styles.text}>Notification Inbox</Text>
                <AntDesign name="download" size={24} color="black" />
                </View>
                </View>
           

                <View
                    style={{
                        height: 70,
                        width: 360,
                        backgroundColor: "#F2F3F4",
                        marginVertical: 10,
                        marginHorizontal: 15
                    }}
                >
                    <View style={{flexDirection:'row',margin:15}}>
                    <MaterialCommunityIcons name="code-braces-box" size={40} color="black" />
                    <View>
                    <Text style={{margin:2}}>    Lorem Ipsum</Text>
                    <Text>    15/01/2017</Text>
                    </View>
                    </View>

                </View>

                <View
                    style={{
                        height: 70,
                        width: 360,
                        backgroundColor: "#F2F3F4",
                        marginVertical: 10,
                        marginHorizontal: 15
                    }}
                >
                     <View style={{flexDirection:'row',margin:15}}>
                    <MaterialCommunityIcons name="code-braces-box" size={40} color="black" />
                    <View>
                    <Text style={{margin:2}}>    Lorem Ipsum</Text>
                    <Text>    15/01/2017</Text>
                    </View>
                    </View>

                </View>
                <View
                    style={{
                        height: 70,
                        width: 360,
                        backgroundColor: "#F2F3F4",
                        marginVertical: 10,
                        marginHorizontal: 15
                    }}
                >
                   <View style={{flexDirection:'row',margin:15}}>
                    <MaterialCommunityIcons name="code-braces-box" size={40} color="black" />
                    <View>
                    <Text style={{margin:2}}>    Lorem Ipsum</Text>
                    <Text>    15/01/2017</Text>
                    </View>
                    </View>

                </View>
                <View
                    style={{
                        height: 70,
                        width: 360,
                        backgroundColor: "#F2F3F4",
                        marginVertical: 10,
                        marginHorizontal: 15
                    }}
                ><View style={{flexDirection:'row',margin:15}}>
                    <MaterialCommunityIcons name="code-braces-box" size={40} color="black" />
                    <View>
                    <Text style={{margin:2}}>    Lorem Ipsum</Text>
                    <Text>    15/01/2017</Text>
                    </View>
                    </View>
                </View>
                
          <View style={styles.iconsContainer1}>
            <View style={styles.text9}>
              <TouchableOpacity onPress={this.handleIconPressHome}>
                <Entypo name="home" size={30} style={styles.icon4} />
              </TouchableOpacity>
              <Text style={styles.text10}>Home</Text>
            </View>

            <View style={styles.text9}>
              <TouchableOpacity onPress={this.handleIconPressBooking}>
                <Entypo name="calendar" size={30} style={styles.icon4} />
              </TouchableOpacity>
              <Text style={styles.text10}>Booking</Text>
            </View>

            <View style={styles.text9}>
              <TouchableOpacity onPress={this.handleIconPressInbox}>
                <MaterialIcons
                  name="forward-to-inbox"
                  size={30}
                  style={styles.icon4}
                />
              </TouchableOpacity>
              <Text style={styles.text10}>Inbox</Text>
            </View>

            <View style={styles.text9}>
              <TouchableOpacity onPress={this.openSettings}>
                <Ionicons
                  name="settings-sharp"
                  size={30}
                  style={styles.icon4}
                />
              </TouchableOpacity>

              <Text style={styles.text10}>Setting</Text>
            </View>
          </View>
          </View>
            </>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        // flex: 1,
        position: 'relative',
    },
    text:{
        fontSize:15,  
    },
    iconsContainer1: {
        position:'absolute',
        flexDirection: "row",
        top:650,
        left:50
        
      },
      icon4: {
        marginHorizontal: 20,
      },
      text9: {
        justifyContent: "space-between",
        alignItems: "center",
      },
      text10: {
        fontSize: 10,
      },
})
export default Notification;