import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,

} from 'react-native'

//*********************** 
//**********************
// #f7db03 YELLOW
//#006b51 DARK GREEN
//#c4fcf7 FAINT GREEN
// #659b9c MADIUM GREEN


class Otp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enteredOTP: '',
      OtpError:'',
      generatedOTP1: '',
    };
  }
  componentDidMount() {
    this.generateOTP();
  }

  // generateOTP = () => {
  //   // Generate a random 4-digit OTP
   
  //   const generatedOTP1= Math.floor(1000 + Math.random() * 9000);
  //   this.setState({ generatedOTP1});
  // };

  // handleResendOTP = () => {
  //   // Regenerate OTP and enable Resend button
  //   this.generateOTP();
  // };
  handleResendOTP = () => {
    // Regenerate OTP and enable Resend button
    const newOTP = this.generateOTP();
    this.setState({ generatedOTP1: newOTP });
  };

  generateOTP = () => {
    // Generate a random 4-digit OTP
    return Math.floor(1000 + Math.random() * 9000).toString();
  };
  handleVerifyOTP = () => {
    const { generatedOTP } = this.props.route.params;
   
    const { enteredOTP } = this.state;

    if (enteredOTP === generatedOTP.toString()) {
      // OTP verification successful, navigate to next screen
      // Replace 'NextScreen' with the actual name of the next screen
      this.props.navigation.navigate('Home');
    } else {
      // Show an error message or alert about incorrect OTP
      this.setState({ OtpError: 'Enter The Correct OTP' });

    }
  }
  render() {
    const { phoneNumber,generatedOTP } = this.props.route.params;
    const {  OtpError,generatedOTP1 } = this.state;
   
    return (
      <>
        {/* <Text>Enter OTP sent to {phoneNumber}</Text> */}
        <Text>Generated OTP: {generatedOTP}</Text> 
        <Text>ReGenerated OTP: {this.state.generatedOTP1}</Text>
 
        
        <Text style={styles.log}>Verify OTP</Text>

        <View style={styles.container}>

          <Text style={styles.name}>Enter OTP</Text>
          <TextInput
            style={styles.textBox}
            placeholder="Enter OTP"
            keyboardType={'numeric'}
            maxLength={6}
            onChangeText={enteredOTP => this.setState({ enteredOTP })}
            >
          </TextInput>
          {OtpError !== '' && <Text style={styles.errorText}>{OtpError}</Text>}

          <TouchableOpacity style={styles.button} onPress={this.handleVerifyOTP}>
            <Text style={styles.buttonText}>Verify</Text>
          </TouchableOpacity>

          
          <TouchableOpacity onPress={this.handleResendOTP}>
            <Text style={styles.service}>Resend OTP ?</Text>
          </TouchableOpacity>


          <Text style={{ textAlign: 'center', paddingTop: 30 }}>By signing up,you agree to GoGoRide's Terms of</Text>

          <TouchableOpacity>
            <Text style={styles.service}>Service and Privacy Policy</Text>
          </TouchableOpacity>
          
          <View style={styles.account}>
          <Text style={styles.text}>Already had an account? </Text>
          <TouchableOpacity>
            <Text style={styles.login}>Log in</Text>
          </TouchableOpacity>
          </View>

        </View>
      </>
    );
  }

}

const styles = StyleSheet.create({
  log: {
    textAlign: 'center',
    fontSize: 25,
    // fontWeight: 'bold',
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
    color: 'white',
    fontSize: 16,
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
    marginVertical:5
  },
  account:{
    flexDirection:'row',
    marginTop:200,
    marginHorizontal:90,
  },
  text:{
    textAlign:'center',
    fontSize:15
  },
  login:{
    color:'blue',
    textDecorationLine:'underline',
    fontSize:15
  }
})
export default Otp;
