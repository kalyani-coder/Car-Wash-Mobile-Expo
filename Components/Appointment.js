import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Upcoming from './Upcoming';
import Cancled from './Cancled';
import Completed from './Completed';

const Tab = createMaterialTopTabNavigator();

const Appointment = () => {
  return (
    <Tab.Navigator
      initialRouteName="Upcoming"
      screenOptions={{
        
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'grey',
        tabBarStyle: {
          backgroundColor: '#fff', 
        },
        
      }}>
      <Tab.Screen name="Upcoming" component={Upcoming} options={{ tabBarLabel: 'Upcoming' }} />
      <Tab.Screen name="Completed" component={Completed} options={{ tabBarLabel: 'Completed' }} />
      <Tab.Screen name="Canceled" component={Cancled} options={{ tabBarLabel: 'Canceled' }} />
    </Tab.Navigator>
  );
};

export default Appointment;
