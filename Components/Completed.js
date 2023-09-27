import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Linking,
    ScrollView
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from 'moment';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


const Completed = ({ navigation }) => {
    const [data, setData] = useState([]);
    const currentTime = new Date();

    useEffect(() => {
        // Retrieve the user's ID from AsyncStorage
        AsyncStorage.getItem('userId')
            .then((userId) => {
                if (userId) {
                    // Make an API request to fetch data for the user's ID
                    fetch(`https://car-wash-backend-api.onrender.com/api/bookings/clientId/${userId}/status/Delivered`)
                        .then((response) => response.json())
                        .then((data) => {
                            setData(data);
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            })
            .catch((error) => {
                console.error('Error retrieving user ID:', error);
            });
    }, []);

    const handleIconPressNotification = () => {
        navigation.navigate('Notification');
    };

    const handleIconPressHome = () => {
        navigation.navigate('Home');
    };

    const handleIconPressService = () => {
        navigation.navigate('Washing');
    };

    const handleIconPressBook = () => {
        props.navigation.navigate('Appointment');
    };

    const openSettings = async () => {
        try {
            await Linking.openSettings();
        } catch (error) {
            console.error('Error opening settings:', error);
        }
    };

    return (
        <>
            <View style={styles.header}>
                <ScrollView
                    Vertical={true}
                    showsVerticalScrollIndicator={false}
                    style={{flex:1}}
                >
                    <View style={styles.container}>
                    {data.map((item) => (
                        <View key={item._id} style={styles.card}>
                            {/* console.log('Item ID:', item.id);  */}
                            <View style={styles.wash}>
                                <Text style={styles.date}>{moment(item.date).format('D MMM')}</Text>
                                <View>
                                    <Text>{item.servicesName}</Text>
                                    <Text>{item.totalPrice}</Text>
                                </View>
                                <Text style={styles.status}>
                                    {item.status}
                                </Text>

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
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <View style={styles.add}>
                        <TouchableOpacity onPress={handleIconPressHome} style={{ flexDirection: 'row' }}>
                            <AntDesign name="plus" size={20} color="black" />
                            <Text>Add New Booking</Text>
                        </TouchableOpacity>
                    </View>
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
};

const styles = StyleSheet.create({
    header: {
        flex: 1,
        backgroundColor: '#a7a7a7',
    },
    container:{
        justifyContent: 'space-between',
        flexDirection: 'column',
        width: '100%',
        
    },
    card: {
       
        height: 180,
        // width: '100%',
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
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 15,
    },
    date: {
        height: 70,
        width: 55,
        backgroundColor: 'white',
        fontSize: 16,
        padding: 5,
    },
    datetext: {
        fontSize: 20,
        textAlign: 'center',
        margin: 8,
    },
    btn3: {
        backgroundColor: '#D3d3d3',
        borderRadius: 20,
        width: 80,
        height: 30,
        textAlign: 'center',
        padding: 4,
    },
   status:{
    backgroundColor: 'green',
    borderRadius: 20,
    width: 80,
    height: 30,
    textAlign: 'center',
    padding: 4,
    color: '#000',
   },
    btntext: {
        textAlign: 'center',
        margin: 4,
    },
    clock: {
        flexDirection: 'row',
        marginHorizontal: 20,
        
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btn1: {
        width: 160,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#f8db03',
    },
    btn2: {
        width: 160,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#5B7586',
        color: 'white',
    },
    buttontext: {
        color: '#000',
        fontSize: 15,
        textAlign: 'center',
        margin: 8,
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
      add: {
        flexDirection: 'row',
        marginBottom: 15,
     
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

export default Completed;
