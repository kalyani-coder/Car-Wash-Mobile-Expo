import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
  FlatList,
  TextInput,
  Modal,
  map
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { faBell } from '@fortawesome/free-regular-svg-icons/faBell';
import { faUser } from '@fortawesome/free-regular-svg-icons/faUser';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons/faCircleXmark';
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // currentTime: new Date(),
      selectedDate: new Date(),
      showPicker: false,
      selectedTime: new Date(),
      isDatePickerVisible: false,
      isSearchBarOpen: false,
      searchText: '',

      // API
      data: [],
      myFetchedData: [],
      services: [],

    };
  }

  //API
  componentDidMount() {
    this.callApiPromotion();
    this.callApiService();

    this.fetchservices();
  }


  // for promotion
  async callApiPromotion() {
    const apiUrl = 'https://car-wash-backend-api.onrender.com/api/promotions';
    try {
      let resp = await fetch(apiUrl);
      if (!resp.ok) {
        throw new Error('Network response was not ok');
      }
      let respJson = await resp.json();
      this.setState({ data: respJson });
    } catch (error) {
      console.error('Error fetching promotion:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };
  async callApiService() {
    const apiUrl = 'https://car-wash-backend-api.onrender.com/api/topservices';
    try {
      let resp = await fetch(apiUrl);
      if (!resp.ok) {
        throw new Error('Network response was not ok');
      }
      let respJson = await resp.json();
      this.setState({ myFetchedData: respJson }); // Update the state with the new variable name
    } catch (error) {
      console.error('Error fetching promotion:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };


  //for servivces
  fetchservices = () => {
    fetch('https://car-wash-backend-api.onrender.com/api/services') // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        this.setState({ services: data });
      })
      .catch((error) => {
        console.error(error);
      });
  };


  // search bar 
  toggleSearchBar = () => {
    this.setState((prevState) => ({
      isSearchBarOpen: !prevState.isSearchBarOpen,
    }));
  };


  //for date
  handleDateChange = (event, selectedDate) => {
    if (selectedDate !== undefined) {
      this.setState({
        selectedDate,
        showPicker: false,

      });
    }
  };
  //for time
  showDatePicker = () => {
    this.setState({ isDatePickerVisible: true });
  };

  hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false });
  };

  handleDateConfirm = date => {
    this.setState({
      selectedTime: date,
    });
    this.hideDatePicker();
  };

  formatTime = time => {
    if (!time) return '';
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true, }).toUpperCase();
  };
  //for notification 
  handleIconPressNotification = () => {
    this.props.navigation.navigate('Notification'); // Navigate to the Notification screen
  };
  //for Profile 
  handleIconPressProfile = () => {
    this.props.navigation.navigate('Profile'); // Navigate to the Profile screen
  };

  //for home
  handleIconPressHome = () => {
    this.props.navigation.navigate('Home'); // Navigate to the home screen
  };
  //for services
  handleIconPressService = (serviceName,serviceDescription) => {
    this.props.navigation.navigate('Washing' ,{serviceName,serviceDescription}); // Navigate to the Washing screen
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
      console.error("Error opening settings:", error);
    }
  };


  render() {
    //for time
    const formattedTime = this.formatTime(this.state.currentTime);
    const { selectedDate, showPicker } = this.state;
    const { selectedTime, isDatePickerVisible } = this.state;
    const { services } = this.state;
    const { isSearchBarOpen, searchText } = this.state;
    const { myFetchedData } = this.state;

    const { data } = this.state;

    if (services.length === 0) {
      return <Text>Loading...</Text>;
    }

    const firstItem = services[0];
    const secondItem = services[1];
    const thirdItem = services[2];
    const fourthItem = services[3];


    return (
      <>


        <View style={styles.container1}>

          <Text style={styles.text}>Hello</Text>
          <View style={styles.iconsContainer}>


            <TouchableOpacity onPress={this.toggleSearchBar}>
              <FontAwesomeIcon icon={faMagnifyingGlass} size={25}
                color="black"
                style={styles.icon} />
            </TouchableOpacity>
            <Modal
              transparent={true}
              animationType="slide"
              visible={isSearchBarOpen}
              onRequestClose={this.toggleSearchBar}
            >
              <View style={styles.modalContainer}>
                <View style={styles.searchBarContainer}>
                  <TextInput
                    placeholder="Search..."
                    value={searchText}
                    onChangeText={(text) => this.setState({ searchText: text })}
                  />
                  <TouchableOpacity onPress={this.toggleSearchBar} style={styles.closeIcon}>
                    {/* <Icon name="close" size={30} /> */}
                    <FontAwesomeIcon icon={faCircleXmark} size={25} />
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>


            <TouchableOpacity onPress={this.handleIconPressNotification}>
              <FontAwesomeIcon icon={faBell} size={25}
                color="black"
                style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={this.handleIconPressProfile}>
              <FontAwesomeIcon icon={faUser} size={25}
                color="black"
                style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView Vertical={true}
          showsVerticalScrollIndicator={false}
        >

          <View style={styles.Section}>

            <View style={{ height: 110, width: 175, backgroundColor: "#F2F3F4" }}>
              <Text style={styles.text1}>Rainy Wash Offer</Text>
              <Text style={{ color: "blue", marginHorizontal: 20 }}>50% off</Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Book Now</Text>
              </TouchableOpacity>
            </View>

            <Image
              style={styles.img}
              source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png',
              }}
            />

          </View>

          <Text style={styles.text3}>Services</Text>

          <View style={styles.icon1}>
            <View
              style={{
                height: 50,
                width: 160,
                backgroundColor: "white",
                borderColor: "black",
                borderWidth: 1,
              }}
            >
              <View style={styles.icon3}>
              {/* {services.map((item) => (
          <TouchableOpacity
            key={item._id} // Assuming each item has a unique _id field
            onPress={() => this.handleIconPressService(item.serviceName)}
            style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
          >
            <Text >{item.servicePrice}</Text>
          </TouchableOpacity>
        ))} */}
               
                <TouchableOpacity 
                onPress={() => this.handleIconPressService(firstItem.serviceName,firstItem.serviceDescription)}
                key={firstItem._id} >
                  
                    <View size={40}
                      color="black"
                      backgroundColor="#F2F3F4"
                      margin={4}>
                      <Text style={styles.wash}>{firstItem.servicePrice}</Text>
                    </View>
                
                </TouchableOpacity>
               

                {/* <Text style={styles.wash}>Wash</Text> */}
                <View>
                 
                    <View>
                      <Text style={styles.wash}>{firstItem.serviceName}</Text>
                    </View>
                 
                </View>
                

              </View>
            </View>

            <View
              style={{
                height: 50,
                width: 160,
                backgroundColor: "white",
                borderColor: "black",
                borderWidth: 1,
              }}
            >

              <View style={styles.icon3}>
             
                <TouchableOpacity 
                 onPress={() => this.handleIconPressService(secondItem.serviceName,secondItem.serviceDescription)}
                 key={secondItem._id} 
                >
                    <View size={40}
                      color="black"
                      backgroundColor="#F2F3F4"
                      margin={4}>
                      <Text style={styles.wash}>{secondItem.servicePrice}</Text>
                    </View>
                 
                </TouchableOpacity>
                
                {/* <Text style={styles.wash}>Detailing</Text> */}
                <View>
                 
                    <View>
                      <Text style={styles.wash}>{secondItem.serviceName}</Text>
                    </View>
                 
                </View>
              </View>
            </View>
          </View>
          <View style={styles.icon2}>
            <View
              style={{
                height: 50,
                width: 160,
                backgroundColor: "white",
                borderColor: "black",
                borderWidth: 1,
              }}
            >
              <View style={styles.icon3}>
                <TouchableOpacity onPress={() => this.handleIconPressService(thirdItem.serviceName,thirdItem.serviceDescription)}
                 key={thirdItem._id}>
                  {/* <MaterialIcons
                    name="cleaning-services"
                    size={40}
                    color="black"
                    backgroundColor="#F2F3F4"
                    margin={4}
                  /> */}
                
                    <View size={40}
                      color="black"
                      backgroundColor="#F2F3F4"
                      margin={4}>
                      <Text style={styles.wash}>{thirdItem.servicePrice}</Text>
                    </View>
                 
                </TouchableOpacity>
                {/* <Text style={styles.wash}>Cleaning</Text>
                 */}
                <View>
                 
                    <View>
                      <Text style={styles.wash}>{thirdItem.serviceName}</Text>
                    </View>
                 
                </View>
              </View>
            </View>
            <View
              style={{
                height: 50,
                width: 160,
                backgroundColor: "white",
                borderColor: "black",
                borderWidth: 1,
              }}
            >
              <View style={styles.icon3}>
                <TouchableOpacity onPress={() => this.handleIconPressService(thirdItem.serviceName,thirdItem.serviceDescription)}
                 key={thirdItem._id}>
                  {/* <Ionicons
                    name="car-sharp"
                    size={40}
                    color="black"
                    backgroundColor="#F2F3F4"
                    margin={4}
                  /> */}
                  
                    <View size={40}
                      color="black"
                      backgroundColor="#F2F3F4"
                      margin={4}>
                      <Text style={styles.wash}>{thirdItem.servicePrice}</Text>
                    </View>
                 
                </TouchableOpacity>
                {/* <Text style={styles.wash}>Polish</Text> */}
                <View>
                  
                    <View>
                      <Text style={styles.wash}>{thirdItem.serviceName}</Text>
                    </View>
                
                </View>
              </View>
            </View>
          </View>
          <Text style={styles.text4}>Upcoming Booking</Text>
          <View
            style={{
              height: 100,
              width: 350,
              backgroundColor: "#F2F3F4",
              marginHorizontal: 20,
            }}
          >
            <View style={styles.booking}>
              <Ionicons name="car-sharp" size={40} color="black" margin={4} />
              <Text style={styles.carwash}>Car Wash:car 1</Text>
              <TouchableOpacity style={styles.btn3}>
                <Text style={styles.btntext}>Pending</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.clocktime}>
              <View style={styles.clock}>


                <TouchableOpacity onPress={this.showDatePicker}>
                  <EvilIcons name="clock" size={22} color="black" />
                </TouchableOpacity>

                {selectedTime && (
                  <Text>{(this.formatTime(selectedTime)) || "8:30"}</Text>
                )}
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="time"
                  onConfirm={this.handleDateConfirm}
                  onCancel={this.hideDatePicker}
                />

              </View>

              <View style={styles.time}>
                <TouchableOpacity
                  onPress={() => this.setState({ showPicker: true })}
                >
                  <AntDesign name="calendar" size={24} color="black" />
                </TouchableOpacity>
                {showPicker && (
                  <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="default"
                    onChange={this.handleDateChange}
                  />
                )}
                {selectedDate && (
                  <Text> {selectedDate.toLocaleDateString()}</Text>
                )}
              </View>
            </View>
          </View>
          <View style={styles.promotion1}>
            <Text style={styles.text5}>Promotions</Text>

            <TouchableOpacity style={styles.text6}>
              <Text>View all</Text>
            </TouchableOpacity>
          </View>
          {/* <ScrollView
            horizontal={true}
            style={styles.promotion2}
            showsHorizontalScrollIndicator={false}
          > */}
          {/* <TouchableOpacity onPress={this.handleIconPressInbox}>
              <Image source={require("./Images/car1.jpg")} style={styles.item} />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.handleIconPressInbox}>
              <Image source={require("./Images/car2.jpg")} style={styles.item} />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.handleIconPressInbox}>
              <Image source={require("./Images/car3.jpg")} style={styles.item} />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.handleIconPressInbox}>
              <Image source={require("./Images/car3.jpg")} style={styles.item} />
              </TouchableOpacity> */}
          <View>
            <TouchableOpacity onPress={this.handleIconPressInbox}>
              <FlatList
                horizontal={true}
                style={styles.promotion2}
                showsHorizontalScrollIndicator={false}
                data={this.state.data}
                renderItem={({ item }) => <Image
                  // key={index}
                  source={{ uri: item.image }}
                  style={styles.item}
                />}
              ></FlatList>


            </TouchableOpacity>
          </View>


          {/* </ScrollView> */}
          <View style={styles.topservice1}>
            <Text style={styles.text7}>Top Services</Text>

            <TouchableOpacity style={styles.text8}>
              <Text>View all</Text>
            </TouchableOpacity>
          </View>
          {/* <ScrollView
            horizontal={true}
            style={styles.topservice2}
            showsHorizontalScrollIndicator={false}
          > */}
          {/* <Image source={require("./Images/car1.jpg")} style={styles.item1} />
            <Image source={require("./Images/car2.jpg")} style={styles.item1} />
            <Image source={require("./Images/car3.jpg")} style={styles.item1} />
            <Image source={require("./Images/car1.jpg")} style={styles.item1} /> */}
          <View>
            <TouchableOpacity onPress={this.handleIconPressInbox}>
              <FlatList
                horizontal={true}
                style={styles.topservice2}
                showsHorizontalScrollIndicator={false}
                data={this.state.myFetchedData}
                renderItem={({ item }) => <Image
                  // key={index}
                  source={{ uri: item.image }}
                  style={styles.item}
                />}
              ></FlatList>


            </TouchableOpacity>
          </View>

          {/* </ScrollView> */}
        </ScrollView>


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
                <Ionicons name="settings-sharp" size={30} style={styles.icon4} />
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

  flex: {
    marginHorizontal: 20,
    marginVertical: 10,

  },
  text: {
    marginHorizontal: 20,
    fontWeight: "bold",
    fontSize: 20,
  },
  container1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    // paddingTop: 35,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginHorizontal: 15,
  },


  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for the modal
    // backgroundColor: 'transparent',
    // alignItems: 'center',
    padding: 10,

  },
  searchBarContainer: {
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 20, // Shadow on Android
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    margin: 8,


  },



  Section: {
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: "row",
  },
  text1: {
    fontSize: 15,
    marginHorizontal: 20,
    marginTop: 10,
  },
  button: {
    width: 100,
    height: 35,
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "white",
  },
  buttonText: {
    fontSize: 15,
    textAlign: "center",
    marginVertical: 5,
  },
  img: {
    height: 110,
    width: 175,

  },
  text3: {
    marginHorizontal: 20,
    fontWeight: "bold",
    fontSize: 15,
  },
  icon1: {
    flexDirection: "row",
    marginHorizontal: 20,
    justifyContent: "space-between",
    marginVertical: 10,
  },
  icon2: {
    flexDirection: "row",
    marginHorizontal: 20,
    justifyContent: "space-between",
  },
  icon3: {
    flexDirection: "row",
  },
  wash: {
    fontSize: 15,
    margin: 10,
  },
  text4: {
    marginHorizontal: 20,
    marginVertical: 10,
    fontWeight: "bold",
    fontSize: 15,
  },
  booking: {
    flexDirection: "row",
    margin: 3,
  },
  carwash: {
    marginTop: 15,
  },
  btn3: {
    backgroundColor: "white",
    marginLeft: 100,
    marginTop: 5,
    borderRadius: 20,
    width: 80,
    height: 30,
  },
  btntext: {
    textAlign: "center",
    margin: 4,
  },
  clocktime: {
    flexDirection: "row",
    margin: 15,
    justifyContent: "space-between",
  },
  clock: {
    flexDirection: "row",
  },
  time: {
    flexDirection: "row",
  },
  promotion1: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  text5: {
    fontWeight: "bold",
    fontSize: 15,
  },
  promotion2: {
    marginHorizontal: 20,
  },
  item: {
    flexDirection: 'row',
    height: 90,
    width: 160,
    marginRight: 20,

  },
  topservice1: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  text7: {
    fontWeight: "bold",
    fontSize: 15,
  },
  topservice2: {
    marginHorizontal: 20,
  },
  item1: {
    height: 70,
    width: 100,
    marginRight: 20,
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
export default Home;
// *******************************


// *******************************
// *******************************
// *******************************
// *******************************
// *******************************

// on the view there two touchbale opcatity one for first and second is for 2nd id show the code
// import React, { Component } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';

// class FirstPage extends Component {
//   handleFirstServiceClick = () => {
//     // Handle the click for the first ID (e.g., ID 1)
//     // You can navigate to the second page with ID 1 or perform any action you need.
//   }

//   handleSecondServiceClick = () => {
//     // Handle the click for the second ID (e.g., ID 2)
//     // You can navigate to the second page with ID 2 or perform any action you need.
//   }

//   render() {
//     return (
//       <View>
//         <TouchableOpacity
//           onPress={this.handleFirstServiceClick}
//           style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
//         >
//           <Text>Service 1</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={this.handleSecondServiceClick}
//           style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
//         >
//           <Text>Service 2</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }

// export default FirstPage;
