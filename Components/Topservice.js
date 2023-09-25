
import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Linking,
    TextInput,
    Image


} from 'react-native'
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



class Topservice extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            selectedTimes: Array(3).fill(null),
            pickupAddress: '',
            totalPrice: '',
            date: new Date(),
            showPicker: false,
            isDatePickerVisible: false,
            time: new Date(),
            errors: {
                pickupAddress: '',
                totalPrice: ''

            }

        };
    }


    // for time
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

    //for date
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


        return isValid;
    };
    handlepickupAddressChange = (text) => {
        this.setState({ pickupAddress: text });
    };

    handlcontinue = () => {
        if (this.validateInput()) {
            const { pickupAddress, date, time  } = this.state;
            const { title, price } = this.props.route.params;
            const servicesName = title;
            const price1 = price;
            // console.log(Price1);

            this.props.navigation.navigate('Topserviceconfirmation', { pickupAddress, date, time, servicesName, price1 }); // Navigate to the Confirmation page screen
        }
    }

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
    handleIconPressNotification = () => {
        this.props.navigation.navigate('Notification');
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
        const { serviceName, serviceDescription, servicePrice } = route.params;
        const { errors } = this.state;
        const { date, showPicker } = this.state;
        const { time, isDatePickerVisible } = this.state;
        const { title, description, price } = this.props.route.params;

        return (
            <>



                <View style={styles.container}>
                    <ScrollView
                        Vertical={true}
                        showsVerticalScrollIndicator={false}
                    >
                        <Text style={styles.text1}>{title}</Text>

                        {/* <Text >{servicePrice}</Text> */}
                        <View style={{ height: 125, width: 350, backgroundColor: '#F2F3F4', marginHorizontal: 20 }}>

                            {/* <Image source={require("./Images/Car-Bikes-Wraps.png")} style={{ flex: 1, resizeMode: 'fill', width: "100", height: "100" }} /> */}

                            {/* <Image source={require("./Images/Car-Bike.png")}  style={{ width: '100%', height: '100%', resizeMode: 'cover' }} /> */}
                            <Image source={{ uri: 'https://img.freepik.com/premium-photo/man-red-porsche-cayenne-car-wash_900775-46452.jpg' }} style={styles.item} />
                        </View>

                        <View style={styles.about}>
                            <Text style={styles.text2}>About</Text>
                            <Text>{description}</Text>
                            {/* <Text>{price}</Text> */}

                            
                        </View>
                      
                      

                        <View style={styles.reviewtext}>
                            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Reviews</Text>
                            <View style={styles.sees}>
                                {/* <Text>See all</Text> */}
                                {/* <MaterialCommunityIcons name="greater-than" size={17} /> */}
                            </View>
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
                                                    onPress={() => this.handleStarPress(index)}
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
                                                    onPress={() => this.handleStarPress(index)}
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

                        <Text style={{ fontWeight: 'bold', marginHorizontal: 20, fontSize: 15, marginVertical: 10 }}>Add Pickup Address
                        <Text style={{color:'red'}}> *</Text></Text>

                        <TextInput
                            placeholder="Enter Address"
                            value={this.state.pickupAddress}
                            onChangeText={this.handlepickupAddressChange}
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
                            {/* <Text>{date} |  {time}</Text> */}

                            <View style={{ flexDirection: 'row', margin: 15, }}>
                                <TouchableOpacity
                                    onPress={() => this.setState({ showPicker: true })}
                                >
                                    <AntDesign name="calendar" size={35} color="black" />
                                </TouchableOpacity>
                                <View style={{ marginLeft: 15, flexDirection: 'row' }}>
                                    {this.state.date && (
                                        <Text> {moment(this.state.date).format('DD-MM-YYYY')}</Text>
                                    )}

                                    <View style={styles.date1}>

                                        <TouchableOpacity onPress={this.showDatePicker}>
                                            <EvilIcons name="clock" size={35} color="black" />
                                        </TouchableOpacity>

                                        {this.state.time && (
                                            <Text> {moment(this.state.time).format('hh:mm A')}</Text>
                                        )}

                                        <DateTimePickerModal
                                            isVisible={isDatePickerVisible}
                                            mode="time"
                                            onConfirm={this.handleDateConfirm}
                                            onCancel={this.hideDatePicker}
                                        />

                                        {showPicker && (
                                            <DateTimePicker
                                                value={this.state.date}
                                                mode="date"
                                                display="default"
                                                onChange={this.handleDateChange}
                                            />
                                        )}
                                        {/* {this.state.date && (
                                        <Text> {this.state.date.toLocaleDateString()}</Text>
                                    )} */}
                                        {/* <Text>{this.state.date.toLocaleDateString()} | {this.formatTime(this.state.time) || "8:30"}</Text> */}

                                    </View>
                                </View>
                            </View>
                        </View>


                        {/* <Text style={{ fontWeight: 'bold', marginHorizontal: 20, fontSize: 15, marginVertical: 5 }}>Enter totalPrice</Text> */}
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
                        {/* <TextInput
                        placeholder="Price"
                        value={this.state.totalPrice}
                        onChangeText={this.handletotalPriceChange}
                        style={styles.input}

                    />
                    <Text style={styles.errorText}>{errors.totalPrice}</Text> */}

                    </ScrollView>
                    <View style={styles.maincontainer}>

                        <TouchableOpacity style={styles.button} onPress={this.handlcontinue}>
                            <Text style={styles.buttonText}>Continue</Text>
                        </TouchableOpacity>
                    </View>

                    
                        <View style={styles.footer}>

                            <View style={styles.iconsmainContainer1}>

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
                    </View>
              

            </>
        );

    }
}
const styles = StyleSheet.create({
    container: {
        // paddingTop:50,
        // marginTop:50,
        backgroundColor: '#a7a7a7'

    },
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

    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        // marginBottom: 10,
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
    maincontainer: {
        marginHorizontal: 15,
    },
    button: {
        backgroundColor: "#5B7586",
        height: 45,
        width: 360,
        // paddingTop: 10,
        // marginTop: 15,
        borderRadius: 2,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        margin:10

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
    item:{
        width: '100%', 
        height: '100%',
     resizeMode: 'cover' 
    }
})
export default Topservice;