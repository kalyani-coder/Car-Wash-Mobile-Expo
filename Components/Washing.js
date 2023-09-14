
import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Linking,
    TextInput,


} from 'react-native'
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



class Washing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            selectedTimes: Array(3).fill(null), // Initialize an array to store selected times
            activePicker: null, // To track the active picker index
            date: new Date(), // Initialize a state variable with the current date
            showDatePicker: false, // Set initial visibility of the date picker
            time: new Date(), // Initialize a state variable with the current time
            showTimePicker: false,
            pickupAddress: '',
            totalPrice: '',
            errors: {
                pickupAddress: '',
                totalPrice: ''

            }

        };
    }

    validateInput = () => {
        let isValid = true;
        const { pickupAddress, totalPrice } = this.state;
        const errors = {};
    
        if (pickupAddress.trim() === '') {
            errors.pickupAddress = 'pickupAddress is required.';
          isValid = false;
        } else {
            errors.pickupAddress = '';
        }
    
        if (totalPrice.trim() === '') {
            errors.totalPrice = 'totalPrice can not be empty';
          isValid = false;
        } else if (isNaN(totalPrice)) {
            errors.totalPrice = 'totalPrice must be number';
          isValid = false;
        } else {
            errors.totalPrice = '';
        }
    
        return isValid;
      };
      handlepickupAddressChange = (text) => {
        this.setState({ pickupAddress: text });
      };
    
      handletotalPriceChange = (text) => {
        this.setState({ totalPrice: text });
      };
    handleDateChange = (event, selectedDate) => {
        if (selectedDate !== undefined) {
            this.setState({ date, showDatePicker: false });
        } else {
            this.setState({ showDatePicker: false });
        }
    }
    formatDate(date) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }
    handleTimeChange = (event, selectedTime) => {
        if (selectedTime !== undefined) {
            this.setState({ time, showTimePicker: false });
        } else {
            this.setState({ showTimePicker: false });
        }
    }

    handlcontinue = () => {
        const { pickupAddress,totalPrice,selectedDate,selectedTime} = this.state;
        if (this.validateInput()) {

            this.props.navigation.navigate('Confirmation',{pickupAddress,totalPrice,date,time}); // Navigate to the Confirmation page screen
        }
    }

    // showDateTimePicker = (index) => {
    //     this.setState({ isDateTimePickerVisible: true, activePicker: index });
    // };

    // hideDateTimePicker = () => {
    //     this.setState({ isDateTimePickerVisible: false, activePicker: null });
    // };

    // handleDateTimeConfirm = (datetime) => {
    //     const { activePicker } = this.state;
    //     if (activePicker !== null) {
    //         const updatedSelectedTimes = [...this.state.selectedTimes];
    //         updatedSelectedTimes[activePicker] = datetime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    //         this.setState({
    //             selectedTimes: updatedSelectedTimes,
    //             isDateTimePickerVisible: false,
    //             activePicker: null,
    //         });
    //     }
    // };

    //for date
    // onDayPress = (day) => {
    //     this.setState({
    //         selectedDate: day.dateString,
    //     });
    // };
    //map link
    // openMapLink = () => {
    //     const { latitude, longitude } = this.props;
    //     const mapUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    //     Linking.openURL(mapUrl);
    // };

    //for stars
    state = {
        selectedStars: 0,
    };
    handleStarPress = (rating) => {
        this.setState({ selectedStars: rating });
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
        this.props.navigation.navigate('Confirmation'); // Navigate to the Appointment screen
    };
    //for  setting
    openSettings = async () => {
        try {
            await Linking.openSettings();
        } catch (error) {
            console.error('Error opening settings:', error);
        }
    };


    render() {
        // for date
        const currentDate = moment();
        const formattedDate = currentDate.format('D MMM');

        const { selectedStars } = this.state;
        const { route } = this.props;
        const { serviceName, serviceDescription } = route.params;
        const { errors } = this.state;

        return (
            <>


                {/* <Text style={styles.text}>Washing</Text> */}
                <ScrollView
                    Vertical={true}
                    showsVerticalScrollIndicator={false}
                >

                    <View style={{ height: 120, width: 350, backgroundColor: '#F2F3F4', marginHorizontal: 20 }}>
                        <Text style={styles.text1}>{serviceName}</Text>
                    </View>

                    <View style={styles.about}>
                        <Text style={styles.text2}>About</Text>
                        <Text>{serviceDescription}.</Text>
                    </View>

                    <View style={styles.reviewtext}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Reviews</Text>
                        <View style={styles.sees}>
                            <Text>See all</Text>
                            <MaterialCommunityIcons name="greater-than" size={17} />
                        </View>
                    </View>


                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={{ height: 150, width: 300, backgroundColor: '#F2F3F4', marginHorizontal: 20 }}>
                            <View style={styles.review}>
                                <View style={styles.icons}>
                                    <AntDesign name="contacts" size={35} color="black" backgroundColor="white" margin={4} />

                                    <Text style={styles.text3}>Mr Xyz</Text>
                                    <View style={styles.icon}>


                                        {[1, 2, 3, 4, 5].map((index) => (
                                            <TouchableOpacity
                                                key={index}
                                                onPress={() => this.handleStarPress(index)}
                                                style={styles.starContainer}
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
                        <View style={{ height: 150, width: 300, backgroundColor: '#F2F3F4', marginHorizontal: 20 }}>
                            <View style={styles.review}>
                                <View style={styles.icons}>
                                    <AntDesign name="contacts" size={35} color="black" backgroundColor="white" margin={4} />

                                    <Text style={styles.text3}>Mr Xyz</Text>
                                    <View style={styles.icon}>

                                        {[1, 2, 3, 4, 5].map((index) => (
                                            <TouchableOpacity
                                                key={index}
                                                onPress={() => this.handleStarPress(index)}
                                                style={styles.starContainer}
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

                    <Text style={{ fontWeight: 'bold', marginHorizontal: 20, fontSize: 15, marginVertical: 10 }}>pickupAddress</Text>
                    {/* <View style={{ height: 50, width: 360, backgroundColor: '#F2F3F4', marginHorizontal: 20 }}>
                        <View style={styles.gloss}>
                            <TouchableOpacity onPress={this.openMapLink}>
                                <FontAwesome name="map-marker" size={35} color="black" marginBottom={5}/>
                            </TouchableOpacity>
                            <Text style={{ fontSize: 15 }}>Amanora Park Town 1284 ABC pickupAddress</Text>
                            <TouchableOpacity onPress={this.openMapLink}>
                                <MaterialCommunityIcons name="greater-than" size={17} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View> */}
                    <TextInput
                        placeholder="Enter pickupAddress"
                        value={this.state.pickupAddress}
                        onChangeText={this.handlepickupAddressChange}
                        
                        style={styles.input}
                    />
                    <Text style={styles.errorText}>{errors.pickupAddress}</Text>

                    <Text style={{ fontWeight: 'bold', marginHorizontal: 20, fontSize: 15, marginVertical: 10 }}>Choose Date & Time</Text>
                    {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={styles.date}>
                            <Text style={styles.datetext}>{formattedDate}</Text>
                        </View>
                        <View style={styles.date}>
                            <Text style={styles.datetext}>{formattedDate}</Text>
                        </View>
                        <View style={styles.date}>
                            <Text style={styles.datetext}>{formattedDate}</Text>
                        </View>
                        <View style={styles.date}>
                            <Text style={styles.datetext}>{formattedDate}</Text>
                        </View>
                        <View style={styles.date}>
                            <Text style={styles.datetext}>{formattedDate}</Text>
                        </View>
                        <View style={styles.date}>
                            <Text style={styles.datetext}>{formattedDate}</Text>
                        </View>
                        <View style={styles.date}>
                            <Text style={styles.datetext}>{formattedDate}</Text>
                        </View>

                    </ScrollView> */}
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.datepicker}>

                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: 'center' }}
                                onPress={() => this.setState({ showDatePicker: true })}
                            >
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon name="calendar" size={30} color="black" />
                                    <Text style={{ marginLeft: 10 }}>
                                        {this.formatDate(this.state.date)}
                                    </Text>
                                </View>
                            </TouchableOpacity>


                            {this.state.showDatePicker && (
                                <DateTimePicker
                                    testID="datePicker"
                                    value={this.state.date}
                                    mode="date"
                                    is24Hour={true}
                                    display="default"
                                    onChange={this.handleDateChange}
                                />
                            )}
                        </View>
                        <View style={styles.datepicker}>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: 'center' }}
                                onPress={() => this.setState({ showTimePicker: true })}
                            >
                                <View style={{ flexDirection: 'row' }}>

                                    {/* <Icon name="clock" size={30} color="blue" /> */}
                                    <EvilIcons name="clock" size={30} color="black" />

                                    <Text style={{ marginLeft: 10 }}>
                                        {this.state.time.toLocaleTimeString('en-US', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true,
                                        })}
                                    </Text>
                                </View>


                            </TouchableOpacity>


                            {this.state.showTimePicker && (
                                <DateTimePicker
                                    testID="timePicker"
                                    value={this.state.time}
                                    mode="time"
                                    is24Hour={false}
                                    display="default"
                                    onChange={this.handleTimeChange}
                                />
                            )}
                        </View>
                    </View>




                    <Text style={{ fontWeight: 'bold', marginHorizontal: 20, fontSize: 15, marginVertical: 5 }}>Enter totalPrice</Text>
                    {/* <View style={styles.time1}>
                        <View style={styles.date1}>
                            {this.state.selectedTimes.map((time, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => this.showDateTimePicker(index)}
                                    style={styles.timePicker}
                                >
                                    <Text style={styles.datetext1}>
                                        {time || '8:30'}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                            <DateTimePickerModal
                                isVisible={this.state.isDateTimePickerVisible}
                                mode="time"
                                is24Hour={true}
                                display="spinner"
                                onConfirm={this.handleDateTimeConfirm}
                                onCancel={this.hideDateTimePicker}
                            />
                        </View>
                    </View >
                    <View style={styles.timepicker}>
                        <DateTimePickerModal
                            isVisible={this.state.isDateTimePickerVisible}
                            mode="time"
                            is24Hour={true}
                            display="spinner"
                            onConfirm={this.handleDateTimeConfirm}
                            onCancel={this.hideDateTimePicker}

                        />

                    </View> */}
                    <TextInput
                        placeholder="totalPrice"
                        value={this.state.totalPrice}
                        onChangeText={this.handletotalPriceChange}
                        style={styles.input}

                    />
                    <Text style={styles.errorText}>{errors.totalPrice}</Text>

                </ScrollView>
                <View style={styles.container}>

                    <TouchableOpacity style={styles.button} onPress={this.handlcontinue}>
                        <Text style={styles.buttonText}>Continue</Text>
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
                                <MaterialIcons name="forward-to-inbox" size={30} style={styles.icon4} />
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

    text: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        margin: 5
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
    // gloss: {
    //     paddingTop: 10,
    //     marginHorizontal: 10,
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    // },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        // marginBottom: 10,
        marginHorizontal: 20
    },
    errorText: {
        color: 'red',
        // marginBottom: 5,
        marginHorizontal: 20
    },
    datepicker: {
        marginHorizontal: 20,
        borderWidth: 1,
        padding: 7,
        width: 150
        // borderColor:'black',

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
    container: {
        marginHorizontal: 15,
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
        color: "white",
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
})
export default Washing;