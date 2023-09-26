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
        // tabStyle: { width: 120 },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: 'transparent' },
        tabBarIndicatorStyle: { backgroundColor: 'yellow' },
      }}>
      <Tab.Screen name="Upcoming" component={Upcoming} options={{ tabBarLabel: 'Upcoming' }} />
      <Tab.Screen name="Completed" component={Completed} options={{ tabBarLabel: 'Completed' }} />
      <Tab.Screen name="Canceled" component={Cancled} options={{ tabBarLabel: 'Canceled' }} />
    </Tab.Navigator>
  );
};

export default Appointment;
