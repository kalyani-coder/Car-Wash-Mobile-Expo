import React, { useState, useEffect } from "react";
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

function Home(props) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isSearchBarOpen, setSearchBarOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [servicesData, setServicesData] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [myFetchedData, setMyFetchedData] = useState([]);
  const [homeOffers, setHomeOffers] = useState([]);

  useEffect(() => {
    callApiOffers();
    callApiPromotion();
    callApiService();
    fetchservices();
  }, []);

  async function callApiOffers() {
    const apiUrl = 'https://car-wash-backend-api.onrender.com/api/homeoffers';
    try {
      let resp = await fetch(apiUrl);
      if (!resp.ok) {
        throw new Error('Network response was not ok');
      }
      let respJson = await resp.json();
      setHomeOffers(respJson);
    } catch (error) {
      console.error('Error fetching promotion:', error);
    }
  }

  function handleofferClick(homeservicesName, description, totalPrice, image) {
    // Navigate to a new page or display details
    props.navigation.navigate('Booknow', {
      homeservicesName,
      description,
      totalPrice,
      image,
    });
  }

  async function callApiPromotion() {
    const apiUrl = 'https://car-wash-backend-api.onrender.com/api/promotions';
    try {
      let resp = await fetch(apiUrl);
      if (!resp.ok) {
        throw new Error('Network response was not ok');
      }
      let respJson = await resp.json();
      setPromotions(respJson);
    } catch (error) {
      console.error('Error fetching promotion:', error);
    }
  }

  function handlePromotionClick(service, description, fixedAmount) {
    // Navigate to a new page or display details
    props.navigation.navigate('Promotion', { service, description, fixedAmount });
  }

  async function callApiService() {
    const apiUrl = 'https://car-wash-backend-api.onrender.com/api/topservices';
    try {
      let resp = await fetch(apiUrl);
      if (!resp.ok) {
        throw new Error('Network response was not ok');
      }
      let respJson = await resp.json();
      setMyFetchedData(respJson);
    } catch (error) {
      console.error('Error fetching promotion:', error);
    }
  }

  function handleTopservicesClick(title, description, price) {
    // Navigate to a new page or display details
    props.navigation.navigate('Topservice', { title, description, price });
  }
  function fetchservices() {
    fetch('https://car-wash-backend-api.onrender.com/api/services')
      .then((response) => response.json())
      .then((data) => {
        setServicesData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function toggleSearchBar() {
    setSearchBarOpen((prev) => !prev);
  }

  // for date
  function handleDateChange(event, date) {
    if (date !== undefined) {
      const formattedDate = moment(date).format('DD-MM-YYYY');
      setSelectedDate(formattedDate); // Store the formatted date in state
      setShowPicker(false);
      setSearchText("");
      setIsSearching(false);
    }
  }

  // for time
  function showDatePicker() {
    setDatePickerVisible(true);
  }

  function hideDatePicker() {
    setDatePickerVisible(false);
  }

  function handleDateConfirm(date) {
    setSelectedTime(date);
    hideDatePicker();
  }

  function formatTime(time) {
    if (!time) return '';
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true, }).toUpperCase();
  }

  // for notification
  function handleIconPressNotification() {
    props.navigation.navigate('Notification'); // Navigate to the Notification screen
  }

  // for Profile
  function handleIconPressProfile() {
    props.navigation.navigate('Profile'); // Navigate to the Profile screen
  }

  // for home
  function handleIconPressHome() {
    props.navigation.navigate('Home'); // Navigate to the home screen
  }

  // for services
  function handleIconPressService(serviceName, serviceDescription, servicePrice) {
    props.navigation.navigate('Washing', { serviceName, serviceDescription, servicePrice }); // Navigate to the Washing screen
  }

  // for Booking
  const handleIconPressBook = () => {
    props.navigation.navigate('Appointment'); // Navigate to the Appointment screen
  }

  // inbox page
  function handleIconPressInbox() {
    props.navigation.navigate('Washing'); // Navigate to the Confirmation page screen
  }

  // for setting
  async function openSettings() {
    try {
      await Linking.openSettings();
    } catch (error) {
      console.error("Error opening settings:", error);
    }
  }

  // for time
  // const formattedTime = formatTime(currentTime);
  // const { selectedDate, showPicker } = this.state;
  // const { selectedTime, isDatePickerVisible } = this.state;
  // const { services } = this.state;
  // const { isSearchBarOpen, searchText } = this.state;
  // const { myFetchedData } = this.state;
  // const { servicesData } = this.state;

  // const { data } = this.state;

  if (servicesData.length === 0) {
    return <Text>Loading...</Text>;
  }
  

  return (
    <>
      <View style={styles.header}>
        <View style={styles.container1}>
          <Text style={styles.text}>Hello</Text>
          <View style={styles.iconsContainer}>
            <TouchableOpacity onPress={toggleSearchBar}>
              <FontAwesomeIcon icon={faMagnifyingGlass} size={25} color="black" style={styles.icon} />
            </TouchableOpacity>
            <Modal
              transparent={true}
              animationType="slide"
              visible={isSearchBarOpen}
              onRequestClose={toggleSearchBar}
            >
              <View style={styles.modalContainer}>
                <View style={styles.searchBarContainer}>
                  <TextInput
                    placeholder="Search..."
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                  />
                  <TouchableOpacity onPress={toggleSearchBar} style={styles.closeIcon}>
                    <FontAwesomeIcon icon={faCircleXmark} size={25} />
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <TouchableOpacity onPress={handleIconPressNotification}>
              <FontAwesomeIcon icon={faBell} size={25} color="black" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleIconPressProfile}>
              <FontAwesomeIcon icon={faUser} size={25} color="black" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView Vertical={true} showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <ScrollView horizontal={true} style={styles.offer} showsHorizontalScrollIndicator={false}>
            {homeOffers.map((offer) => (
              <View key={offer._id} style={styles.Section}>
                <View style={{ height: 130, width: 195, backgroundColor: "#F2F3F4", borderBottomLeftRadius: 10, borderTopLeftRadius: 10, marginTop: 10 }}>
                  <Text style={styles.text1}>{offer.offerName}</Text>
                  <Text style={{ color: "blue", marginHorizontal: 20 }}>{offer.offer}</Text>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      handleofferClick(
                        offer.homeservicesName,
                        offer.description,
                        offer.totalPrice,
                        offer.image
                      )
                    }
                  >
                    <Text style={styles.buttonText}>Book Now</Text>
                  </TouchableOpacity>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
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
          <ScrollView horizontal={true} style={styles.topservice2} showsHorizontalScrollIndicator={false}>
            <View style={styles.icon3}>
              {servicesData.map((service) => (
                <TouchableOpacity
                  key={service._id}
                  onPress={() => handleIconPressService(service.serviceName, service.serviceDescription, service.servicePrice)}
                  style={styles.card}
                >
                  <Text style={styles.serviceName}>{service.serviceName}</Text>
                  <Text style={styles.servicePrice}>{service.servicePrice}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <Text style={styles.text4}>Upcoming Booking</Text>
          <View style={{ height: 100, width: 350, backgroundColor: "#F2F3F4", marginHorizontal: 20 }}>
            <View style={styles.booking}>
              <Ionicons name="car-sharp" size={40} color="black" margin={4} />
              <Text style={styles.carwash}>Car Wash:car 1</Text>
              <TouchableOpacity style={styles.btn3}>
                <Text style={styles.btntext}>Pending</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.clocktime}>
              <View style={styles.clock}>
                <TouchableOpacity onPress={showDatePicker}>
                  <EvilIcons name="clock" size={22} color="black" />
                </TouchableOpacity>
                {selectedTime && (
                  <Text>{(formatTime(selectedTime)) || "8:30"}</Text>
                )}
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="time"
                  onConfirm={handleDateConfirm}
                  onCancel={hideDatePicker}
                />
              </View>
              <View style={styles.time}>
                <TouchableOpacity onPress={() => setShowPicker(true)}>
                  <AntDesign name="calendar" size={24} color="black" />
                </TouchableOpacity>
                {showPicker && (
                  <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
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
          </View>
          <ScrollView horizontal={true} style={styles.promotion2} showsHorizontalScrollIndicator={false}>
            {promotions.map((promotion) => (
              <View style={styles.promotionItem} key={promotion._id}>
                <TouchableOpacity onPress={() => handlePromotionClick(promotion.service, promotion.description, promotion.fixedAmount)}>
                  <Image source={{ uri: 'https://global-uploads.webflow.com/6275222db3d827ed1bb5c030/628d5275e8398c96485950a6_pexels-maria-geller-2127022.jpg' }} style={styles.item} />
                  <Text style={{ marginTop: 5 }}>{promotion.title}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          <View style={styles.topservice1}>
            <Text style={styles.text7}>Top Services</Text>
          </View>
          <ScrollView horizontal={true} style={styles.topservice2} showsHorizontalScrollIndicator={false}>
            {myFetchedData.map((topservice) => (
              <View style={styles.topservicesItem} key={topservice._id}>
                <TouchableOpacity onPress={() => handleTopservicesClick(topservice.title, topservice.description, topservice.price)}>
                  <Image source={{ uri: 'https://img.freepik.com/premium-photo/man-red-porsche-cayenne-car-wash_900775-46452.jpg' }} style={styles.item} />
                  <Text style={{ marginTop: 5 }}>{topservice.title}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </ScrollView>
        <View style={styles.footer}>
          <View style={styles.iconsContainer1}>
            <View style={styles.text9}>
              <TouchableOpacity onPress={handleIconPressHome}>
                <Entypo name="home" size={30} style={styles.icon4} />
              </TouchableOpacity>
              <Text style={styles.text10}>Home</Text>
            </View>
            <View style={styles.text9}>
              <TouchableOpacity onPress={handleIconPressBook}>
                <Entypo name="calendar" size={30} style={styles.icon4} />
              </TouchableOpacity>
              <Text style={styles.text10}>Booking</Text>
            </View>
            <View style={styles.text9}>
              <TouchableOpacity onPress={handleIconPressNotification}>
                <MaterialIcons name="forward-to-inbox" size={30} style={styles.icon4} />
              </TouchableOpacity>
              <Text style={styles.text10}>Inbox</Text>
            </View>
            <View style={styles.text9}>
              <TouchableOpacity onPress={openSettings}>
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
const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: '#a7a7a7',
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  searchBarContainer: {
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
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
    borderRadius: 10,
    backgroundColor: '#f8db03'
  },
  buttonText: {
    fontSize: 15,
    textAlign: "center",
    marginVertical: 5,
  },
  img: {
    height: 130,
    width: 175,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 10
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
  offer: {
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
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
    // elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    padding: 5,
    alignItems: 'center',
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
    height: 150,
    width: 220,
    borderRadius: 10,
    marginRight: 20,
    padding: 10,
  },
 
  
  footer: {
    position: 'relative',
    backgroundColor: "#fff",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    alignItems: 'center',
    zIndex: 2,
    
  },
  iconsContainer1: {
    flexDirection: "row",
    alignItems:'center', 
  },
  text9: {
    alignItems: "center",
  },
  text10: {
    fontSize: 10,
  },
  icon4: {
    marginHorizontal: 20,
   
  },
});

export default Home;
