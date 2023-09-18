
import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
// import DocumentPicker from 'react-native-document-picker';
async function checkEmailUniqueness(email) {
  try {
    // Make an API request to fetch the existing clientEmail data
    const response = await fetch('https://car-wash-backend-api.onrender.com/api/clients', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      // Extract the existing clientEmail from the API response
      const clientEmailFromApi = data.clientEmail;

      // Compare the entered email with the fetched clientEmail
      return email === clientEmailFromApi;
    } else {
      // If the API request fails, return false or handle the error as needed
      return false;
    }
  } catch (error) {
    // Handle any errors that occur during the API call.
    console.error('Error checking email uniqueness:', error);
    return false;
  }
}




class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      // clientdob: '',
      clientAddress: '',
      errorMessage:'',
      email:'',
      response:null,

      errors: {
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        // clientdob: '',
        clientAddress: '',
        file: '',
      },
    };
  }
  componentDidMount() {
    checkEmailUniqueness();

  }
   
  
  handleSubmit =  () => {
    if (this.validateFields()) {
      const requestBody = {
        clientName: this.state.clientName,
        clientEmail: this.state.clientEmail,
        clientPhone: this.state.clientPhone,
        // clientdob: this.state.clientdob,
        clientAddress: this.state.clientAddress,
      };
    
      const { email } = this.state;
      const errors = {};
    


      // Check if the email is already registered (You would typically make an API call here)
      const isEmailRegistered =  checkEmailUniqueness(email);
    
      if (isEmailRegistered) {
        // this.setState({ errors: 'Email is already registered' });
        errors.clientEmail = 'Email is already registered';
      } else { 
        // Perform the registration or API call for registration here.
        // Reset the error message and clear the form fields.
        fetch('https://car-wash-backend-api.onrender.com/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          this.setState({ response: data });
          // if (data.success) {
          //   // Navigate to the success screen upon successful submission
          //   this.props.navigation.navigate('Home');

          //   console.log('After navigation');
          // } else {
          //   Alert.alert('API Error', 'Failed to submit data.');
          // }
         
          this.props.navigation.navigate('Login');
        })
        .catch((error) => {
          console.error('Error:', error);
        });

        
      }
      // Perform the registration or API call for registration here.
        // Reset the error message and clear the form fields.
        fetch('https://car-wash-backend-api.onrender.com/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          this.setState({ response: data });
          // if (data.success) {
          //   // Navigate to the success screen upon successful submission
          //   this.props.navigation.navigate('Home');

          //   console.log('After navigation');
          // } else {
          //   Alert.alert('API Error', 'Failed to submit data.');
          // }
         
          this.props.navigation.navigate('Login');
        })
        .catch((error) => {
          console.error('Error:', error);
        });
 

    }
  };

  
  validateFields() 
  {
    const { clientName, clientEmail, clientPhone, clientdob, clientAddress } = this.state;
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

    // if (!clientdob) {
    //   errors.clientdob = 'Client Date of Birth is required.';
    // } else {
    //   // Validate client date of birth format (dd-mm-yyyy)
    //   const dobPattern = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
    //   if (!dobPattern.test(clientdob)) {
    //     errors.clientdob = 'Invalid Client Date of Birth. Please use dd-mm-yyyy format.';
    //   }
    // }

    if (!clientAddress) {
      errors.clientAddress = 'Client Address is required.';
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  }

  


  // handleFilePick = async () => {
  //   try {
  //     const result = await DocumentPicker.pick({
  //       type: [DocumentPicker.types.allFiles],
  //     });

  //     this.setState({
  //       selectedFile: result,
  //     });
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err)) {
  //       // User cancelled the picker
  //     } else {
  //       throw err;
  //     }
  //   }
  // };



  // handleFileUpload = file => {
  //   // Handle file upload logic here
  //   this.setState({ file });
  // };
  





  render() {
    const { clientName, clientEmail, clientPhone, clientdob, clientAddress, errors } = this.state;
    const { selectedFile } = this.state;


    return (
      <View style={styles.container}>
        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>Enter Your Information</Text>

        <TextInput
          placeholder="Full Name"

          onChangeText={(text) => this.setState({ clientName: text })}
          value={this.state.clientName}
          onBlur={this.validateclientName}
          style={styles.input}
        />
        <Text style={styles.errorText}>{errors.clientName}</Text>

        <TextInput
          placeholder="Email"

          onChangeText={(text) => this.setState({ clientEmail: text })}
          value={this.state.clientEmail}
          onBlur={this.validateclientEmail}
          style={styles.input}
        />
        <Text style={styles.errorText}>{errors.clientEmail}</Text>

        <TextInput
          placeholder="Phone Number"

          onChangeText={(text) => this.setState({ clientPhone: text })}
          value={this.state.clientPhone}
          onBlur={this.validateclientPhone}
          keyboardType="numeric"
          maxLength={10}
          style={styles.input}
        />
        <Text style={styles.errorText}>{errors.clientPhone}</Text>
        

        {/* <TextInput
          placeholder="Date of Birth"

          onChangeText={(text) => this.setState({ clientdob: text })}
          value={this.state.clientdob}
          onBlur={this.validateclientdob}
          keyboardType="numeric"
          style={styles.input}
        />
        <Text style={styles.errorText}>{errors.clientdob}</Text> */}


        <TextInput
          placeholder="Address"

          onChangeText={(text) => this.setState({ clientAddress: text })}
          value={this.state.clientAddress}
          onBlur={this.validateclientAddress}
          style={styles.input}
        />
        <Text style={styles.errorText}>{errors.clientAddress}</Text>

        {/* <View style={styles.choosefile}>
          <TouchableOpacity onPress={this.handleFilePick}>
            <View style={styles.selectfile}>
              <Text>Select File</Text>
            </View>
          </TouchableOpacity>
          {selectedFile ? (
            <View>
              <Text>Selected File: {selectedFile.name}</Text>
              <Text>File Size: {selectedFile.size} bytes</Text>
            </View>
          ) : (
            <Text>No file selected</Text>
          )}
        </View> */}


        <View>
          <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop:80,
    backgroundColor:'#c4fdf7'
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor:'white'
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
  choosefile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5
  },
  selectfile: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    borderRadius: 5

  },
  button: {
    backgroundColor: '#006b51',
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