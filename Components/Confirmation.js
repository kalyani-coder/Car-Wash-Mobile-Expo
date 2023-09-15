import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  TextInput,
  ScrollView
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";



class Confirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      showPicker: false,
      isDatePickerVisible: false,
      time: new Date(),
      
      // servicesName:'',
      // date:'',
      // time:'',
      // totalPrice:'',
      // pickupAddress:'',
    };
  }
  //for time
  showDatePicker = () => {
    this.setState({ isDatePickerVisible: true });
  };

  hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false });
  };

  handleDateConfirm = date => {
    this.setState({
      time: date,
    });
    this.hideDatePicker();
  };

  formatTime = time => {
    if (!time) return '';
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true, }).toUpperCase();
  };

  // //for date
  handleDateChange = (event, date) => {
    if (date !== undefined) {
      this.setState({
        date,
        showPicker: false,
        searchText: "",
        isSearching: false,
      });
    }
  };
  //for confirm Booking 
  handleIconPressConfirm = () => {
    // const { serviceName,pickupAddress,totalPrice,date,time } = this.props.route.params;

    this.props.navigation.navigate('Confirm'); // Navigate to the Washing screen
  };
  //for home
  handleIconPressHome = () => {
    this.props.navigation.navigate('Home'); // Navigate to the home screen
  };
 //for services
 handleIconPressService = () => {
  this.props.navigation.navigate('Washing'); // Navigate to the Washing screen
};
//for Booking
handleIconPressBooking = () => {
  this.props.navigation.navigate('Appointment'); // Navigate to the Appointment screen
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
      console.error('Error opening settings:', error);
    }
  };
  handleSubmit =  () => {
     
        fetch('https://car-wash-backend-api.onrender.com/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
        date,
        time,
        totalPrice,
        pickupAddress,),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          this.setState({ response: data });
          // if (data.success) {
          //   // Navigate to the success screen upon successful submission
          //   this.props.navigation.navigate('Home');

          //   console.log('After navigation');
          // } else {
          //   Alert.alert('API Error', 'Failed to submit data.');
          // }
         
          this.props.navigation.navigate('Confirm');
        })
        .catch((error) => {
          console.error('Error:', error);
        });

        
      };
      

  render() {
    const { date, showPicker } = this.state;
    const { time, isDatePickerVisible } = this.state;
    const { route } = this.props;
        // const { serviceName } = route.params;
        // const { pickupAddress,totalPrice,date,time } = this.props.route.params;
    return (
      <>
        <ScrollView
          Vertical={true}
          showsVerticalScrollIndicator={false}
        >

          <View style={styles.container}>
            {/* <Text style={styles.text}>Confirmation</Text> */}
            <View
              style={{
                height: 65,
                width: 370,
                backgroundColor: "#F2F3F4",
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  margin: 10,
                  justifyContent: 'space-between'
                }}
              >
                <MaterialCommunityIcons name="car-wash" size={35} color="black" />

                <Text>Service</Text>
                {/* <Text>{totalPrice}</Text> */}
              </View>
            </View>
            <View
              style={{
                height: 65,
                width: 370,
                backgroundColor: "#F2F3F4",
                marginVertical: 10,
              }}
            >
              {/* <Text>{date} |  {time}</Text> */}
              <View style={{ flexDirection: 'row', margin: 10 }}>
                <TouchableOpacity
                  onPress={() => this.setState({ showPicker: true })}
                >
                  <AntDesign name="calendar" size={35} color="black" />
                </TouchableOpacity>
                <View style={{ marginLeft: 15 }}>
                  <Text> Date & Time</Text>

                  <View style={styles.date1}>

                    <TouchableOpacity onPress={this.showDatePicker}>
                      <EvilIcons name="clock" size={22} color="black" />
                    </TouchableOpacity>

                    {this.state.time && (
                      <Text>{(this.formatTime(this.state.time)) || "8:30"}</Text>
                    )}

                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="time"
                      onConfirm={this.handleDateConfirm}
                      onCancel={this.hideDatePicker}
                    />
                    <Text>  |  </Text>
                    {showPicker && (
                      <DateTimePicker
                        value={this.state.date}
                        mode="date"
                        display="default"
                        onChange={this.handleDateChange}
                      />
                    )}
                    {this.state.date && (
                      <Text> {this.state.date.toLocaleDateString()}</Text>
                    )}
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                height: 65,
                width: 370,
                backgroundColor: "#F2F3F4",

                marginVertical: 10,
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <AntDesign name="exclamationcircle" size={30} color="black" margin={10} />
                <View style={{ marginLeft: 10, marginTop: 5 }}>
                  <Text>Note</Text>
                  <Text>Ipsum Velt ut null null temp</Text>
                </View>
              </View>
            </View>
            <Text>Select Pickup</Text>
            <View
              style={{
                height: 70,
                width: 370,
                backgroundColor: "#F2F3F4",
                marginVertical: 10,
              }}
            >
              {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                <View>
                  <Text>Pickup pickupAddress</Text>
                  <Text>PIN Text pickupAddress</Text>
                </View>
                <MaterialCommunityIcons name="greater-than" size={24} color="black" paddingTop={10} />
              </View> */}
              {/* <Text>{pickupAddress}</Text> */}


            </View>
            <Text>Voucher</Text>
            <View style={styles.voucher1}>
              <TextInput
                style={styles.text1}
                placeholder="Enter Voucher Code"
              ></TextInput>
              <TouchableOpacity style={styles.apply}>
                <Text style={{ textAlign: "center", margin: 10 }}>Apply</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.amount}>
              <Text style={styles.text2}>TOTAL</Text>
              {/* <Text style={styles.text2}>{totalPrice}</Text> */}
            </View>
            <View style={styles.amount}>
              <Text style={styles.text2}>PICK UP</Text>
              <Text style={styles.text2}>300</Text>
            </View>
            <View style={styles.amount}>
              <Text style={styles.text2}>TAXES</Text>
              <Text style={styles.text2}>150</Text>
            </View>
            <View style={styles.amount}>
              <Text style={styles.text2}>TOTAL PAYABLE AMOUNT</Text>
              <Text style={styles.text2}>1950</Text>
            </View>
            <View style={styles.amount}>
              <Text style={styles.text2}>TOTAL PAYABLE </Text>
              <Text style={styles.text2}>1950</Text>
            </View>
          </View>

        </ScrollView>
        <View style={styles.container}>

          <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
            <Text style={styles.buttonText}>Confirm Booking</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>

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
    );
  }
}
const styles = StyleSheet.create({
 
  text: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  text1: {
    height: 45,
    width: 250,
    borderWidth: 2,
    borderColor: "grey",
    paddingLeft: 15,
  },
  date1: {
    flexDirection: 'row',

  },
  voucher1: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  apply: {
    height: 45,
    width: 100,
    borderWidth: 2,
    borderColor: "grey",
    backgroundColor: "yellow",
  },

  amount: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  text2: {
    fontWeight: "bold",
    fontSize: 13,
  },
  container: {
    marginHorizontal: 15,
  },
  button: {
    backgroundColor: "#5B7586",
    height: 50,
    width: 370,
    paddingTop: 10,
    marginTop: 15,
    borderRadius: 2,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    margin: 4,
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 5,
    alignItems: 'center',
  },

  iconsContainer1: {
    flexDirection: 'row',
  },
  icon4: {
    marginHorizontal: 20,
  },
  text9: {
    alignItems: 'center',
  },
  text10: {
    fontSize: 10,
  }
});
export default Confirmation;
