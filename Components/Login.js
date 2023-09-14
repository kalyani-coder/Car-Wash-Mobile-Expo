import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,

} from 'react-native'


// #f7db03 YELLOW
//#006b51 DARK GREEN
//#c4fcf7 FAINT GREEN
// #659b9c MADIUM GREEN

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      phoneNumberError: '',
      clientPhoneNumber: '',
      apiResponse: [],
    }
  };

  componentDidMount() {
    // Fetch the client's phone number from your API here
    this.fetchAPIResponse();
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

  //for signup 
  handleIconPressSignup = () => {
    this.props.navigation.navigate('Signup'); // Navigate to the Signup screen
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
  handleLogin = () => {
    const { phoneNumber, apiResponse } = this.state;
    // const { clientPhone} = this.state;

    // Reset error message
    this.setState({ phoneNumberError: '' });

    const isPhoneNumberValid = apiResponse.some((element) => (element.clientPhone === phoneNumber));
    // if (isPhoneNumberValid) {
      if (phoneNumber.length === 10) {
        const generatedOTP = Math.floor(1000 + Math.random() * 9000);
        this.props.navigation.navigate('Otp', { phoneNumber, generatedOTP });
      }
      else {
        this.setState({ phoneNumberError: '* phone number should be 10 digit' });
      }
    // }
    //   else {
    //     this.setState({ phoneNumberError: '* Phone numbers do not match' });
    //   }
    

    // Proceed with your logic here
    console.log(`Phone number: ${phoneNumber}`);
  };
  render() {
    const { phoneNumber, phoneNumberError } = this.state;


    return (
      <>
        {/* <Text>Set up your Account</Text> */}
        {/* <Text style={styles.log}>Log in</Text> */}

        <View style={styles.container}>
          {/* <Text style={{fontSize:20}}>Set up your Account</Text> */}

          <Text style={styles.name}>Enter your phone number</Text>
          <TextInput
            style={styles.textBox}
            placeholder="Enter Phone Number"
            onChangeText={this.handlePhoneNumberChange}
            value={phoneNumber}
            keyboardType={'numeric'}
            maxLength={10}
          >
          </TextInput>
          {phoneNumberError !== '' && <Text style={styles.errorText}>{phoneNumberError}</Text>}

          <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
          <Text style={styles.sign}>By signing up,you agree to GoGoRide's </Text>

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
    marginHorizontal: 30,

  },

  name: {
    fontSize: 20,
    // marginHorizontal: 30,
    paddingTop: 40,
    marginTop: 10,
    color: 'black',
  },
  textBox: {
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 2,
    padding: 10,
    // marginHorizontal: 30,
    marginTop: 20,

  },
  button: {
    backgroundColor: '#5B7586',
    height: 50,
    paddingTop: 10,
    // marginHorizontal: 30,
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
    paddingTop: 200

  },
  service: {
    color: 'blue',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    // marginHorizontal: 30,
  },
  account: {
    flexDirection: 'row',
    marginTop: 150,
    marginHorizontal: 60,
  },
  text: {
    textAlign: 'center',
    fontSize: 15
  },
  login: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontSize: 15
  }

})
export default Login;



