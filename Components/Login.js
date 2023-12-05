import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Appearance } from 'react-native';
import { Button as PaperButton, Text as PaperText, Provider as PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';

const Login = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [apiResponse, setApiResponse] = useState([]);
  const colorScheme = Appearance.getColorScheme();

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
       
        'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),

      });
    };

    loadFonts();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchAPIResponse();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    // Check if a user ID is stored in AsyncStorage
    AsyncStorage.getItem('userId')
      .then((userId) => {
        if (userId) {
          // If the user is already registered, navigate to the Home page
          navigation.navigate('Home');
        }
      })
      .catch((error) => {
        console.error('Error checking AsyncStorage:', error);
      });
  }, [navigation]);

  const fetchAPIResponse = async () => {
    try {
      const response = await fetch(
        'https://car-wash-backend-api.onrender.com/api/clients'
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setApiResponse(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePhoneNumberChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');

    if (numericValue.length <= 10) {
      setPhoneNumber(numericValue);
      setPhoneNumberError('');
    }
  };

  const handleLogin = async () => {
    setPhoneNumberError('');


    if (phoneNumber.length === 10) {
      const user = apiResponse.find(
        (element) => element.clientPhone === parseInt(phoneNumber)
      );

      if (user) {
        const generatedOTP = Math.floor(1000 + Math.random() * 9000);

        try {
          await AsyncStorage.setItem('userId', user._id);
        } catch (error) {
          console.error('Error storing user data:', error);
        }

        navigation.navigate('Otp', {
          phoneNumber,
          generatedOTP,
        });
      } else {
        setPhoneNumberError('* Phone number not found');
      }
    } else {
      setPhoneNumberError('* Phone number should be 10 digits');
    }
  };



  const handleIconPressSignup = () => {
    navigation.navigate('Signup');
  };
  const commonStyles = {

    color: colorScheme === 'dark' ? '#fff' : '#000',
  };
  return (
    <>
      <View style={[styles.container, commonStyles]}>
        <Text style={styles.log}>Log In</Text>
        <Text style={styles.name}>Phone Number</Text>
        <TextInput
          style={styles.textBox}
          placeholder="Enter Your Phone Number"
          placeholderTextColor='#000'
          onChangeText={handlePhoneNumberChange}
          value={phoneNumber}
          keyboardType={'numeric'}
          maxLength={10}
        />
        {phoneNumberError !== '' && (
          <Text style={styles.errorText}>{phoneNumberError}</Text>
        )}

        <PaperButton style={styles.button} onPress={handleLogin}>
          <PaperText style={styles.buttonText}>Continue</PaperText>
        </PaperButton>

        <Text style={styles.sign}>By signing up, you agree to GoRide's </Text>

        <TouchableOpacity>
          <Text style={styles.service}>Terms of Service and Privacy Policy</Text>
        </TouchableOpacity>

        <View style={styles.account}>
          <Text style={styles.text}>Don't have an account? </Text>
          <TouchableOpacity onPress={handleIconPressSignup}>
            <Text style={styles.login}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#D8D8D8',
  },
  log: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    marginTop: 30,
    color: 'black',
    textAlign: 'center'

  },

  name: {
    fontSize: 18,
    paddingTop: 100,
    marginTop: 10,
    color: 'black',
    marginHorizontal: 30,
    fontFamily: 'Roboto-Bold'
  },
  textBox: {
    borderColor: 'grey',
    backgroundColor: 'white',
    borderRadius: 6,
    borderWidth: 2,
    padding: 10,
    marginHorizontal: 30,
    marginTop: 20,
  },
  button: {
    backgroundColor: '#5B7586',
    height: 50,
    paddingTop: 5,
    marginHorizontal: 30,
    marginTop: 15,
    borderRadius: 4,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Roboto-Bold',

    textAlign: 'center',
  },
  sign: {
    textAlign: 'center',
    paddingTop: 200,
    fontWeight: 'bold',
  },
  service: {
    color: 'blue',
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginHorizontal: 30,
  },
  account: {
    flexDirection: 'row',
    marginTop: 100,
    marginHorizontal: 90,
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  login: {
    fontWeight: 'bold',
    color: 'blue',
    textDecorationLine: 'underline',
    fontSize: 15,
  },
});

export default Login;
