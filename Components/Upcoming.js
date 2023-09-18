import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Button,
    Linking,
    ScrollView

} from 'react-native'
import moment from 'moment';



import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';


class Upcoming extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTime: new Date(), //for time
            data: [],

        };
    }
    //for time

    // componentDidMount() {
    //     this.interval = setInterval(() => {
    //         this.setState({ currentTime: new Date() });
    //     }, 60000); // Update every minute
    // }

    // componentWillUnmount() {
    //     clearInterval(this.interval);
    // }

    // formatTime = (date) => {
    //     const hours = date.getHours();
    //     const minutes = date.getMinutes();
    //     const ampm = hours >= 12 ? 'PM' : 'AM';
    //     const formattedHours = hours % 12 || 12;  // Convert to 12-hour format
    //     return `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
    // };

    // //for date
    // onDayPress = (day) => {
    //     this.setState({
    //         selectedDate: day.dateString,
    //     });
    // };


    componentDidMount() {
        // Make an API request to fetch data and update the state
        fetch('https://car-wash-backend-api.onrender.com/api/bookings')
            .then((response) => response.json())
            .then((data) => {
                this.setState({ data });
            })
            .catch((error) => {
                console.error(error);
            });
    }

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
    render() {

        //for time
        // const formattedTime = this.formatTime(this.state.currentTime);

        // for date
        const currentDate = moment();
        // const formattedDate = currentDate.format('D MMM');
        //for booking icon
        const { navigation } = this.props;
        const { data } = this.state;

        return (
            <>
                {/* <Text>Tomorrow</Text> */}
                <View style={styles.flex}>
                    <ScrollView
                        Vertical={true}
                        showsVerticalScrollIndicator={false}
                    >
                        {data.map((item) => (
                            <View key={item.id} style={styles.card}>
                                <View style={styles.wash}>
                                    <Text style={styles.date}>{moment(item.date).format('D MMM')}</Text>
                                    <View>
                                    <Text>{item.servicesName}</Text>
                                    <Text>{item.totalPrice}</Text>
                                    </View>
                                    <Text style={styles.btn3}>{item.status === 'Accepted' ? 'Confirmed' : 'Pending'}</Text>


                                </View>
                                <Text style={styles.clock}>Time:{item.time}</Text>
                                <View style={styles.button}>
                                    <TouchableOpacity 
                                        style={styles.btn1}
                                       >
                                        <Text style={styles.buttontext}>Reschedule</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        style={styles.btn2}
                                       >
                                        <Text style={styles.buttontext}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        ))}
                        {/* <View style={{ height: 180, width: 380, backgroundColor: '#E5E5E5', borderWidth: 2, borderColor: 'white' }}>
                            <View style={styles.wash}>
                                <TouchableOpacity style={styles.date}>
                                    <Text style={styles.datetext}>{formattedDate}</Text>
                                </TouchableOpacity>
                                <Text>Wash</Text>
                                <TouchableOpacity style={styles.btn3}>
                                    <Text style={styles.btntext}>Confirmed</Text>
                                </TouchableOpacity>

                            </View>
                            <View style={styles.clock}>
                                <EvilIcons name="clock" size={24} color="black" />
                                <Text>{formattedTime}</Text>
                            </View>
                            <View style={styles.button}>
                                <TouchableOpacity onPress={() => this.handleButtonPress('button1')}
                                    style={[
                                        styles.btn1,
                                        { backgroundColor: isButton1Pressed ? 'grey' : 'white' },
                                    ]}
                                    underlayColor="grey">
                                    <Text style={styles.buttontext}>Reschedule</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.handleButtonPress('button2')}
                                    style={[
                                        styles.btn2,
                                        { backgroundColor: isButton2Pressed ? 'grey' : 'white' },
                                    ]}
                                    underlayColor="grey">
                                    <Text style={styles.buttontext}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View> */}

                    </ScrollView>

                </View >
                <View style={styles.footer}>
                    <View style={styles.add}>
                    <TouchableOpacity onPress={this.handleIconPressHome} style={{flexDirection:'row'}}>
                        <AntDesign name="plus" size={20} color="black" />
                        <Text>Add New Booking</Text>
                        </TouchableOpacity>
                    </View>
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

    flex: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'column',
        marginHorizontal: 5,
        backgroundColor:'#c4fdf7'
    },
    card: {
        height: 180,
        width: 370,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'white',
        margin: 5,
        padding: 10,
    },
    info: {
        flex: 1,
        justifyContent: 'space-between',
    },
    wash: {
        flexDirection: 'row',
        // marginLeft: 10,
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 15
    },
    date: {
        height: 70,
        width: 55,
        backgroundColor: '#D3d3d3',
        fontSize: 16,
        padding: 5

    },
    datetext: {
        fontSize: 20,
        textAlign: 'center',
        margin: 8
    },
    btn3: {
        backgroundColor: '#D3d3d3',
        borderRadius: 20,
        width: 80,
        height: 30,
        textAlign: 'center',
        // margin: 4,
        padding: 4
    },
    btntext: {
        textAlign: 'center',
        margin: 4,

    },
    clock: {
        flexDirection: 'row',
        
        marginHorizontal: 20,
        // marginBottom: 10
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginHorizontal: 20,
    },
    btn1: {
        width: 160,
        height: 40,
        borderRadius: 8,
        // borderWidth: 1,
        backgroundColor:'#f8db03'
    },
    btn2: {
        width: 160,
        height: 40,
        borderRadius: 8,
        // borderWidth: 1,
        backgroundColor:'green'
    },
    buttontext: {
        color: 'black',
        fontSize: 15,
        textAlign: 'center',
        margin: 8
    },
    footer: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 5,
        alignItems: 'center',
    },
    add: {
        flexDirection: 'row',
        marginBottom: 15,
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

export default Upcoming; 
