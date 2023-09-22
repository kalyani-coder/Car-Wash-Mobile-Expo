import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
  TextInput,
  Modal,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';

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
      selectedDate: new Date(),
      showPicker: false,
      selectedTime: new Date(),
      isDatePickerVisible: false,
      isSearchBarOpen: false,
      searchText: "",
      data: [],
      servicesData: [],
      promotions: [],
      myFetchedData: [],
      homeOffers: [],
    };
  }

  componentDidMount() {
    this.callApiOffers();
    this.callApiPromotion();
    this.callApiService();
    this.fetchservices();
  }
  async callApiOffers() {
    const apiUrl = 'https://car-wash-backend-api.onrender.com/api/homeoffers';
    try {
      let resp = await fetch(apiUrl);
      if (!resp.ok) {
        throw new Error('Network response was not ok');
      }
      let respJson = await resp.json();
      this.setState({ homeOffers: respJson });
    } catch (error) {
      console.error('Error fetching promotion:', error);
    }
  }



  // Handle the promotion item click
  handleofferClick = (homeservicesName,
    description,
    totalPrice,
    image) => {
    // Navigate to a new page or display details
    this.props.navigation.navigate('Booknow', {homeservicesName,
      description,
      totalPrice,
      image});
  };

  async callApiPromotion() {
    const apiUrl = 'https://car-wash-backend-api.onrender.com/api/promotions';
    try {
      let resp = await fetch(apiUrl);
      if (!resp.ok) {
        throw new Error('Network response was not ok');
      }
      let respJson = await resp.json();
      this.setState({ promotions: respJson });
    } catch (error) {
      console.error('Error fetching promotion:', error);
    }
  }



  // Handle the promotion item click
  handlePromotionClick = (service, description, fixedAmount) => {
    // Navigate to a new page or display details
    this.props.navigation.navigate('Promotion', { service, description, fixedAmount });
  };

  async callApiService() {
    const apiUrl = 'https://car-wash-backend-api.onrender.com/api/topservices';
    try {
      let resp = await fetch(apiUrl);
      if (!resp.ok) {
        throw new Error('Network response was not ok');
      }
      let respJson = await resp.json();
      this.setState({ myFetchedData: respJson });
    } catch (error) {
      console.error('Error fetching promotion:', error);
    }
  }
  handleTopservicesClick = (title, description, price) => {
    // Navigate to a new page or display details
    this.props.navigation.navigate('Topservice', { title, description, price });
  };

  fetchservices = () => {
    fetch('https://car-wash-backend-api.onrender.com/api/services')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ servicesData: data });
        // console.warn(servicesData)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  toggleSearchBar = () => {
    this.setState((prevState) => ({
      isSearchBarOpen: !prevState.isSearchBarOpen,
    }));
  };

  //for date
  handleDateChange = (event, date) => {
    if (date !== undefined) {
      const formattedDate = moment(date).format('DD-MM-YYYY');
      this.setState({
        date: formattedDate, // Store the formatted date in state
        showPicker: false,
        searchText: "",
        isSearching: false,
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
  handleIconPressService = (serviceName, serviceDescription, servicePrice) => {
    this.props.navigation.navigate('Washing', { serviceName, serviceDescription, servicePrice }); // Navigate to the Washing screen
  };
  //for Booking
  handleIconPressBooking = () => {
    this.props.navigation.navigate('Appointment'); // Navigate to the Appointment screen
  };

  //inbox page
  handleIconPressInbox = () => {
    this.props.navigation.navigate('Washing'); // Navigate to the Confirmation page screen
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
    const { servicesData } = this.state;

    const { data } = this.state;

    if (servicesData.length === 0) {
      return <Text>Loading...</Text>;
    }



    return (
      <>
        <View style={styles.header}>

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
            style={{ flex: 1 }}
          >
            {/* <ScrollView
              horizontal={true}
              style={styles.promotion2}
              showsHorizontalScrollIndicator={false}
            >

            <View style={styles.Section}>

              <View style={{ height: 110, width: 175, backgroundColor: "#F2F3F4" }}>
                <Text style={styles.text1}>Rainy Wash Offer</Text>
                <Text style={{ color: "blue", marginHorizontal: 20 }}>50% off</Text>
                <TouchableOpacity style={styles.button} >
                  <Text style={styles.buttonText}>Book Now</Text>
                </TouchableOpacity>
              </View>

              <Image source={require("./Images/Car-Bike-Dents.png")} style={styles.img}
                resizeMode="cover"
              />

            </View>
            </ScrollView> */}

            <ScrollView
              horizontal={true}
              style={styles.offer}
              showsHorizontalScrollIndicator={false}
            >
              {this.state.homeOffers.map((offer) => (
                <View key={offer._id} style={styles.Section}>
                  <View style={{ height: 130, width: 195, backgroundColor: "#F2F3F4",borderBottomLeftRadius:10,
    borderTopLeftRadius:10, marginTop:10}}>
                    <Text style={styles.text1}>{offer.offerName}</Text>
                    <Text style={{ color: "blue", marginHorizontal: 20 }}>{offer.offer}</Text>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() =>
                        this.handleofferClick(
                          offer.homeservicesName,
                          offer.description,
                          offer.totalPrice,
                          offer.image
                        )
                      }
                    >
                      <Text style={styles.buttonText}>Book Now</Text>
                    </TouchableOpacity>
                    <View style={{flexDirection:'row' ,justifyContent:'space-evenly'}}>
                    <Text >{offer.startDate}</Text>
                    <Text >{offer.endDate}</Text>
                    </View>
                  </View>

                  <Image
                    source={{ uri: offer.image }}
                    style={styles.img}
                    resizeMode="cover"
                  />
                </View>
              ))}
            </ScrollView>



            <Text style={styles.text3}>Services</Text>

            <ScrollView
              horizontal={true}
              style={styles.topservice2}
              showsHorizontalScrollIndicator={false}
            >
              <View style={styles.icon3}>
                {servicesData.map((service) => (

                  <TouchableOpacity
                    key={service._id}
                    onPress={() => this.handleIconPressService(service.serviceName, service.serviceDescription, service.servicePrice)}
                    style={styles.card}
                  >
                    <Text style={styles.serviceName}>{service.serviceName}</Text>
                    <Text style={styles.servicePrice}>{service.servicePrice}</Text>

                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            {/*  */}

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
            {/* <View style={styles.promotion1}>
            <Text style={styles.text5}>Promotions</Text>

            <TouchableOpacity style={styles.text6}>
              <Text>View all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal={true}
            style={styles.promotion2}
            showsHorizontalScrollIndicator={false}
          >
         
          <TouchableOpacity onPress={this.handleIconPressInbox}>
              <Image source={require("./Images/Car-Bike-Dents.png")} style={styles.item} />
              </TouchableOpacity>
             
              <TouchableOpacity onPress={this.handleIconPressInbox}>
              <Image source={require("./Images/Car-Bike.png")} style={styles.item} />
              </TouchableOpacity>
                   
              <TouchableOpacity onPress={this.handleIconPressInbox}>
              <Image source={require("./Images/Car-Bikes-Wraps.png")} style={styles.item} />
              </TouchableOpacity>
           
              <TouchableOpacity onPress={this.handleIconPressInbox}>
              <Image source={require("./Images/Car-Modification.png")} style={styles.item} />
              </TouchableOpacity>
             
             <View>
            {this.state.promotions.map((promotion) => (
              <TouchableOpacity
                key={promotion._id}
                onPress={() => this.handlePromotionClick(promotion)}
              >
               
                <Text>{promotion.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
          </ScrollView> */}
            <View style={styles.promotion1}>
              <Text style={styles.text5}>Promotions</Text>
              {/* <TouchableOpacity style={styles.text6}>
                <Text>View all</Text>
              </TouchableOpacity> */}
            </View>
            <ScrollView
              horizontal={true}
              style={styles.promotion2}
              showsHorizontalScrollIndicator={false}
            >
              {this.state.promotions.map((promotion) => (
                <View style={styles.promotionItem} key={promotion._id}>
                  <TouchableOpacity onPress={() => this.handlePromotionClick(promotion.service, promotion.description, promotion.fixedAmount)}>
                    {/* <Image source={require("./Images/Car-Bikes-Wraps.png")} style={styles.item} /> */}
                    <Image source={{ uri: 'https://global-uploads.webflow.com/6275222db3d827ed1bb5c030/628d5275e8398c96485950a6_pexels-maria-geller-2127022.jpg' }} style={styles.item} />


                    <Text style={{marginTop:5}}>{promotion.title}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>


            <View style={styles.topservice1}>
              <Text style={styles.text7}>Top Services</Text>

              {/* <TouchableOpacity style={styles.text8}>
                <Text>View all</Text>
              </TouchableOpacity> */}
            </View>

            <ScrollView horizontal={true} style={styles.topservice2} showsHorizontalScrollIndicator={false}>
              {this.state.myFetchedData.map((topservice) => (
                <View style={styles.topservicesItem} key={topservice._id}>
                  <TouchableOpacity onPress={() => this.handleTopservicesClick(topservice.title, topservice.description, topservice.price)}>
                    {/* <Image source={require("./Images/car-Bike-detailing.png")} style={styles.item} /> */}
                    <Image source={{ uri: 'https://img.freepik.com/premium-photo/man-red-porsche-cayenne-car-wash_900775-46452.jpg' }} style={styles.item} />
                    <Text style={{marginTop:5}}>{topservice.title}</Text>

                  </TouchableOpacity>

                </View>
              ))}

            </ScrollView>
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
                  <Ionicons name="settings-sharp" size={30} style={styles.icon4} />
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
    backgroundColor: '#a7a7a7'
  },
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
    paddingTop: 15,
    // backgroundColor:'#c4fdf7'
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
    borderRadius:10,
    backgroundColor:'#f8db03'
  },
  buttonText: {
    fontSize: 15,
    textAlign: "center",
    marginVertical: 5,
  },
  img: {
    height: 130,
    width: 175,
    borderBottomRightRadius:10,
    borderTopRightRadius:10,
    marginTop:10
  },
  text3: {
    marginHorizontal: 20,
    fontWeight: "bold",
    fontSize: 18,
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
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    margin: 10,
  },
  serviceName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  servicePrice: {
    color: 'green',
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
  offer:{
    marginHorizontal: 5,
  },
  promotion2: {
    marginHorizontal: 20,
  },
  item: {
    flexDirection: 'row',
    height: 120,
    width: 180,
    marginRight: 20,
    borderWidth: 2,
    borderRadius: 10, // Add rounded corners
    overflow: 'hidden', // Ensure the image stays within the border
    backgroundColor: 'white', // Add a background color
    elevation: 5, // Add a shadow (Android)
    shadowColor: 'black', // Add a shadow (iOS)
    shadowOpacity: 0.5, // Add a shadow (iOS)
    shadowOffset: { width: 0, height: 2 }, // Add a shadow (iOS)
    padding: 5, // Add some padding inside the container
    alignItems: 'center', // Center image horizontally
    justifyContent: 'center',

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
    height: 100,
    width: 150,
    marginRight: 20,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10, // Add rounded corners
    overflow: 'hidden', // Ensure the image stays within the border
    backgroundColor: 'white', // Add a background color
    elevation: 5, // Add a shadow (Android)
    shadowColor: 'black', // Add a shadow (iOS)
    shadowOpacity: 0.5, // Add a shadow (iOS)
    shadowOffset: { width: 0, height: 2 }, // Add a shadow (iOS)
    padding: 5, // Add some padding inside the container
    alignItems: 'center', // Center image horizontally
    justifyContent: 'center',
  },

  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 5,
    alignItems: 'center',
    // borderWidth:2,
    // borderColor:'black'

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
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  serviceList: {
    flexDirection: 'column',
  },
  serviceItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  servicePrice: {
    color: 'green',
  },
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
