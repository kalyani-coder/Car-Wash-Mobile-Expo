import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      phoneNumberError: '',
      apiResponse: [],
    };
  }

  componentDidMount() {
    // Fetch the client's phone number from your API here
    this.props.navigation.addListener('focus', () => {
      this.fetchAPIResponse();
    });
  }

  fetchAPIResponse = async () => {
    try {
      // Make an API request to fetch data
      const response = await fetch('https://car-wash-backend-api.onrender.com/api/clients');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      // Set the API response object in the state
      this.setState({ apiResponse: data });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  handlePhoneNumberChange = (text) => {
    // Remove non-numeric characters from the input
    const numericValue = text.replace(/[^0-9]/g, '');

    // Limit the input to 10 characters
    if (numericValue.length > 10) {
      return;
    }

    // Update the state with the validated input
    this.setState({ phoneNumber: numericValue, phoneNumberError: '' });
  };

  handleLogin = async () => {
    const { phoneNumber, apiResponse } = this.state;

    // Reset error message
    this.setState({ phoneNumberError: '' });

    if (phoneNumber.length === 10) {
      const user = apiResponse.find(
        (element) => element.clientPhone === parseInt(phoneNumber)
      );

      if (user) {
        // Valid phone number, navigate to OTP screen
        const generatedOTP = Math.floor(1000 + Math.random() * 9000);

        // Store user data in AsyncStorage
        try {
          await AsyncStorage.setItem('userId', user._id);
          await AsyncStorage.setItem('phoneNumber', this.state.clientPhone);
        } catch (error) {
          console.error('Error storing user data:', error);
        }

        this.props.navigation.navigate('Otp', {
          phoneNumber,
          generatedOTP,
        });
      } else {
        this.setState({ phoneNumberError: '* Phone number not found' });
      }
    } else {
      this.setState({ phoneNumberError: '* Phone number should be 10 digits' });
    }
  };

  handleIconPressSignup = () => {
    this.props.navigation.navigate('Signup'); // Navigate to the Signup screen
  };

  render() {
    const { phoneNumber, phoneNumberError } = this.state;

    return (
      <>
        <View style={styles.container}>
          <Text style={styles.name}>Enter your phone number</Text>
          <TextInput
            style={styles.textBox}
            placeholder="Enter Phone Number"
            onChangeText={this.handlePhoneNumberChange}
            value={phoneNumber}
            keyboardType={'numeric'}
            maxLength={10}
          />
          {phoneNumberError !== '' && (
            <Text style={styles.errorText}>{phoneNumberError}</Text>
          )}

          <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>

          <Text style={styles.sign}>
            By signing up, you agree to GoGoRide's{' '}
          </Text>

          <TouchableOpacity>
            <Text style={styles.service}>Terms of Service and Privacy Policy</Text>
          </TouchableOpacity>

          <View style={styles.account}>
            <Text style={styles.text}>Don't have an account? </Text>
            <TouchableOpacity onPress={this.handleIconPressSignup}>
              <Text style={styles.login}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c4fdf7',
  },

  name: {
    fontSize: 20,
    paddingTop: 100,
    marginTop: 10,
    color: 'black',
    marginHorizontal: 30,
  },
  textBox: {
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 2,
    padding: 10,
    marginHorizontal: 30,
    marginTop: 20,
  },
  button: {
    backgroundColor: '#006b51',
    height: 50,
    paddingTop: 10,
    marginHorizontal: 30,
    marginTop: 15,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sign: {
    textAlign: 'center',
    paddingTop: 200,
  },
  service: {
    color: 'blue',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginHorizontal: 30,
  },
  account: {
    flexDirection: 'row',
    marginTop: 150,
    marginHorizontal: 90,
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
  },
  login: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontSize: 15,
  },
});

export default Login;
