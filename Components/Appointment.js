
import React, { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Upcoming from './Upcoming';
import Cancled from './Cancled';
import Completed from './Completed';
import { View, Text, TouchableOpacity, StyleSheet, Linking, } from 'react-native'; // Import necessary components
import { Appearance } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { RefreshControl } from 'react-native';



const Tab = createMaterialTopTabNavigator();

const Appointment = ({ navigation }) => {

  const colorScheme = Appearance.getColorScheme();


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
    <View style={[styles.header, commonStyles]}>
      <Tab.Navigator
        initialRouteName="Upcoming"
        screenOptions={{
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'grey',
          tabBarStyle: {
            backgroundColor: '#fff',
            elevation: 0, 
            borderBottomColor: 'gray',
          },
          tabBarLabelStyle: {
            fontSize: 14, 
          },
          tabBarIndicatorStyle: {
            backgroundColor: 'black', 
            height: 1, 
          },
         
        }}
      >
        <Tab.Screen name="Upcoming" component={Upcoming} options={{ tabBarLabel: 'Upcoming' }} />
        <Tab.Screen name="Completed" component={Completed} options={{ tabBarLabel: 'Completed' }} />
        <Tab.Screen name="Canceled" component={Cancled} options={{ tabBarLabel: 'Canceled' }} />
      </Tab.Navigator>

      {/* Footer */}
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
              <Entypo name="home" size={30} style={styles.icon4}/>
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
  );
};
const styles = StyleSheet.create({
  header: {
    flex: 1
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
    borderTopColor: 'gray',
    borderWidth: 0.5

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

export default Appointment;
