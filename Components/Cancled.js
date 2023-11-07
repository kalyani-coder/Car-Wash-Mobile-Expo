import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
  
    ScrollView,
    Alert,
    Image
} from 'react-native';
import { Appearance } from 'react-native';
import { RefreshControl } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from 'moment';


const Canceled = ({ navigation }) => {
    const [data, setData] = useState([]);
    const colorScheme = Appearance.getColorScheme();
    const currentTime = new Date();
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            if (userId) {
                const response = await fetch(`https://car-wash-backend-api.onrender.com/api/bookings/clientId/${userId}/status/Declined`);
                if (response.ok) {
                    const data = await response.json();
                    setData(data);
                } else {
                    console.error('Failed to fetch data');
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        // Initial data fetch
        fetchData();

        // Polling interval (e.g., every 5 seconds)
        const pollingInterval = setInterval(() => {
            fetchData();
        }, 5000); // Adjust the interval as needed

        // Cleanup the interval on component unmount
        return () => clearInterval(pollingInterval);
    }, []);

    const handleCancelAppointment = (appointmentId) => {
        Alert.alert(
            'Confirm Cancellation',
            'Are you sure you want to cancel this appointment?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Confirm',
                    onPress: () => {
                        // Make a DELETE request to the API to cancel the appointment
                        fetch(`https://car-wash-backend-api.onrender.com/api/bookings/${appointmentId}`, {
                            method: 'DELETE',
                        })
                            .then((response) => {
                                if (response.ok) {
                                    
                                    const updatedData = data.filter((item) => item._id !== appointmentId);
                                    setData(updatedData);
                                } else {
                                    console.error('Failed to cancel appointment');
                                }
                            })
                            .catch((error) => {
                                console.error('Error canceling appointment:', error);
                            });
                    },
                },
            ]
        );
    };

   

    //for refreshing the field 

    const onRefresh = () => {
        
        setRefreshing(true);
  
        setTimeout(() => {
          
          setRefreshing(false);
        }, 2000); 
      };

   
    const commonStyles = {
       
        color: colorScheme === 'dark' ? '#fff' : '#000',
      };

    return (
        <>
            <View style={[styles.header,commonStyles]}>
                <ScrollView
                    Vertical={true}
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1 }}
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
                     <View style={styles.container}>
                        {data.map((item) => (
                            <View key={item._id} style={styles.card}>
                                <View style={styles.cardContent}>
                                    <Image
                                        source={{
                                            uri:
                                                'https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/images/car-reviews/first-drives/legacy/rolls_royce_phantom_top_10.jpg?itok=XjL9f1tx',
                                        }}
                                        style={styles.image}
                                    />
                                    <View style={styles.details}>
                                        <Text style={styles.serviceName}>{item.servicesName}</Text>
                                        <Text style={styles.date}>
                                            {moment(item.date, 'DD-MM-YYYY').format('DD-MM-YYYY')}
                                        </Text>
                                        <Text style={styles.clock}>Time: {item.time}</Text>
                                        <Text style={styles.price}>Rs. {item.totalPrice}</Text>
                                    </View>



                                </View>
                                <View style={styles.buttonContainer}>
                                    <Text style={styles.status}>
                                        {item.status}
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => handleCancelAppointment(item._id)} // Pass the appointment ID to the handler
                                    >
                                        <Text style={styles.buttonText}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>

                   

                </ScrollView>

              
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        flex: 1,
        backgroundColor: '#D8D8D8',
    },
    container: {
        flex: 1,
        paddingHorizontal: 10,
        // paddingVertical: 10,
    },
    card: {
        flexDirection: 'column',
        backgroundColor: 'white',
        height: 200,
        width: 370,
        marginVertical: 8,
        borderRadius: 10,
        elevation: 2, // Add shadow for Android
        shadowColor: 'rgba(0, 0, 0, 0.2)', // Add shadow for iOS
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
       
    },
    image: {
        width: 120,
        height: 130,
        resizeMode: 'cover',
        borderRadius: 10,
        margin: 10,
    },
    details: {
        flex: 1,
        marginRight: 10,
    },
    serviceName: {
        fontSize: 15,
        marginBottom: 5,
    },
    date: {
        fontSize: 15,
        marginTop: 5,
    },
    clock: {
        fontSize: 15,
        marginTop: 5,
    },
    price: {
        fontSize: 15,
        marginTop: 5,
    },
  
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly', // Change to 'space-evenly' for even spacing
        marginLeft: 130
    },
    status:{
        backgroundColor: '#FCAE1E',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
      
    },
    button: {
        backgroundColor: '#FF2E2E',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },

    buttonText: {
        color: 'black',
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },
   
});
export default Canceled;
