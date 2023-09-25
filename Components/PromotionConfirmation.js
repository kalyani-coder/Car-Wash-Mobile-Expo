import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Linking,
    TextInput,
    ScrollView,

} from "react-native";
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";


const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

// Define a function to format the time as hh:mm AM/PM
const formatTime = (time) => {
    const hours = time.getHours() % 12 || 12; // Get hours in 12-hour format
    const minutes = time.getMinutes().toString().padStart(2, "0");
    const ampm = time.getHours() >= 12 ? "PM" : "AM";
    return `${hours}:${minutes} ${ampm}`;
};


class PromotionConfirmation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            time: '',
            pickupAddress: '',
            selectedOption: null,
            clientvehicleno: '',
            clientcarmodelno: '',
            vehicleNumberError: '',
            modelNumberError: '',
            totalPrice1: '',
            formattedDate: '',
            formattedTime: '',
            selectedOption: 'pickup',
        };

    }



    //for dropdown
    handleOptionChange = (selectedOption) => {
        this.setState({ selectedOption });
    };

    handleIconPressNotification = () => {
        this.props.navigation.navigate('Notification');
    };
    //for home
    handleIconPressHome = () => {
        this.props.navigation.navigate('Home'); // Navigate to the home screen
    };
    //for services
    handleIconPressService = () => {
        this.props.navigation.navigate('Washing'); // Navigate to the Washing screen
    };
    //for Booking
    handleIconPressBooking = () => {
        this.props.navigation.navigate('Appointment'); // Navigate to the Appointment screen
    };
    //inbox page
    handleIconPressInbox = () => {
        this.props.navigation.navigate('Confirmation'); // Navigate to the Confirmation page screen
    };
    //for  setting
    openSettings = async () => {
        try {
            await Linking.openSettings();
        } catch (error) {
            console.error('Error opening settings:', error);
        }
    };
    validateFields = () => {
        const { clientvehicleno, clientcarmodelno } = this.state;
        let isValid = true;

        // Validate Vehicle Number
        if (clientvehicleno.trim() === '') {
            this.setState({ vehicleNumberError: 'Vehicle Number is required' });
            isValid = false;
        } else {
            this.setState({ vehicleNumberError: '' });
        }

        // Validate Model Number
        if (clientcarmodelno.trim() === '') {
            this.setState({ modelNumberError: 'Model Number is required' });
            isValid = false;
        } else {
            this.setState({ modelNumberError: '' });
        }

        return isValid;
    };
    handleSubmit = () => {
        if (this.validateFields()) {
            // Determine the values for pickuptoagent and selfdrive based on the selected option
            const pickuptoagent = this.state.selectedOption === "pickup" ? "Yes" : "No";
            const selfdrive = this.state.selectedOption === "selfdrive" ? "Yes" : "No";
            const { pickupAddress, date, time, servicesName, status, price1 } = this.props.route.params;
            const { clientcarmodelno, clientvehicleno } = this.state;
            // const { serviceName, price1,  } = this.props.route.params;
            let selectedOptionValue = 0;

            if (this.state.selectedOption === 'pickup') {
              selectedOptionValue = 300;
            }
            const taxAmount = price1 * 0.10;
            const totalPrice = price1 + taxAmount + selectedOptionValue;
            const formattedDate = moment(date).format('DD-MM-YYYY');
            const formattedTime = moment(time).format('hh:mm A');
            fetch('https://car-wash-backend-api.onrender.com/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date: formattedDate,
                    time: formattedTime,
                    pickupAddress: pickupAddress,
                    servicesName,
                    totalPrice: totalPrice,
                    status: "",
                    agentId: "",
                    clientcarmodelno: clientcarmodelno,
                    clientvehicleno: clientvehicleno,
                    pickuptoagent: pickuptoagent,
                    selfdrive: selfdrive,
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    this.setState({ response: data });
                    this.props.navigation.navigate('Confirm');
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }

    };



    render() {

        let selectedOptionValue = 0; // Default value for "Self Drive"
        if (this.state.selectedOption === 'pickup') {
            selectedOptionValue = 300; // Set the value for "Pickup by Agent"
        }
        const { pickupAddress, date, time } = this.props.route.params;

        const formattedDate = moment(date).format('DD-MM-YYYY');
        const formattedTime = moment(time).format('hh:mm A');
        const { servicesName, price1 } = this.props.route.params;
        const taxAmount = price1 * 0.10;
        const totalPrice = price1 + taxAmount + selectedOptionValue;

        return (
            <>
                <View style={styles.header}>
                    <ScrollView
                        Vertical={true}
                        showsVerticalScrollIndicator={false}
                        style={{ flex: 1 }}
                    >
                        <View style={styles.container}>
                            {/* <Text style={styles.text}>Confirmation</Text> */}
                            <View
                                style={{
                                    height: 65,
                                    width: 360,
                                    backgroundColor: "white",
                                    marginVertical: 10,
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        margin: 10,
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <MaterialCommunityIcons name="car-wash" size={35} color="black" />
                                    <Text>{servicesName}</Text>
                                    <Text>{price1}</Text>

                                </View>
                            </View>
                            <View
                                style={{
                                    height: 65,
                                    width: 360,
                                    backgroundColor: "white",
                                    marginVertical: 10,
                                }}
                            >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 15 }}>
                                    <Text>{formattedDate}</Text>

                                    <Text>{formattedTime}</Text>
                                </View>
                            </View>

                            <Text>Pickup Address</Text>
                            <View
                                style={{
                                    height: 50,
                                    width: 360,
                                    backgroundColor: "white",
                                    marginVertical: 10,
                                }}
                            >

                                <Text style={{ margin: 10 }}>{pickupAddress}</Text>


                            </View>
                            <Text>Enter Vehicle Number<Text style={{ color: 'red' }}> *</Text></Text>
                            <TextInput
                                placeholder="Vehicle Number"
                                onChangeText={(text) => this.setState({ clientvehicleno: text })}
                                value={this.state.clientvehicleno}
                                style={styles.input}
                            />
                            <Text style={styles.errorText}>{this.state.vehicleNumberError}</Text>


                            <Text>Enter Model Number<Text style={{ color: 'red' }}> *</Text></Text>

                            <TextInput
                                placeholder="Model Number"
                                onChangeText={(text) => this.setState({ clientcarmodelno: text })}
                                value={this.state.clientcarmodelno}
                                style={styles.input}
                            />
                            <Text style={styles.errorText}>{this.state.modelNumberError}</Text>



                            <View>
                                <Text>Select an option:</Text>
                                <Picker
                                    style={styles.picker}
                                    selectedValue={this.state.selectedOption}
                                    onValueChange={(itemValue) => {
                                        this.setState({ selectedOption: itemValue }, () => {
                                            // Calculate selectedOptionValue here and update the state
                                            let selectedOptionValue = 0;
                                            if (this.state.selectedOption === 'pickup') {
                                                selectedOptionValue = 300;
                                            }
                                            this.setState({ selectedOptionValue });
                                        });
                                    }}
                                >
                                    <Picker.Item label="Pickup by Agent" value="pickup" />
                                    <Picker.Item label="Self Drive" value="selfdrive" />
                                </Picker>


                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontWeight: 'bold' }}>
                                        {this.state.selectedOption === 'pickup' ? 'Pickup By Agent' : 'Self Drive'}
                                    </Text>
                                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                        <Text style={{ fontWeight: 'bold' }}>
                                            {this.state.selectedOption === 'pickup' ? selectedOptionValue : '0'}
                                        </Text>
                                    </View>
                                </View>

                            </View>
                            <View style={styles.amount}>
                                <Text style={styles.text2}>TAXES</Text>
                                <Text style={styles.text2}>{taxAmount}</Text>
                            </View>
                            <View style={styles.amount}>
                                <Text style={styles.text2}>Service Price</Text>
                                <Text style={styles.text2}>{price1}</Text>
                            </View>
                            <View style={styles.amount}>
                                <Text style={styles.text2}>TOTAL PAYABLE </Text>
                                <Text style={styles.text2}>{totalPrice}</Text>
                            </View>
                        </View>

                    </ScrollView>
                    <View style={styles.container}>

                        <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
                            <Text style={styles.buttonText}>Confirm Booking</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.footer}>

                        <View style={styles.iconsContainer1}>
                            <View style={styles.text9}>
                                <TouchableOpacity onPress={this.handleIconPressHome}>
                                    <Entypo name="home" size={30} style={styles.icon4} />
                                </TouchableOpacity>
                                <Text style={styles.text10}>Home</Text>
                            </View>

                            <View style={styles.text9}>
                                <TouchableOpacity onPress={this.handleIconPressBooking}>
                                    <Entypo name="calendar" size={30} style={styles.icon4} />
                                </TouchableOpacity>
                                <Text style={styles.text10}>Booking</Text>
                            </View>

                            <View style={styles.text9}>
                                <TouchableOpacity onPress={this.handleIconPressNotification}>
                                    <MaterialIcons
                                        name="forward-to-inbox"
                                        size={30}
                                        style={styles.icon4}
                                    />
                                </TouchableOpacity>
                                <Text style={styles.text10}>Inbox</Text>
                            </View>

                            <View style={styles.text9}>
                                <TouchableOpacity onPress={this.openSettings}>
                                    <Ionicons
                                        name="settings-sharp"
                                        size={30}
                                        style={styles.icon4}
                                    />
                                </TouchableOpacity>

                                <Text style={styles.text10}>Setting</Text>
                            </View>
                        </View>
                    </View>
                </View>

            </>
        );
    }
}
const styles = StyleSheet.create({
    header: {
        flex: 1,
        backgroundColor: '#a7a7a7'

    },
    container: {
        marginHorizontal: 15,
        paddingTop: 15,
        // backgroundColor:'#c4fdf7'
    },

    text: {
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center",
    },
    text1: {
        height: 45,
        width: 250,
        borderWidth: 2,
        borderColor: "grey",
        paddingLeft: 15,
    },
    date1: {
        flexDirection: 'row',

    },
    voucher1: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
    },
    apply: {
        height: 45,
        width: 100,
        borderWidth: 2,
        borderColor: "grey",
        backgroundColor: "yellow",
    },

    amount: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 5,
    },

    text2: {
        fontWeight: "bold",
        fontSize: 13,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 2,
        padding: 5,
        marginBottom: 5,
        backgroundColor: 'white',
        width: 360,
        // marginHorizontal: 10
    },
    errorText: {
        color: 'red',
        // marginBottom: 5,
        // marginHorizontal: 20
    },
    picker: {
        backgroundColor: 'white',
        fontWeight: 'bold',
    },
    selectedOptionText: {
        //  paddingLeft:20,
        fontWeight: 'bold',
        marginTop: 5,
    },

    button: {
        backgroundColor: "#5B7586",
        height: 50,
        width: 360,
        paddingTop: 10,
        marginTop: 15,
        borderRadius: 2,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        margin: 4,
    },
    footer: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 5,
        alignItems: 'center',
    },

    iconsContainer1: {
        flexDirection: 'row',
    },
    icon4: {
        marginHorizontal: 20,
    },
    text9: {
        alignItems: 'center',
    },
    text10: {
        fontSize: 10,
    }
});
export default PromotionConfirmation;
