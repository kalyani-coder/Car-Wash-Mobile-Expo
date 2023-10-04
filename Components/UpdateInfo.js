
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Appearance } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import moment from 'moment'; // Import moment for date and time formatting

const UpdateInfo = ({ route, navigation }) => {
  const { appointment } = route.params;
  const [editedAppointment, setEditedAppointment] = useState({ ...appointment });
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const colorScheme = Appearance.getColorScheme();


  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleDateConfirm = (selectedDate) => {
    hideDatePicker();
    const formattedDate = moment(selectedDate).format('DD-MM-YYYY'); // Format as DD-MM-YYYY
    setEditedAppointment({ ...editedAppointment, date: formattedDate });
  };

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleTimeConfirm = (selectedTime) => {
    hideTimePicker();
    const formattedTime = moment(selectedTime).format('hh:mm A'); // Format as HH:MM AM/PM
    setEditedAppointment({ ...editedAppointment, time: formattedTime });
  };

  const handleUpdate = () => {
    // Perform a PATCH request to update the appointment with the new date and time
    // Replace this with your actual API endpoint and logic
    fetch(`https://car-wash-backend-api.onrender.com/api/bookings/${editedAppointment._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedAppointment),
    })
      .then((response) => {
        if (response.ok) {
          // Successfully updated the appointment
          // Navigate back to the Upcoming screen with the updated data
          navigation.navigate('Appointment', { updatedAppointment: editedAppointment });
        } else {
          console.error('Failed to update appointment');
        }
      })
      .catch((error) => {
        console.error('Error updating appointment:', error);
      });
  };

  const commonStyles = {
    // backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
    color: colorScheme === 'dark' ? '#fff' : '#000',
  };

  return (
    <ScrollView style={[styles.container,commonStyles]}>
      <Text style={styles.heading}>Edit Appointment</Text>
      <View style={styles.appointmentDetails}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.detail}>{editedAppointment.date}</Text>
        <TouchableOpacity onPress={showDatePicker}>
          <Entypo name="calendar" size={24} color="#5B7586" />
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />
      </View>
      <View style={styles.appointmentDetails}>
        <Text style={styles.label}>Time:</Text>
        <Text style={styles.detail}>{editedAppointment.time}</Text>
        <TouchableOpacity onPress={showTimePicker}>
          <MaterialIcons name="access-time" size={24} color="#5B7586" />
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={hideTimePicker}
        />
      </View>
      {/* Display additional fields */}
      <View style={styles.appointmentDetails}>
        <Text style={styles.label}>Client Name:</Text>
        <Text style={styles.detail}>{appointment.clientName}</Text>
      </View>
      <View style={styles.appointmentDetails}>
        <Text style={styles.label}>Contact:</Text>
        <Text style={styles.detail}>{appointment.clientContact}</Text>
      </View>
      <View style={styles.appointmentDetails}> 
      
        <Text style={styles.label}>Service Name:</Text>
        <Text style={styles.detail}>{appointment.servicesName}</Text>
      </View>
      <View style={styles.appointmentDetails}>
        <Text style={styles.label}>Vehicle No:</Text>
        <Text style={styles.detail}>{appointment.clientvehicleno}</Text>
      </View>
      <View style={styles.appointmentDetails}>
        <Text style={styles.label}>Car Model No:</Text>
        <Text style={styles.detail}>{appointment.clientcarmodelno}</Text>
      </View>
      <View style={styles.appointmentDetails}>
        <Text style={styles.label}>Total Price:</Text>
        <Text style={styles.detail}>{appointment.totalPrice}</Text>
      </View>
      {/* Add more fields as needed */}
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 70,
    backgroundColor: '#f7f7f7',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#5B7586',
  },
  appointmentDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#5B7586',
  },
  detail: {
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: '#5B7586',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UpdateInfo;
