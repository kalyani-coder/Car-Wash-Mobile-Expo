import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  TextInput,
  ScrollView,

} from "react-native";
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";


const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

// Define a function to format the time as hh:mm AM/PM
const formatTime = (time) => {
  const hours = time.getHours() % 12 || 12; // Get hours in 12-hour format
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const ampm = time.getHours() >= 12 ? "PM" : "AM";
  return `${hours}:${minutes} ${ampm}`;
};


class Confirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      time: '',
      pickupAddress: '',
      selectedOption: null,
      clientvehicleno: '',
      clientcarmodelno: '',
      vehicleNumberError: '',
      modelNumberError: '',
      totalPrice1:'',
      formattedDate:'',
      formattedTime:''
    };
    this.options = [
      { label: 'Pick Up by Agent', value: 'agentPickup', amount: 300 },
      { label: 'Self Drive', value: 'selfDrive', amount: 0 },
    ];
  }



  //for dropdown
  handleOptionChange = (selectedOption) => {
    this.setState({ selectedOption });
  };

  handleIconPressNotification=()=>{
    this.props.navigation.navigate('Notification'); 
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
  validateFields = () => {
    const { clientvehicleno, clientcarmodelno } = this.state;
    let isValid = true;
  
    // Validate Vehicle Number
    if (clientvehicleno.trim() === '') {
      this.setState({ vehicleNumberError: 'Vehicle Number is required' });
      isValid = false;
    } else {
      this.setState({ vehicleNumberError: '' });
    }
  
    // Validate Model Number
    if (clientcarmodelno.trim() === '') {
      this.setState({ modelNumberError: 'Model Number is required' });
      isValid = false;
    } else {
      this.setState({ modelNumberError: '' });
    }
  
    return isValid;
  };
  handleSubmit = () => {
    if (this.validateFields()) {
    const { pickupAddress, date, time, servicesName,status,price} = this.props.route.params;
    const{ clientcarmodelno,clientvehicleno} = this.state;
    // const totalPrice=totalPrice1;
    const taxAmount = price * 0.10;
    const totalPrice = price + taxAmount ;
    const formattedDate = moment(date).format('DD-MM-YYYY');
    const formattedTime = moment(time).format('hh:mm A');
    fetch('https://car-wash-backend-api.onrender.com/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date: formattedDate, 
        time: formattedTime, 
        pickupAddress: pickupAddress, 
        servicesName,
        totalPrice:totalPrice,
        status: "",
        agentId:"",
        clientcarmodelno:clientcarmodelno,
        clientvehicleno:clientvehicleno,
      }),
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
    }

  };

  

  render() {
    // const { date, showPicker } = this.state;
    // const { time, isDatePickerVisible } = this.state;
    const { route } = this.props;
    // const { serviceName } = route.params;
    const { pickupAddress, date, time } = this.props.route.params;
    const { servicesName, price, amount } = this.props.route.params;
    const taxAmount = price * 0.10;
    const totalPrice= price + taxAmount ;
   
    const formattedDate = moment(date).format('DD-MM-YYYY');
const formattedTime = moment(time).format('hh:mm A');


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

                <Text>{servicesName}</Text>
                <Text>{price}</Text>

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
              {/* <Text>{this.state.date.toLocaleDateString()} | {this.formatTime(this.state.time) || "8:30"}</Text>
              {this.state.date && (
                <Text> {this.state.date.toLocaleDateString()}</Text>
              )}
              {this.state.time && (
                <Text>{(this.formatTime(this.state.time)) || "8:30"}</Text>
              )} */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 15 }}>
                <Text>{formattedDate}</Text>

                <Text>{formattedTime}</Text>
              </View>
              {/* <View style={{ flexDirection: 'row', margin: 10 }}>
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
              </View> */}
            </View>
            {/* <View
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
            </View> */}
            <Text>Pickup Address</Text>
            <View
              style={{
                height: 50,
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
              <Text style={{ margin: 10 }}>{pickupAddress}</Text>


            </View>
            <Text>Enter Vehicle Number</Text>
            <TextInput
              placeholder="Vehicle Number"
              onChangeText={(text) => this.setState({ clientvehicleno: text })}
              value={this.state.clientvehicleno}
              style={styles.input}
            />
            <Text style={styles.errorText}>{this.state.vehicleNumberError}</Text>


            <Text>Enter Model Number</Text>

            <TextInput
              placeholder="Model Number"
              onChangeText={(text) => this.setState({ clientcarmodelno: text })}
              value={this.state.clientcarmodelno}
              style={styles.input}
            />
            <Text style={styles.errorText}>{this.state.modelNumberError}</Text>
            {/* <Text>Voucher</Text>
            <View style={styles.voucher1}>
              <TextInput
                style={styles.text1}
                placeholder="Enter Voucher Code"
              ></TextInput>
              <TouchableOpacity style={styles.apply}>
                <Text style={{ textAlign: "center", margin: 10 }}>Apply</Text>
              </TouchableOpacity>
            </View> */}

            {/* <View style={styles.amount}>
              <Text style={styles.text2}>TOTAL</Text>
              <Text style={styles.text2}>{totalPrice}</Text>
            </View> */}


            <Text>Select an option:</Text>
            <DropDownPicker
              items={this.options.map((option) => ({ label: option.label, value: option.value }))}
              defaultValue={this.state.selectedOption}
              containerStyle={{ height: 50 }}
              controller={(instance) => (this.dropdown = instance)} // Add this line
              onChangeItem={(item) => this.setState({ selectedOption: item.value })}
              searchable={false}
              placeholder="Select an option"
              labelStyle={{ fontSize: 16 }}
            />
            {this.state.selectedOption && (
              <View>
                <Text>Selected Option: {this.state.selectedOption}</Text>
                <Text>Price: {this.options.find((opt) => opt.value === this.state.selectedOption)?.amount}</Text>
              </View>
            )}

            <View style={styles.amount}>
              <Text style={styles.text2}>TAXES</Text>
              <Text style={styles.text2}>{taxAmount}</Text>
            </View>
            <View style={styles.amount}>
              <Text style={styles.text2}>Service Price</Text>
              <Text style={styles.text2}>{price}</Text>
            </View>
            <View style={styles.amount}>
              <Text style={styles.text2}>TOTAL PAYABLE </Text>
              <Text style={styles.text2}>{totalPrice}</Text>
            </View>
          </View>

        </ScrollView>
        <View style={styles.container}>

          <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
            <Text style={styles.buttonText}>Confirm Booking</Text>
          </TouchableOpacity>
        </View>
        {/* <View>
        <TouchableOpacity style={styles.button} onPress={this.handleIconPressConfirm}>
            <Text style={styles.buttonText}>Confirm Booking</Text>
          </TouchableOpacity>
        </View> */}

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
              <TouchableOpacity onPress={this.handleIconPressNotification}>
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
  container: {
    marginHorizontal: 15,
    paddingTop:45,
    // backgroundColor:'#c4fdf7'
  },

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
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 2,
    padding: 5,
    marginBottom: 5,
    // marginHorizontal: 10
},
errorText: {
    color: 'red',
    // marginBottom: 5,
    // marginHorizontal: 20
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
