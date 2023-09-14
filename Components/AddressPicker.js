import React, { Component } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
// import Geolocation from 'react-native-geolocation-service'; // for location icon

class AddressPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      selectedLocation: null,
    };
  }

  openLocationPicker = () => {
    // Implement code to open the location picker (e.g., using a modal).
  };

  onMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    this.setState({
      selectedLocation: { latitude, longitude },
    });
  };

  onMarkerDragEnd = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    this.setState({
      selectedLocation: { latitude, longitude },
    });
  };

  getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        this.setState({
          selectedLocation: { latitude, longitude },
        });
      },
      (error) => {
        console.error(error.message);
        // Handle error appropriately, e.g., show an error message to the user.
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  render() {
    return (
      <View>
        <TextInput
          placeholder="Street"
          value={this.state.street}
          onChangeText={(text) => this.setState({ street: text })}
        />
        {/* Render other address fields (city, state, zipCode) similarly */}
        <Button title="Pick Location" onPress={this.openLocationPicker} />
        <Button title="Get Current Location" onPress={this.getCurrentLocation} />
        <MapView
          style={{ flex: 1, height: 200 }}
          region={
            this.state.selectedLocation
              ? {
                  latitude: this.state.selectedLocation.latitude,
                  longitude: this.state.selectedLocation.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }
              : null
          }
          onPress={this.onMapPress}
        >
          {this.state.selectedLocation && (
            <Marker
              coordinate={{
                latitude: this.state.selectedLocation.latitude,
                longitude: this.state.selectedLocation.longitude,
              }}
              draggable
              onDragEnd={this.onMarkerDragEnd}
            />
          )}
        </MapView>
        {this.state.selectedLocation && (
          <Text>
            Selected Location: {this.state.selectedLocation.latitude},{' '}
            {this.state.selectedLocation.longitude}
          </Text>
        )}
      </View>
    );
  }
}

export default AddressPicker;
