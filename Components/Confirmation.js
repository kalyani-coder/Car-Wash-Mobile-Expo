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
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Picker } from '@react-native-picker/picker';
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
      clientvehicleno: '',
      clientcarmodelno: '',
      vehicleNumberError: '',
      modelNumberError: '',
      totalPrice1: '',
      formattedDate: '',
      formattedTime: '',
      selectedOption: 'pickup',
    };

  }

  fetchClientData = async () => {
    try {
      const response = await fetch('https://car-wash-backend-api.onrender.com/api/clients');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const clientData = await response.json();
      this.setState({ clientData }); // Store client data in state
    } catch (error) {
      console.error('Error fetching client data:', error);
    }
  };

  componentDidMount() {
    this.fetchClientData();
  }


  handleIconPressNotification = () => {
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
      this.setState({ vehicleNumberError: '*Vehicle Number is required' });
      isValid = false;
    } else {
      this.setState({ vehicleNumberError: '' });
    }

    // Validate Model Number
    if (clientcarmodelno.trim() === '') {
      this.setState({ modelNumberError: '*Model Number is required' });
      isValid = false;
    } else {
      this.setState({ modelNumberError: '' });
    }

    return isValid;
  };
  handleSubmit = async () => {
    if (this.validateFields()) {
      // Determine the values for pickuptoagent and selfdrive based on the selected option
      const pickuptoagent = this.state.selectedOption === "pickup" ? "pickuptoagent" : "No";
      const selfdrive = this.state.selectedOption === "selfdrive" ? "selfdrive" : "No";

      const { pickupAddress, date, time, servicesName, status, price } = this.props.route.params;
      const { clientcarmodelno, clientvehicleno } = this.state;

      const taxAmount = price * 0.10;
      let selectedOptionValue = 0;

      if (this.state.selectedOption === 'pickup') {
        selectedOptionValue = 300;
      }
      const totalPrice = price + taxAmount + selectedOptionValue;
      const formattedDate = moment(date).format('DD-MM-YYYY');
      const formattedTime = moment(time).format('hh:mm A');

      try {
        // Retrieve the user ID from AsyncStorage
        const userId = await AsyncStorage.getItem('userId');

        // Retrieve the selected client from the fetched client data
        const selectedClient = this.state.clientData.find(client => client._id === userId);

        if (selectedClient) {
          // Make the booking API request with user ID, client ID, and client name
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
              totalPrice: totalPrice,
              status: "",
              agentId: "",
              clientcarmodelno: clientcarmodelno,
              clientvehicleno: clientvehicleno,
              pickuptoagent: pickuptoagent,
              selfdrive: selfdrive,
              userId: userId,
              clientId: selectedClient._id, // Include the client ID in the request
              clientName: selectedClient.clientName,
              clientContact: selectedClient.clientPhone,
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
              this.props.navigation.navigate('Confirm');
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        } else {
          console.error('Selected client not found in client data.');
        }
      } catch (error) {
        console.error('Error retrieving user ID from AsyncStorage:', error);
      }

    }

  };

  render() {

    let selectedOptionValue = 0; // Default value for "Self Drive"
    if (this.state.selectedOption === 'pickup') {
      selectedOptionValue = 300; // Set the value for "Pickup by Agent"
    }

    const { pickupAddress, date, time } = this.props.route.params;
    const { servicesName, price, amount } = this.props.route.params;
    const taxAmount = price * 0.10;
    const totalPrice = price + taxAmount + selectedOptionValue;

    const formattedDate = moment(date).format('DD-MM-YYYY');
    const formattedTime = moment(time).format('hh:mm A');


    return (
      <>
        <View style={styles.header}>
          <ScrollView
            Vertical={true}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
          >
            <View style={styles.container}>
              {/* <Text style={styles.text}>Confirmation</Text> */}
              <View
                style={{
                  height: 65,
                  width: 360,
                  backgroundColor: "white",
                  marginVertical: 10,
                  borderRadius: 8
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    padding: '4%',
                    justifyContent: 'space-evenly',

                  }}
                >
                  <MaterialCommunityIcons name="car-wash" size={35} color="black" />
                  <View>
                    <Text style={{fontWeight:'bold'}}>Service Name</Text>
                    <Text>{servicesName}</Text>
                  </View>
                  <View>
                    <Text style={{fontWeight:'bold'}}>Price</Text>
                    <Text>{price}</Text>
                  </View>

                </View>
              </View>
              <View
                style={{
                  height: 65,
                  width: 360,
                  backgroundColor: "white",
                  marginVertical: 10,
                  borderRadius: 8
                }}
              >

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 15 }}>
                  <View>
                    <Text style={{fontWeight:'bold'}}>Date</Text>
                    <Text>{formattedDate}</Text>
                  </View>

                  <View>
                    <Text style={{fontWeight:'bold'}}>Time</Text>
                    <Text>{formattedTime}</Text>
                  </View>

                </View>

              </View>


              <View
                style={{
                  height: 60,
                  width: 360,
                  backgroundColor: "white",
                  marginVertical: 10,
                  borderRadius: 8
                }}
              >
                <View style={{flexDirection:'row',padding:10}}>
                <Text style={{fontWeight:'bold'}}>Address: </Text>
                <Text>{pickupAddress}</Text>
                </View>


              </View>
              <Text style={{fontWeight:'bold'}}>Enter Vehicle Number<Text style={{ color: 'red' }}> *</Text></Text>
              <TextInput
                placeholder="Vehicle Number"
                placeholderTextColor="#000"
                onChangeText={(text) => this.setState({ clientvehicleno: text })}
                value={this.state.clientvehicleno}
                style={styles.input}
              />
              <Text style={styles.errorText}>{this.state.vehicleNumberError}</Text>


              <Text style={{fontWeight:'bold'}}>Enter Make/Model Number<Text style={{ color: 'red' }}> *</Text></Text>

              <TextInput
                placeholder="Ex. Suzuki/Swift"
                placeholderTextColor="#000"
                onChangeText={(text) => this.setState({ clientcarmodelno: text })}
                value={this.state.clientcarmodelno}
                style={styles.input}
              />
              <Text style={styles.errorText}>{this.state.modelNumberError}</Text>


              <View style={styles.pickerContainer}>
                <Text style={{fontWeight:'bold'}}>Select an option:</Text>
                <Picker
                  style={[styles.picker, { borderRadius: 8 }]}
                  selectedValue={this.state.selectedOption}
                  onValueChange={(itemValue) => {
                    this.setState({ selectedOption: itemValue }, () => {
                      // Calculate selectedOptionValue here and update the state
                      let selectedOptionValue = 0;
                      if (this.state.selectedOption === 'pickup') {
                        selectedOptionValue = 300;
                      }
                      this.setState({ selectedOptionValue });
                    });
                  }}
                >
                  <Picker.Item label="Pickup by Agent" value="pickup" />
                  <Picker.Item label="Self Drive" value="selfdrive" />
                </Picker>

              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginVertical: 5, }}>
                <Text style={{ fontWeight: 'bold' }}>
                  {this.state.selectedOption === 'pickup' ? 'Pickup By Agent' : 'Self Drive'}
                </Text>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <Text style={{ fontWeight: 'bold' }}>
                    {this.state.selectedOption === 'pickup' ? selectedOptionValue : '0'}
                  </Text>
                </View>
              </View>



              <View style={styles.amount}>
                <Text style={styles.text2}>TAXES</Text>
                <Text style={styles.text2}>{taxAmount}</Text>
              </View>
              <View style={styles.amount}>
                <Text style={styles.text2}>SERVICE PRICE</Text>
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
        </View>

      </>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: '#a7a7a7',
    width: '100%',
    height: '100%',
    padding: 15,
    // margin: '5em'

  },
  container: {
    // marginHorizontal: 15,
    paddingTop: 15,
    // backgroundColor:'#c4fdf7'
  },

  text: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  text1: {
    height: 45,
    // width: 250,/
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
    // width: 100,
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
    borderRadius: 8,
    padding: 5,
    marginBottom: 5,
    backgroundColor: 'white',
    width: 360,
    height: 60

  },
  errorText: {
    color: 'red',

  },
  pickerContainer: {
    
    marginTop: 5, 
    marginBottom: 10, 
    borderRadius:8
  },
  picker: {
    backgroundColor: 'white',
    fontWeight: 'bold',
    borderRadius:8
  },
  selectedOptionText: {
    //  paddingLeft:20,
    fontWeight: 'bold',
    // marginTop: 5,
  },

  button: {
    backgroundColor: "#5B7586",
    height: 50,
    // width: 360,
    paddingTop: 10,
    // marginTop: 15,
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    margin: 4,
  },
  footer: {
    position: 'Sticky',
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
