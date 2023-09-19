import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Profile extends Component {
    state = {
        user: null
    };

    componentDidMount() {
        this.loadUserData();
    }

    loadUserData = async () => {
        try {
            // Retrieve the user ID from AsyncStorage
            const userId = await AsyncStorage.getItem('userId');

            if (userId) {
                // Fetch user data from your API using the user ID
                const response = await fetch(`https://car-wash-backend-api.onrender.com/api/clients/${userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const userData = await response.json();
                this.setState({ user: userData });
            } else {
                // Handle the case where the user ID is not found in AsyncStorage
                console.error('User ID not found in AsyncStorage');
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    };

    handleLogout = async () => {
        // Clear AsyncStorage
        try {
            await AsyncStorage.clear();
            // Navigate to the Login screen
            this.props.navigation.navigate('Login');
        } catch (error) {
            console.error('Error clearing AsyncStorage:', error);
        }
    };

    render() {
        const { user } = this.state;

        if (!user) {
            return (
                <View style={styles.container}>
                    <Text style={styles.text}>Loading...</Text>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <Text style={styles.text}>Profile</Text>
                
                <View style={{ alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faUser} size={30} color="#02ccfe" />
                </View>

                <View style={styles.infoContainer}>
                    <Text>Name</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>{user.clientName}</Text>
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <Text>Phone</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>{user.clientPhone}</Text>
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <Text>Email</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>{user.clientEmail}</Text>
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <Text>Address</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>{user.clientAddress}</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={this.handleLogout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        paddingTop: 40
    },
    text: {
        fontSize: 30,
        color: '#02ccfe',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    infoContainer: {
        height: 70,
        width: 360,
        backgroundColor: "#F2F3F4",
        marginVertical: 10,
        padding: 10
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
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default Profile;
