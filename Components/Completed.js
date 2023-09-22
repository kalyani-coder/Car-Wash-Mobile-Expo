
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


class Completed extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTime: new Date(), //for time

            //for button 
            isButton1Pressed: false,
            isButton2Pressed: false,
            isButton3Pressed: false,
            isButton4Pressed: false,
            isButton5Pressed: false,
            isButton6Pressed: false,
        };
    }
    //for time

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({ currentTime: new Date() });
        }, 60000); // Update every minute
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    formatTime = (date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;  // Convert to 12-hour format
        return `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
    };

    //for date
    onDayPress = (day) => {
        this.setState({
            selectedDate: day.dateString,
        });
    };

    //for button

    handleButtonPress = (buttonName) => {
        this.setState({
            isButton1Pressed: buttonName === 'button1',
            isButton2Pressed: buttonName === 'button2',
            isButton3Pressed: buttonName === 'button3',
            isButton4Pressed: buttonName === 'button4',
            isButton5Pressed: buttonName === 'button5',
            isButton6Pressed: buttonName === 'button6',
        });
    };

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
        const formattedTime = this.formatTime(this.state.currentTime);
        const { isButton1Pressed, isButton2Pressed, isButton3Pressed, isButton4Pressed, isButton5Pressed, isButton6Pressed } = this.state;
        // for date
        const currentDate = moment();
        const formattedDate = currentDate.format('D MMM');
        //for booking icon
        const { navigation } = this.props;


        return (
            <>

                 <View style={styles.flex}>
                    <ScrollView
                        Vertical={true}
                        showsVerticalScrollIndicator={false}
                        style={{flex:1}}
                    >
                      {/*  <View style={{ height: 180, width: 380, backgroundColor: '#E5E5E5', borderWidth: 2, borderColor: 'white' }}>
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
                        </View>

                        <View style={{ height: 180, width: 380, backgroundColor: '#E5E5E5', borderWidth: 2, borderColor: 'white' }}>
                            <View style={styles.wash}>
                                <TouchableOpacity style={styles.date}>
                                    <Text style={styles.datetext}>{formattedDate}</Text>
                                </TouchableOpacity>
                                <Text>Detailing</Text>
                                <TouchableOpacity style={styles.btn3}>
                                    <Text style={styles.btntext}>Pending</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.clock}>
                                <EvilIcons name="clock" size={24} color="black" />
                                <Text>{formattedTime}</Text>
                            </View>

                            <View style={styles.button}>
                                <TouchableOpacity onPress={() => this.handleButtonPress('button3')}
                                    style={[
                                        styles.btn1,
                                        { backgroundColor: isButton3Pressed ? 'grey' : 'white' },
                                    ]}
                                    underlayColor="grey">
                                    <Text style={styles.buttontext}>Reschedule</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.handleButtonPress('button4')}
                                    style={[
                                        styles.btn2,
                                        { backgroundColor: isButton4Pressed ? 'grey' : 'white' },
                                    ]}
                                    underlayColor="grey">
                                    <Text style={styles.buttontext}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ height: 180, width: 380, backgroundColor: '#E5E5E5', borderWidth: 2, borderColor: 'white' }}>
                            <View style={styles.wash}>
                                <TouchableOpacity style={styles.date}>
                                    <Text style={styles.datetext}>{formattedDate}</Text>
                                </TouchableOpacity>
                                <Text>Meeting Title</Text>
                                <TouchableOpacity style={styles.btn3}>
                                    <Text style={styles.btntext}>Pending</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.clock}>
                                <EvilIcons name="clock" size={24} color="black" />
                                <Text>{formattedTime}</Text>
                            </View>
                            <View style={styles.button}>
                                <TouchableOpacity onPress={() => this.handleButtonPress('button5')}
                                    style={[
                                        styles.btn1,
                                        { backgroundColor: isButton5Pressed ? 'grey' : 'white' },
                                    ]}
                                    underlayColor="grey">
                                    <Text style={styles.buttontext}>Reschedule</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.handleButtonPress('button6')}
                                    style={[
                                        styles.btn2,
                                        { backgroundColor: isButton6Pressed ? 'grey' : 'white' },
                                    ]}
                                    underlayColor="grey">
                                    <Text style={styles.buttontext}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ height: 180, width: 380, backgroundColor: '#E5E5E5', borderWidth: 2, borderColor: 'white' }}>
                            <View style={styles.wash}>
                                <TouchableOpacity style={styles.date}>
                                    <Text style={styles.datetext}>{formattedDate}</Text>
                                </TouchableOpacity>
                                <Text>Meeting Title</Text>
                                <TouchableOpacity style={styles.btn3}>
                                    <Text style={styles.btntext}>Pending</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.clock}>
                                <EvilIcons name="clock" size={24} color="black" />
                                <Text>{formattedTime}</Text>
                            </View>
                            <View style={styles.button}>
                                <TouchableOpacity onPress={() => this.handleButtonPress('button5')}
                                    style={[
                                        styles.btn1,
                                        { backgroundColor: isButton5Pressed ? 'grey' : 'white' },
                                    ]}
                                    underlayColor="grey">
                                    <Text style={styles.buttontext}>Reschedule</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.handleButtonPress('button6')}
                                    style={[
                                        styles.btn2,
                                        { backgroundColor: isButton6Pressed ? 'grey' : 'white' },
                                    ]}
                                    underlayColor="grey">
                                    <Text style={styles.buttontext}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>*/}
                    </ScrollView>
                
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
                </View> 


            </>
        );
    }
}
const styles = StyleSheet.create({
    // flex: {
    //     flex: 1,
    //     justifyContent: 'space-between',
    //     flexDirection: 'column',
    //     marginHorizontal: 5,
    //     marginVertical: 15
    // },

    // // iconsContainer: {
    // //     flexDirection: 'row',
    // //     alignItems: 'center',
    // //     marginHorizontal: 55
    // // },
    // icon: {
    //     marginHorizontal: 20,
    // },
    // wash: {
    //     flexDirection: 'row',
    //     margin: 10,
    //     justifyContent: 'space-between',
    //     marginHorizontal: 20,
    //     marginVertical: 15
    // },
    // date: {
    //     height: 70,
    //     width: 55,
    //     backgroundColor: '#D3d3d3',
    // },
    // datetext: {
    //     fontSize: 15,
    //     textAlign: 'center',
    //     margin: 8


    // },
    // btn3: {
    //     backgroundColor: '#D3d3d3',
    //     borderRadius: 20,
    //     width: 80,
    //     height: 30,
    // },
    // btntext: {
    //     textAlign: 'center',
    //     margin: 4,

    // },
    // clock: {
    //     flexDirection: 'row',
    //     justifyContent: 'flex-end',
    //     marginHorizontal: 20,
    //     marginBottom: 10
    // },
    // button: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     marginHorizontal: 20,
    // },
    // btn1: {
    //     width: 160,
    //     height: 40,
    //     borderRadius: 8,
    //     borderWidth: 1,
    //     borderColor: 'grey',
    // },
    // btn2: {
    //     width: 160,
    //     height: 40,
    //     borderRadius: 8,
    //     borderWidth: 1,
    //     borderColor: 'grey',
    // },
    // buttontext: {
    //     color: 'black',
    //     fontSize: 15,
    //     textAlign: 'center',
    //     margin: 8
    // },
    // text4: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',

    //     alignItems: 'center',
    //     marginHorizontal: 75

    // },
    // text5: {
    //     fontSize: 10,
    // },
    flex:{
        flex:1,
        backgroundColor:'#a7a7a7'

    },
    footer: {
        position: 'fixed',
        marginTop:'155%',
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

export default Completed; 
