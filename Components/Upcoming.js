

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { Appearance } from 'react-native';
import { RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Upcoming = ({ navigation }) => {
  const [data, setData] = useState([]);
  const colorScheme = Appearance.getColorScheme();
  const currentTime = new Date();
  const route = useRoute();
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        const response = await fetch(
          `https://car-wash-backend-api.onrender.com/api/bookings/clientId/${userId}`
        );
        if (response.ok) {
          const allData = await response.json();

          // Filter the data based on status
          const filteredData = allData.filter(
            (item) => item.status === 'Accepted' || item.status === ''
          );

          setData(filteredData);
        } else {
          console.error('Failed to fetch data');
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  //for refreshing the field 

  const onRefresh = () => {
        
    setRefreshing(true);

    setTimeout(() => {
      
      setRefreshing(false);
    }, 2000); 
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

  const updatedAppointment = route.params?.updatedAppointment;

  // Check if updatedAppointment exists and update the local state
  if (updatedAppointment) {
    setData((prevData) =>
      prevData.map((item) =>
        item._id === updatedAppointment._id ? updatedAppointment : item
      )
    );
  }

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
            fetch(
              `https://car-wash-backend-api.onrender.com/api/bookings/${appointmentId}`,
              {
                method: 'DELETE',
              }
            )
              .then((response) => {
                if (response.ok) {
                  // Appointment was successfully canceled
                  // You may want to update your local state to remove the canceled appointment
                  const updatedData = data.filter(
                    (item) => item._id !== appointmentId
                  );
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
    navigation.navigate('Appointment');
  };
  const handleTrack = () => {
    navigation.navigate('DeliveryScreen');
  };


  const openSettings = async () => {
    try {
      await Linking.openSettings();
    } catch (error) {
      console.error('Error opening settings:', error);
    }
  };

  const commonStyles = {
    // backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
    color: colorScheme === 'dark' ? '#fff' : '#000',
  };

  return (
    <>
      <View style={[styles.header, commonStyles]}>
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
                <View style={styles.wash}>
                  <Text style={styles.date}>
                    {moment(item.date, 'DD-MM-YYYY').format('D MMM')}
                  </Text>
                  <View>
                    <Text>{item.servicesName}</Text>
                    <Text>{item.totalPrice}</Text>
                  </View>
                  <Text
                    style={
                      item.status === 'Accepted'
                        ? styles.confirmedStatus
                        : styles.pendingStatus
                    }
                  >
                    {item.status == '' ? 'Pending' : item.status}
                  </Text>
                </View>

                {/* <Text style={styles.clock}>Time: {item.time}</Text> */}

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>
                  <Text style={styles.clock}>Time:{item.time}</Text>
                  <TouchableOpacity style={styles.reviews} onPress={handleTrack}>
                    <Text style={{ padding: 4, textAlign: 'center' }}>Track</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.button}>
                  {item.status === 'Accepted' ? (
                    <>
                      <TouchableOpacity
                        style={styles.btn1}
                      >
                        <Text style={styles.buttontext}>No Reschedule</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.btn2}
                        onPress={() => handleCancelAppointment(item._id)}
                      >
                        <Text style={styles.buttontext}>Cancel</Text>
                      </TouchableOpacity>
                    </>

                  ) : (
                    <>
                      <TouchableOpacity
                        style={styles.btn1}
                        onPress={() => {
                          navigation.navigate('UpdateInfo', {
                            appointment: item,
                          });
                        }}
                      >
                        <Text style={styles.buttontext}>Reschedule</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.btn2}
                        onPress={() => handleCancelAppointment(item._id)}
                      >
                        <Text style={styles.buttontext}>Cancel</Text>
                      </TouchableOpacity>
                    </>
                  )}
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
    justifyContent: 'space-between',
    flexDirection: 'column',
    width: '100%',
  },
  card: {
    height: 180,
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
    marginVertical: 10,
  },
  date: {
    height: 70,
    width: 55,
    backgroundColor: 'white',
    fontSize: 17,
    padding: 8,
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
  confirmedStatus: {
    backgroundColor: 'green',
    borderRadius: 20,
    width: 80,
    height: 30,
    textAlign: 'center',
    padding: 4,
    color: '#000', // Text color for Confirmed
  },
  pendingStatus: {
    backgroundColor: 'orange',
    borderRadius: 20,
    width: 80,
    height: 30,
    textAlign: 'center',
    padding: 4,
    color: '#000', // Text color for Pending
  },
  btntext: {
    textAlign: 'center',
    margin: 4,
  },
  clock: {
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  reviews:{
    width: 100,
    height: 30,
    borderRadius: 4,
    backgroundColor:'skyblue',
    textAlign:'center',
    marginBottom:5
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

});

export default Upcoming;
