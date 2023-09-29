
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Appearance } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faEnvelope, faPhone, faMapMarkerAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute,useNavigation } from '@react-navigation/native'; // Import navigation hook

const Profile = () => {
  const [user, setUser] = useState(null);
  const colorScheme = Appearance.getColorScheme();
  const navigation = useNavigation(); // Initialize navigation
  const route = useRoute();

  useEffect(() => {
    loadUserData();
  }, [route.params]);

  const loadUserData = async () => {
    try {
      // Replace with your logic to get the user ID from AsyncStorage
      const userId = await AsyncStorage.getItem('userId');

      if (userId) {
        const response = await fetch(`https://car-wash-backend-api.onrender.com/api/clients/${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const userData = await response.json();

        // Check if there's updated user data from Editprofile page
        const updatedUser = route.params?.updatedUser;
        if (updatedUser) {
          // Merge the updated data into the user object
          setUser({ ...userData, ...updatedUser });
        } else {
          setUser(userData);
        }
      } else {
        console.error('User ID not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      // Navigate to the login screen upon logout
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  const handleEditProfile = () => {
    // Navigate to the EditProfile screen when the "Edit" button is pressed
    navigation.navigate('Editprofile', { user });
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }
  
  const commonStyles = {
    // backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
    color: colorScheme === 'dark' ? '#fff' : '#000',
  };

  return (
    <View style={[styles.container, commonStyles]}>
      <View style={styles.header}>
        <Text style={styles.headingText}>Profile</Text>
        {/* Add an "Edit" button */}
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <FontAwesomeIcon icon={faEdit} size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.iconContainer}>
          <FontAwesomeIcon icon={faUser} size={30} color="black" />
          <Text style={styles.infoText}>{user.clientName}</Text>
          
        </View>

        <View style={styles.iconContainer}>
          <FontAwesomeIcon icon={faPhone} size={30} color="black" />
          <Text style={styles.infoText}>{user.clientPhone}</Text>
        </View>

        <View style={styles.iconContainer}>
          <FontAwesomeIcon icon={faEnvelope} size={30} color="black" />
          <Text style={styles.infoText}>{user.clientEmail}</Text>
        </View>

        <View style={styles.iconContainer}>
          <FontAwesomeIcon icon={faMapMarkerAlt} size={30} color="black" />
          <Text style={styles.infoText}>{user.clientAddress}</Text>
        </View>
      </View>

      {/* <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#D8D8D8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headingText: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
  },
  editButton: {
    padding: 10,
  },
  editButtonText: {
    fontSize: 18,
    color: '#02ccfe',
  },
  infoCard: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    padding: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    marginLeft: 10,
   
  },
  logoutButton: {
    backgroundColor: "#5B7586",
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
    marginTop: 20,
    borderRadius: 4,
  },
  logoutText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default Profile;
