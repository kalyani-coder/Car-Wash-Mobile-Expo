import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const Otp = ({ route, navigation }) => {
  // Define state variables using the useState hook
  const [enteredOTP, setEnteredOTP] = useState('');
  const [otpError, setOtpError] = useState('');
  const [generatedOTP1, setGeneratedOTP1] = useState('');
  const { generatedOTP } = route.params;

  useEffect(() => {
    generateOTP();
  }, []);

  // Function to generate a random 4-digit OTP
  const generateOTP = () => {
    const newOTP = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOTP1(newOTP);
  };

  // Function to handle OTP verification
  const handleVerifyOTP = () => {
    const { generatedOTP } = route.params;

    if (enteredOTP === generatedOTP.toString() || enteredOTP === generatedOTP1.toString()) {
      // OTP verification successful, navigate to the next screen
      navigation.navigate('Home');
    } else {
      // Show an error message for incorrect OTP
      setOtpError('Enter the correct OTP');
    }
  };

  return (
    <>
      <View style={styles.container}>
      <Text style={styles.generatedOTP}>Generated OTP: {generatedOTP}</Text>
      <Text style={styles.generatedOTP}>Regenerated OTP: {generatedOTP1}</Text>
        
        <Text style={styles.log}>Verify OTP</Text>

        <Text style={styles.name}>Enter OTP</Text>
        <TextInput
          style={styles.textBox}
          placeholder="Enter OTP"
          placeholderTextColor='#000'
          keyboardType={'numeric'}
          maxLength={6}
          onChangeText={text => setEnteredOTP(text)}
        />
        {otpError !== '' && <Text style={styles.errorText}>{otpError}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={generateOTP}>
          <Text style={styles.service}>Resend OTP?</Text>
        </TouchableOpacity>

        <Text style={{ textAlign: 'center', paddingTop: 30,marginHorizontal:20 }}>
          By signing up, you agree to GoGoRide's Terms of Service and Privacy Policy
        </Text>

        {/* <View style={styles.account}>
          <Text style={styles.text}>Already have an account? </Text>
          <TouchableOpacity>
            <Text style={styles.login}>Log in</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: '#a7a7a7',
  },
  log: {
    textAlign: 'center',
    fontSize: 25,
    paddingTop: 50,
    paddingBottom: 50,
  },
  name: {
    fontSize: 20,
    marginHorizontal: 30,
    paddingTop: 10,
    color: 'black',
  },
  textBox: {
    borderColor: 'grey',
    backgroundColor: 'white',
    borderRadius:6,
    borderWidth: 2,
    padding: 10,
    marginHorizontal: 30,
    marginTop: 20,
  },
  button: {
    backgroundColor: '#5B7586',
    height: 50,
    paddingTop: 10,
    marginHorizontal: 30,
    marginTop: 25,
    borderRadius: 4,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginHorizontal: 30,
  },
  service: {
    color: 'blue',
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginVertical: 5,
  },
  account: {
    flexDirection: 'row',
    marginTop: 200,
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

export default Otp;
