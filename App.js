import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';




import Login from './Components/Login';
import Otp from './Components/Otp';
import Home from './Components/Home';
import Appointment from './Components/Appointment';
import Washing from './Components/Washing';
import Confirmation from './Components/Confirmation';
import Notification from './Components/Notification';
import Confirm from './Components/Confirm';
import Profile from './Components/Profile';
import Signup from './Components/Signup';
import AddressPicker from './Components/AddressPicker';



const Stack = createStackNavigator();

function App() {
  return (

    <View style={styles.container}>
      <NavigationContainer theme={{ colors: { background: 'white' } }}
        fallback={<Text>Loading...</Text>}>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
          <Stack.Screen name="Otp" component={Otp} options={{ headerShown: false }}/>
          <Stack.Screen name="Appointment" component={Appointment} options={{ headerShown: false }}/>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
          <Stack.Screen name="Washing" component={Washing} options={{ headerShown: false }}/>
          <Stack.Screen name="Confirmation" component={Confirmation} options={{ headerShown: false }}/>
          <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }}/>
          <Stack.Screen name="Confirm" component={Confirm} options={{ headerShown: false }}/>
          <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
          <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }}/>

        </Stack.Navigator>
      
      </NavigationContainer> 
    {/* initialRouteName="Login" */}
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:30,
    // backgroundColor:'#82EEFD'
  },
});
export default App;
