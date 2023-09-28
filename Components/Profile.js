import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Appearance } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const colorScheme = Appearance.getColorScheme();

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');

      if (userId) {
        const response = await fetch(`https://car-wash-backend-api.onrender.com/api/clients/${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const userData = await response.json();
        setUser(userData);
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
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
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
    <View style={[styles.container,commonStyles]}>
      <View style={styles.header}>
        <Text style={styles.headingText}>Profile</Text>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.iconContainer}>
          <FontAwesomeIcon icon={faUser} size={30} color="#02ccfe" />
          <Text style={styles.infoText}>{user.clientName}</Text>
        </View>

        <View style={styles.iconContainer}>
          <FontAwesomeIcon icon={faPhone} size={30} color="#02ccfe" />
          <Text style={styles.infoText}>{user.clientPhone}</Text>
        </View>

        <View style={styles.iconContainer}>
          <FontAwesomeIcon icon={faEnvelope} size={30} color="#02ccfe" />
          <Text style={styles.infoText}>{user.clientEmail}</Text>
        </View>

        <View style={styles.iconContainer}>
          <FontAwesomeIcon icon={faMapMarkerAlt} size={30} color="#02ccfe" />
          <Text style={styles.infoText}>{user.clientAddress}</Text>
        </View>
      </View>

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
    backgroundColor: '#f0f0f0',
  },
  header: {
    // backgroundColor: '#02ccfe',
     color:'blue',
    paddingVertical: 20,
  },
  headingText: {
    fontSize: 30,
    color: '#02ccfe',
    textAlign: 'center',
    fontWeight: 'bold',
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
    backgroundColor: "#FF5733",
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
    marginTop: 20,
    borderRadius: 4,
  },
  logoutText: {
    color: '#fff',
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
