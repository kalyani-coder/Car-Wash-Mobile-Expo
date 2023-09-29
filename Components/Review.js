import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Appearance } from 'react-native';

const Review = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
const colorScheme = Appearance.getColorScheme();

  const handleSubmit = () => {
    const reviewData = {
      name,
      message,
    };

    fetch('https://car-wash-backend-api.onrender.com/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    })
      .then((response) => {
        if (response.ok) {
          // Handle successful submission, e.g., show a success message or navigate to a different page
          console.log('Review submitted successfully');
          setName('');
          setMessage('');
        } else {
          // Handle errors, e.g., show an error message to the user
          console.error('Failed to submit review');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
const commonStyles = {
    backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
    color: colorScheme === 'dark' ? '#fff' : '#000',
  };

  return (
    <View style={[styles.container,commonStyles]}>
        {/* <Text style={styles.label}>Enter Name</Text>
        <TextInput
        placeholder="Enter Name"
        placeholderTextColor="#000"
        value={name}
        onChangeText={(text) => setName(text)}
        
        style={styles.input}
      />  */}
      <Text style={styles.label}>Message</Text>
      <TextInput
        placeholder="Write Your Review"
        placeholderTextColor="#000"
        value={message}
        multiline={true} 
        numberOfLines={8} 
        onChangeText={(text) => setMessage(text)}
       
        style={styles.input1}
      />
 
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor:'#D8D8D8'
    
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },

input: {
    width:360,
    
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  input1: {
    width:360,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    
    marginBottom: 10,
    backgroundColor: 'white',
    
  },
 
});

export default Review;
