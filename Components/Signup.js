


import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      clientAddress: '',
      errorMessage: '',
      errors: {
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        clientAddress: '',
      },
    };
  }

  handleSubmit = async () => {
    if (this.validateFields()) {
      const requestBody = {
        clientName: this.state.clientName,
        clientEmail: this.state.clientEmail,
        clientPhone: this.state.clientPhone,
        clientAddress: this.state.clientAddress,
      };

      // Check if the phone number is already registered
      const isPhoneRegistered = await this.checkPhoneUniqueness(this.state.clientPhone);

      if (isPhoneRegistered) {
        // Phone number is already registered, display an error message
        this.setState({ errors: { ...this.state.errors, clientPhone: '*Phone number is already registered' } });
        return; // Exit the function to prevent further processing
      }

      // Phone number is not registered, proceed with registration
      try {
        // Perform the registration or API call for registration here.
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

        // Assuming a successful signup
        const { clientEmail } = this.state;

        try {
          // Store the user's email in AsyncStorage
          await AsyncStorage.setItem('userEmail', clientEmail);
          // Continue with other actions, such as navigation
        } catch (error) {
          console.error('Error storing user email:', error);
        }

        this.props.navigation.navigate('Login');
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  checkPhoneUniqueness = async (phone) => {
    try {
      const response = await fetch('https://car-wash-backend-api.onrender.com/api/clients', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Check if the entered phone number exists in the data
        const isPhoneRegistered = data.some((client) => client.clientPhone === parseInt(phone)); // Convert phone to integer for comparison
        return isPhoneRegistered;
      } else {
        // If the API request fails, return false or handle the error as needed
        return false;
      }
    } catch (error) {
      // Handle any errors that occur during the API call.
      console.error('Error checking phone number uniqueness:', error);
      return false;
    }
  };

  validateFields() {
    const { clientName, clientEmail, clientPhone, clientAddress } = this.state;
    const errors = {};

    if (!clientName) {
      errors.clientName = 'Client Name is required.';
    }

    if (!clientEmail) {
      errors.clientEmail = 'Client Email is required.';
    } else {
      // Validate client email format (basic email format validation)
      const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailPattern.test(clientEmail)) {
        errors.clientEmail = 'Invalid Client Email.';
      }
    }

    if (!clientPhone) {
      errors.clientPhone = 'Client Phone Number is required.';
    } else {
      // Validate client phone number format (basic format validation)
      const phonePattern = /^[0-9]{10}$/;
      if (!phonePattern.test(clientPhone)) {
        errors.clientPhone = 'Invalid Client Phone Number.';
      }
    }

    if (!clientAddress) {
      errors.clientAddress = 'Client Address is required.';
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  }

  render() {
    const { clientName, clientEmail, clientPhone, clientAddress, errors } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Sign Up</Text>
    
        {/* Full Name */}
        <Text style={styles.label}>Full Name<Text style={styles.required}> *</Text></Text>
        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#000"
          onChangeText={(text) => this.setState({ clientName: text })}
          value={this.state.clientName}
          onBlur={this.validateclientName}
          style={styles.input}
        />
        <Text style={styles.errorText}>{errors.clientName}</Text>
    
        {/* Email */}
        <Text style={styles.label}>Email<Text style={styles.required}> *</Text></Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#000"
          onChangeText={(text) => {
            this.setState({ clientEmail: text, errors: { ...this.state.errors, clientEmail: '' } });
          }}
          value={this.state.clientEmail}
          onBlur={this.validateclientEmail}
          style={styles.input}
        />
        <Text style={styles.errorText}>{errors.clientEmail}</Text>
    
        {/* Phone Number */}
        <Text style={styles.label}>Phone Number<Text style={styles.required}> *</Text></Text>
        <TextInput
          placeholder="Phone Number"
          placeholderTextColor="#000"
          onChangeText={(text) => {
            this.setState({ clientPhone: text, errors: { ...this.state.errors, clientPhone: '' } });
          }}
          value={this.state.clientPhone}
          onBlur={this.validateclientPhone}
          keyboardType="numeric"
          maxLength={10}
          style={styles.input}
        />
        <Text style={styles.errorText}>{errors.clientPhone}</Text>
    
        {/* Address */}
        <Text style={styles.label}>Address<Text style={styles.required}> *</Text></Text>
        <TextInput
          placeholder="Address"
          placeholderTextColor="#000"
          onChangeText={(text) => this.setState({ clientAddress: text })}
          value={this.state.clientAddress}
          onBlur={this.validateclientAddress}
          style={styles.input}
        />
        <Text style={styles.errorText}>{errors.clientAddress}</Text>
    
        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

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
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Signup;
