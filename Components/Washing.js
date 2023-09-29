import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Linking,
    TextInput,
    Image
} from 'react-native';
import { Appearance } from 'react-native';
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

const Washing = ({ navigation }) => {
    // State variables using useState hook
    const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
    const [selectedTimes, setSelectedTimes] = useState(Array(3).fill(null));
    const [pickupAddress, setPickupAddress] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [time, setTime] = useState(new Date());
    const [reviews, setReviews] = useState([]);
    const colorScheme = Appearance.getColorScheme();

    const [errors, setErrors] = useState({
        pickupAddress: '',
        totalPrice: ''
    });

    // useEffect hook for side effects
    useEffect(() => {
        // Your side effect code here (e.g., fetching data)
    }, []);

    // Function to show date picker
    const showDatePicker = () => {
        setIsDatePickerVisible(true);
    };

    // Function to hide date picker
    const hideDatePicker = () => {
        setIsDatePickerVisible(false);
    };

    // Function to handle date selection
    const handleDateConfirm = (selectedDate) => {
        setTime(selectedDate);
        setIsDatePickerVisible(false); // Hide the date picker
    };

    // Function to format time
    const formatTime = (selectedTime) => {
        if (!selectedTime) return '';
        return selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true, }).toUpperCase();
    };

    // Function to handle date change
    const handleDateChange = (event, selectedDate) => {
        if (selectedDate !== undefined) {
            // setShowPicker(true);
            setDate(selectedDate);
            setShowPicker(false);
        }
    };

    // Function to validate input
    const validateInput = () => {
        let isValid = true;
        const errors = {};

        if (pickupAddress.trim() === '') {
            errors.pickupAddress = '* Pickup Address is required.';
            isValid = false;
        } else {
            errors.pickupAddress = '';
        }

        setErrors(errors);

        return isValid;
    };

    // Function to handle pickup address change
    const handlepickupAddressChange = (text) => {
        setPickupAddress(text);
    };

    // Function to handle Continue button press
    const handleContinue = () => {
        if (validateInput()) {
            const { serviceName, servicePrice } = route.params;
            const servicesName = serviceName;
            const price = servicePrice;

            navigation.navigate('Confirmation', { pickupAddress, date, time, servicesName, price });
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

    // Function to navigate to Services screen
    const handleIconPressService = () => {
        navigation.navigate('Washing');
    };

    // Function to navigate to Booking screen
    const handleIconPressBooking = () => {
        navigation.navigate('Appointment');
    };

    // Function to navigate to Inbox page
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


    // Route parameters
    const route = useRoute();
    const { serviceName, serviceDescription, servicePrice } = route.params;
    const commonStyles = {
        // backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
        color: colorScheme === 'dark' ? '#fff' : '#000',
      };

    return (
        <>
            <View style={[styles.container,commonStyles]}>
                <ScrollView
                    Vertical={true}
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1 }}
                >
                    <Text style={styles.text1}>{serviceName}</Text>
                    <View style={{ height: 133, width: 350, backgroundColor: '#F2F3F4', marginHorizontal: 20 }}>
                        <Image source={{ uri: 'https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=960' }} style={styles.item} />
                    </View>
                    <View style={styles.about}>
                        <Text style={styles.text2}>About</Text>
                        <Text>{serviceDescription}</Text>
                    </View>
                    <View style={styles.reviewtext}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Reviews</Text>
                        <View style={styles.sees}></View>
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {reviews.map((review) => (
                            <View key={review._id} style={styles.reviewCard}>
                                {/* Review content goes here */}
                                <Text style={styles.reviewText}>{review.message}</Text>
                            </View>
                        ))}


                    </ScrollView>
                    <Text style={{ fontWeight: 'bold', marginHorizontal: 20, fontSize: 15, marginVertical: 10 }}>Add Pickup Address<Text style={{ color: 'red' }}> *</Text></Text>
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
                            marginHorizontal: 20
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
                                        onPress={() => setIsDatePickerVisible(false)}
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
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D8D8D8',
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
        width: 300,
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
    item: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});


export default Washing;
