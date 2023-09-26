import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';

const Confirm = ({ navigation }) => {
  const handleIconPressContinue = () => {
    navigation.navigate('Home'); // Navigate to the home screen
  };

  return (
    <>
      <View style={styles.icon}>
        <Ionicons name="checkmark-done-circle-outline" size={80} color="black"/>
        <Text style={styles.text}>Done</Text>
        <TouchableOpacity style={styles.button} onPress={handleIconPressContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  icon: {
    paddingTop: 250,
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#02ccfe',
    height: 50,
    width: 340,
    paddingTop: 10,
    marginTop: 100,
    borderRadius: 2,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    margin: 4,
  },
});

export default Confirm;
