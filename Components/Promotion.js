import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { useRoute } from "@react-navigation/native";
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Promotion = ({ navigation }) => {
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState(Array(3).fill(null));
  const [activePicker, setActivePicker] = useState(null);
  const [pickupAddress, setPickupAddress] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [time, setTime] = useState(new Date());
  const [errors, setErrors] = useState({
    pickupAddress: '',
    totalPrice: '',
  });

  // Function to show the date picker
  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  // Function to hide the date picker
  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  // Function to handle date selection
  const handleDateConfirm = (date) => {
    setTime(date);
    hideDatePicker();
  };

  // Function to format time
  const formatTime = (time) => {
    if (!time) return '';
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase();
  };

  // Function to handle date change
  const handleDateChange = (event, date) => {
    if (date !== undefined) {
      setDate(date);
      setShowPicker(false);
    }
  };

  // Function to validate user input
  const validateInput = () => {
    let isValid = true;
    const newErrors = { ...errors };
    if (pickupAddress.trim() === '') {
      newErrors.pickupAddress = 'Pickup address is required.';
      isValid = false;
    } else {
      newErrors.pickupAddress = '';
    }
    setErrors(newErrors);
    return isValid;
  };

  // Function to handle pickup address change
  const handlePickupAddressChange = (text) => {
    setPickupAddress(text);
  };

  // Function to handle continue button press
  const handleContinue = () => {
    if (validateInput()) {
      const { service, fixedAmount } = route.params;
      const servicesName = service;
      const price1 = fixedAmount;
      navigation.navigate('PromotionConfirmation', {
        pickupAddress,
        date,
        time,
        servicesName,
        price1,
      });
    }
  };

  // Function to handle star rating press
  const [selectedStars, setSelectedStars] = useState(0);
  const handleStarPress = (rating) => {
    setSelectedStars(rating);
  };

  // Function to navigate to Home screen
  const handleIconPressHome = () => {
    navigation.navigate('Home');
  };

  // Function to navigate to Notification screen
  const handleIconPressNotification = () => {
    navigation.navigate('Notification');
  };

  // Function to navigate to Washing screen
  const handleIconPressService = () => {
    navigation.navigate('Washing');
  };

  // Function to navigate to Appointment screen
  const handleIconPressBooking = () => {
    navigation.navigate('Appointment');
  };

  // Function to navigate to Inbox screen
  const handleIconPressInbox = () => {
    navigation.navigate('Confirmation');
  };

  // Function to open device settings
  const openSettings = async () => {
    try {
      await Linking.openSettings();
    } catch (error) {
      console.error('Error opening settings:', error);
    }
  };

  const route = useRoute();
  const currentDate = moment();
  const formattedDate = currentDate.format('D MMM');

  return (
    <View style={styles.container}>
      <ScrollView Vertical={true} showsVerticalScrollIndicator={false}>
        <Text style={styles.text1}>{route.params.service}</Text>
        <View style={{ height: 130, width: 350, backgroundColor: '#F2F3F4', marginHorizontal: 20 }}>
          <Image source={{ uri: 'https://global-uploads.webflow.com/6275222db3d827ed1bb5c030/628d5275e8398c96485950a6_pexels-maria-geller-2127022.jpg' }} style={styles.item} />
        </View>
        <View style={styles.about}>
          <Text style={styles.text2}>About</Text>
          <Text>{route.params.description}</Text>
        </View>
        <View style={styles.reviewtext}>
          <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Reviews</Text>
          <View style={styles.sees}></View>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{ height: 150, width: 300, backgroundColor: 'white', marginHorizontal: 20 }}>
            <View style={styles.review}>
              <View style={styles.icons}>
                <AntDesign name="contacts" size={35} color="black" backgroundColor="white" margin={4} />
                <Text style={styles.text3}>Mr Xyz</Text>
                <View style={styles.icon}>
                  {[1, 2, 3, 4, 5].map((index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleStarPress(index)}
                      style={styles.starmainContainer}
                    >
                      <Entypo
                        name="star"
                        size={20}
                        color={index <= selectedStars ? 'yellow' : 'gray'}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi tempore alias eum deserunt recusandae ex rerum qui rem.</Text>
            </View>
          </View>
          <View style={{ height: 150, width: 300, backgroundColor: 'white', marginHorizontal: 20 }}>
            <View style={styles.review}>
              <View style={styles.icons}>
                <AntDesign name="contacts" size={35} color="black" backgroundColor="white" margin={4} />
                <Text style={styles.text3}>Mr Xyz</Text>
                <View style={styles.icon}>
                  {[1, 2, 3, 4, 5].map((index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleStarPress(index)}
                      style={styles.starmainContainer}
                    >
                      <Entypo
                        name="star"
                        size={20}
                        color={index <= selectedStars ? 'yellow' : 'gray'}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi tempore alias eum deserunt recusandae ex rerum qui rem.</Text>
            </View>
          </View>
        </ScrollView>
        <Text style={{ fontWeight: 'bold', marginHorizontal: 20, fontSize: 15, marginVertical: 10 }}>
          Add Pickup Address<Text style={{ color: 'red' }}> *</Text>
        </Text>
        <TextInput
          placeholder="Enter Address"
          placeholderTextColor='#000'
          value={pickupAddress}
          onChangeText={handlePickupAddressChange}
          style={styles.input}
        />
        <Text style={styles.errorText}>{errors.pickupAddress}</Text>
        <Text style={{ fontWeight: 'bold', marginHorizontal: 20, fontSize: 15, marginVertical: 10 }}>
          Choose Date & Time
        </Text>
        <View style={{
          height: 65,
          width: 360,
          backgroundColor: "white",
          marginVertical: 10,
          marginHorizontal: 20
        }}>
          <View style={{ flexDirection: 'row', margin: 15 }}>
            <TouchableOpacity
              onPress={() => setShowPicker(true)}
            >
              <AntDesign name="calendar" size={35} color="black" />
            </TouchableOpacity>
            <View style={{ marginLeft: 15, flexDirection: 'row' }}>
              {date && (
                <Text> {moment(date).format('DD-MM-YYYY')}</Text>
              )}
              <View style={styles.date1}>
                <TouchableOpacity onPress={showDatePicker}>
                  <EvilIcons name="clock" size={35} color="black" />
                </TouchableOpacity>
                {time && (
                  <Text> {moment(time).format('hh:mm A')}</Text>
                )}
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="time"
                  onConfirm={handleDateConfirm}
                  onCancel={hideDatePicker}
                />
                {showPicker && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                  />
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.maincontainer}>
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <View style={styles.iconsmainContainer1}>
          <View style={styles.text9}>
            <TouchableOpacity onPress={handleIconPressHome}>
              <Entypo name="home" size={30} style={styles.icon4} />
            </TouchableOpacity>
            <Text style={styles.text10}>Home</Text>
          </View>
          <View style={styles.text9}>
            <TouchableOpacity onPress={handleIconPressBooking}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#a7a7a7'
  },
  text1: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold'
  },
  text2: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  about: {
    margin: 20,
  },
  reviewtext: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between'
  },
  sees: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text3: {
    fontWeight: 'bold',
  },
  icon: {
    flexDirection: 'row',
  },
  review: {
    margin: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 20,
    backgroundColor: 'white',
  },
  errorText: {
    color: 'red',
    marginHorizontal: 20
  },
  datepicker: {
    marginHorizontal: 20,
    borderWidth: 1,
    padding: 7,
    width: 150
  },
  date: {
    height: 60,
    width: 50,
    backgroundColor: '#F2F3F4',
    marginHorizontal: 10
  },
  datetext: {
    fontSize: 14,
    textAlign: 'center',
    margin: 8,
  },
  date1: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  datetext1: {
    height: 40,
    width: 90,
    backgroundColor: '#F2F3F4',
    fontSize: 18,
    textAlign: 'center',
    margin: 5,
    paddingTop: 8
  },
  maincontainer: {
    marginHorizontal: 15,
    marginTop:20
  },
  button: {
    backgroundColor: "#5B7586",
    height: 45,
    width: 360,
    paddingTop: 10,
    marginTop: 15,
    borderRadius: 2,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 5,
    alignItems: 'center',
    zIndex: 2,
  },
  iconsmainContainer1: {
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
  item: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  }
});

export default Promotion;
