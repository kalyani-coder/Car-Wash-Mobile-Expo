import React, { useState,useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Linking,
    TextInput,
    Image,
    Dimensions,
    PixelRatio,
} from 'react-native';
import { Appearance } from 'react-native';
import { RefreshControl } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
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

function Booknow(props) {
   
    const [pickupAddress, setPickupAddress] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [time, setTime] = useState(new Date());
    const [reviews, setReviews] = useState([]);
    const colorScheme = Appearance.getColorScheme();
    const [refreshing, setRefreshing] = useState(false);
    const [errors, setErrors] = useState({
        pickupAddress: '',
        totalPrice: ''
    });
    const [selectedStars, setSelectedStars] = useState(0);

    // Function for responsive font size
    const responsiveFontSize = (size) => {
        const { width } = Dimensions.get('window');
        const baseFontSize = 16;
        const scale = width / 320; // Adjust the base width as needed
        const newSize = baseFontSize * scale;
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    };

    // Function to show the date picker
    const showDatePicker = () => {
        setShowPicker(false);
        setIsDatePickerVisible(true);
        // setIsDatePickerVisible(true);
    };

    // Function to hide the date picker
    const hideDatePicker = () => {
        setIsDatePickerVisible(false);
    };

    // Function to handle date confirmation
    const handleDateConfirm = (date) => {
        setTime(date);
        hideDatePicker();
        setShowPicker(false);
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
            setErrors({ ...errors, pickupAddress: '' });
        }
    };

    // Function to validate input fields
    const validateInput = () => {
        let isValid = true;
        const newErrors = {};

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
    const handlepickupAddressChange = (text) => {
        setPickupAddress(text);
    };

    // Function to handle continue button click
    const handlcontinue = () => {
        if (validateInput()) {
            const { setDate, setTime, setPickupAddress } = props;
            const { homeservicesName, totalPrice, image } = props.route.params;
            const servicesName = homeservicesName;
            const price1 = totalPrice;
            props.navigation.navigate('BookConfirmation', {
                date,  // Pass the value, not the function
                time,
                pickupAddress,
                servicesName,
                price1
            });
        }
    };

    // Function to handle star rating
    const handleStarPress = (rating) => {
        setSelectedStars(rating);
    };

    // Function to navigate to the home screen
    const handleIconPressHome = () => {
        props.navigation.navigate('Home');
    };

    // Function to navigate to the notification screen
    const handleIconPressNotification = () => {
        props.navigation.navigate('Notification');
    };

    // Function to navigate to the booking screen
    const handleIconPressService = () => {
        props.navigation.navigate('Washing');
    };

    // Function to navigate to the appointment screen
    const handleIconPressBooking = () => {
        props.navigation.navigate('Appointment');
    };

    // Function to navigate to the inbox screen
    const handleIconPressInbox = () => {
        props.navigation.navigate('Confirmation');
    };

    // Function to open device settings
    const openSettings = async () => {
        try {
            await Linking.openSettings();
        } catch (error) {
            console.error('Error opening settings:', error);
        }
    };
    //for refreshing the field 

    const onRefresh = () => {
        
        setRefreshing(true);
  
        setTimeout(() => {
          
          setRefreshing(false);
        }, 2000); 
      };
    useEffect(() => {
        fetch('https://car-wash-backend-api.onrender.com/api/reviews')
            .then((response) => response.json())
            .then((data) => {
                setReviews(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

const commonStyles = {
    // backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
    color: colorScheme === 'dark' ? '#fff' : '#000',
  };
    // Get current date
    const currentDate = moment();
    const formattedDate = currentDate.format('D MMM');
    const { homeservicesName, image, description } = props.route.params;
    // const { date, time, pickupAddress } = props;

    return (
        <>
            <View style={[styles.container,commonStyles]}>
                <ScrollView
                    Vertical={true}
                    showsVerticalScrollIndicator={false}
                    style={{flex:1}}
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
                    <Text style={styles.text1}>{homeservicesName}</Text>
                    <View style={{ height: 130, width: 350, backgroundColor: '#F2F3F4', marginHorizontal: 20, marginTop: 10 }}>
                        <Image source={{ uri: image }} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
                    </View>
                    <View style={styles.about}>
                        <Text style={styles.text2}>About</Text>
                        <Text>{description}</Text>
                    </View>
                    <View style={styles.reviewtext}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Reviews</Text>
                        <View style={styles.sees}></View>
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {reviews.map((review) => (
                            <View key={review._id} style={styles.reviewCard}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5,justifyContent:'space-between'  }}>
                                    {/* <Text style={{ marginRight: 5 }}>{review.rating}</Text> */}
                                    <Text style={{fontWeight:'bold'}}>{review.clientName}</Text>
                                    <View style={{ flexDirection: 'row'}}>
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <FontAwesomeIcon
                                                key={index}
                                                icon={faStar}
                                                size={20}
                                                color={index < review.rating ? '#DAA520' : 'black'}
                                            />
                                        ))}
                                    </View>
                                </View>
                                <ScrollView style={{ maxHeight: 100 }} nestedScrollEnabled={true}>
                                    <Text style={styles.reviewText}>{review.message}</Text>
                                </ScrollView>
                            </View>
                        ))}


                    </ScrollView>
                    <Text style={{ fontWeight: 'bold', marginHorizontal: 20, fontSize: 15, marginVertical: 10 }}>Add Pickup Address
                        <Text style={{ color: 'red' }}> *</Text>
                    </Text>
                    <TextInput
                        placeholder="Enter Address"
                        placeholderTextColor='#000'
                        value={pickupAddress}
                        onChangeText={handlepickupAddressChange}
                        style={styles.input}
                    />
                    <Text style={styles.errorText}>{errors.pickupAddress}</Text>
                    <Text style={{ fontWeight: 'bold', marginHorizontal: 20, fontSize: 15, marginVertical: 10 }}>Choose Date & Time</Text>
                    <View
                        style={{
                            height: 65,
                            width: 360,
                            backgroundColor: "white",
                            marginVertical: 10,
                            marginHorizontal: 15
                        }}
                    >
                        <View style={{ flexDirection: 'row', margin: 15, }}>
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
                    <TouchableOpacity style={styles.button} onPress={handlcontinue}>
                        <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                    <View style={styles.iconsContainer1}>
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
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#D8D8D8',
        height: '100%',
    },
    text1: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
    },
    text2: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    about: {
        margin: 20,
    },
    reviewtext: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'space-between',
    },
    sees: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    reviewCard: {
        width: 350,
        height: 150,
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginVertical: 10, // Add vertical margin to separate cards
        padding: 10,
        borderRadius: 10,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    reviewText: {
        fontSize: 16,
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        marginHorizontal: 20,
    },
    date1: {
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
  },
  maincontainer: {
    // marginHorizontal: 15,
    // marginTop:10
    position: 'relative'
},
button: {
    position: 'relative',
    backgroundColor: "#5B7586",
    height: 45,
    width: 360,
    paddingTop: 10,
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 2,
    borderTopColor:'gray',
    borderWidth:0.5
},
buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
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
    borderTopColor:'gray',
    borderWidth:0.5
},
iconsContainer1: {
    flexDirection: "row",
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
});

export default Booknow;
