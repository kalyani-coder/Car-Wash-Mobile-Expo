import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './Components/Login';
import Otp from './Components/Otp';
import Home from './Components/Home';
import Booknow from './Components/Booknow'
import BookConfirmation from './Components/BookConfirmation'
import Appointment from './Components/Appointment';
import Upcoming from './Components/Upcoming';
import Completed from './Components/Completed';
import Cancled from './Components/Cancled';
import Washing from './Components/Washing';
import Confirmation from './Components/Confirmation';
import Notification from './Components/Notification';
import Confirm from './Components/Confirm';
import Profile from './Components/Profile';
import Signup from './Components/Signup';
import Promotion from './Components/Promotion';
import PromotionConfirmation from './Components/PromotionConfirmation';
import Topservice from './Components/Topservice';
import Topserviceconfirmation from './Components/Topserviceconfirmation';
import Review from './Components/Review';
import Editprofile from './Components/Editprofile';
// 


const Stack = createStackNavigator();

function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer theme={{ colors: { background: 'white' } }} fallback={<Text>Loading...</Text>}>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Otp" component={Otp} options={{ headerShown: false }} />
          <Stack.Screen name="Appointment" component={Appointment} options={{ headerShown: false }} />
          <Stack.Screen name="Upcoming" component={Upcoming} options={{ headerShown: false }} />
          <Stack.Screen name="Completed" component={Completed} options={{ headerShown: false }} />
          <Stack.Screen name="Cancled" component={Cancled} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Washing" component={Washing} options={{ headerShown: false }} />
          <Stack.Screen name="Confirmation" component={Confirmation} options={{ headerShown: false }} />
          <Stack.Screen name="Promotion" component={Promotion} options={{ headerShown: false }} />
          <Stack.Screen name="Review" component={Review} options={{ headerShown: false }} />
          <Stack.Screen name="Editprofile" component={Editprofile} options={{ headerShown: false }} />
          <Stack.Screen
            name="PromotionConfirmation"
            component={PromotionConfirmation}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Topservice" component={Topservice} options={{ headerShown: false }} />
          <Stack.Screen
            name="Topserviceconfirmation"
            component={Topserviceconfirmation}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Booknow" component={Booknow} options={{headerShown:false}}/>
          <Stack.Screen name="BookConfirmation" component={BookConfirmation} options={{headerShown:false}}/>
          <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
          <Stack.Screen name="Confirm" component={Confirm} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  
  },
});

export default App;

