import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Signup = ({ navigation }) => {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientAddress: '',
  });

  const handleSubmit = async () => {
    if (validateFields()) {
      const requestBody = {
        clientName,
        clientEmail,
        clientPhone,
        clientAddress,
      };

      const isPhoneRegistered = await checkPhoneUniqueness(clientPhone);

      if (isPhoneRegistered) {
        setErrors({ ...errors, clientPhone: '*Phone number is already registered' });
        return;
      }

      try {
        const response = await fetch('https://car-wash-backend-api.onrender.com/api/clients', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const userEmail = clientEmail;

        try {
          await AsyncStorage.setItem('userEmail', userEmail);
        } catch (error) {
          console.error('Error storing user email:', error);
        }

        navigation.navigate('Login');
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const checkPhoneUniqueness = async (phone) => {
    try {
      const response = await fetch('https://car-wash-backend-api.onrender.com/api/clients', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const isPhoneRegistered = data.some((client) => client.clientPhone === parseInt(phone));
        return isPhoneRegistered;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error checking phone number uniqueness:', error);
      return false;
    }
  };

  const validateFields = () => {
    const errors = {};

    if (!clientName) {
      errors.clientName = 'Client Name is required.';
    }

    if (!clientEmail) {
      errors.clientEmail = 'Client Email is required.';
    } else {
      const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailPattern.test(clientEmail)) {
        errors.clientEmail = 'Invalid Client Email.';
      }
    }

    if (!clientPhone) {
      errors.clientPhone = 'Client Phone Number is required.';
    } else {
      const phonePattern = /^[0-9]{10}$/;
      if (!phonePattern.test(clientPhone)) {
        errors.clientPhone = 'Invalid Client Phone Number.';
      }
    }

    if (!clientAddress) {
      errors.clientAddress = 'Client Address is required.';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>
  
      {/* Full Name */}
      <Text style={styles.label}>Enter Full Name<Text style={styles.required}> *</Text></Text>
      <TextInput
        placeholder="Full Name"
        placeholderTextColor="#000"
        onChangeText={(text) => setClientName(text)}
        value={clientName}
        // onBlur={validateclientName}
        style={styles.input}
      />
      <Text style={styles.errorText}>{errors.clientName}</Text>
  
      {/* Email */}
      <Text style={styles.label}>Enter Email<Text style={styles.required}> *</Text></Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#000"
        onChangeText={(text) => {
          setClientEmail(text);
          setErrors({ ...errors, clientEmail: '' });
        }}
        value={clientEmail}
        // onBlur={validateclientEmail}
        style={styles.input}
      />
      <Text style={styles.errorText}>{errors.clientEmail}</Text>
  
      {/* Phone Number */}
      <Text style={styles.label}>Enter Phone Number<Text style={styles.required}> *</Text></Text>
      <TextInput
        placeholder="Phone Number"
        placeholderTextColor="#000"
        onChangeText={(text) => {
          setClientPhone(text);
          setErrors({ ...errors, clientPhone: '' });
        }}
        value={clientPhone}
        // onBlur={validateclientPhone}
        keyboardType="numeric"
        maxLength={10}
        style={styles.input}
      />
      <Text style={styles.errorText}>{errors.clientPhone}</Text>
  
      {/* Address */}
      <Text style={styles.label}>Enter Address<Text style={styles.required}> *</Text></Text>
      <TextInput
        placeholder="Address"
        placeholderTextColor="#000"
        onChangeText={(text) => setClientAddress(text)}
        value={clientAddress}
        // onBlur={validateclientAddress}
        style={styles.input}
      />
      <Text style={styles.errorText}>{errors.clientAddress}</Text>
  
      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
    backgroundColor: '#a7a7a7',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  required: {
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#5B7586',
    height: 50,
    paddingTop: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Signup;
