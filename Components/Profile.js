// import React from "react";
// import { View,Text,StyleSheet }from "react-native";
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { faTextWidth } from "@fortawesome/free-solid-svg-icons";


// class Profile extends React.Component{
//     render(){
//         return(
//             <>
//             <View style={styles.container}>
//             <Text style={styles.text}>Profile</Text>
//             <View style={styles.profileicon}>
//             <FontAwesomeIcon icon={faUser} size={40}
//             backgroundColor= {"#F2F3F4"}
//            />
//             </View>
            
//             <View
//                     style={{
//                         height: 70,
//                         width: 360,
//                         backgroundColor: "#F2F3F4",
//                         marginVertical: 10,
//                         padding:10
                        
//                     }}
//                 >
//             <Text>Name</Text>
//             <View style={{flexDirection:'row',justifyContent:'space-between'}}>
//             <Text>Test Test</Text>
//             <MaterialCommunityIcons name="greater-than" size={17} color="black"/>
//             </View>
//             </View>

//             <View
//                     style={{
//                         height: 70,
//                         width: 360,
//                         backgroundColor: "#F2F3F4",
//                         marginVertical: 10,
//                         padding:10
                        
//                     }}
//                 >

//             <Text>Phone</Text>
//             <View style={{flexDirection:'row',justifyContent:'space-between'}}>
//             <Text>(208)206-5039</Text>
//             <MaterialCommunityIcons name="greater-than" size={17} color="black"/>
//             </View>
//             </View>

//             <View
//                     style={{
//                         height: 70,
//                         width: 360,
//                         backgroundColor: "#F2F3F4",
//                         marginVertical: 10,
//                         padding:10
                        
//                     }}
//                 >
//             <Text>Email</Text>
//             <View style={{flexDirection:'row',justifyContent:'space-between'}}>
//             <Text>test.test@gmail.com</Text>
//             <MaterialCommunityIcons name="greater-than" size={17} color="black"/>
//             </View>
//             </View>
            

//             <View
//                     style={{
//                         height: 150,
//                         width: 360,
//                         backgroundColor: "#F2F3F4",
//                         marginVertical: 10,
//                         padding:10
                        
//                     }}
//                 >
//             <Text>address</Text>
//             <View style={{flexDirection:'row',justifyContent:'space-between'}}>
//             <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste suscipit sint, deleniti blanditiis autem animi optio non! Hic iure vero aut ipsa fugiat corrupti, mollitia consequatur.</Text>
//             <MaterialCommunityIcons name="greater-than" size={17} color="black"/>
//             </View>
//             </View>

//             </View>
//             </>
//         )
//     }
// }
// const styles=StyleSheet.create({
// container:
//     {
//       marginHorizontal:20,  
//     //   marginVertical:10
//     },
// text:{
//     fontSize:30,
//     color:'#02ccfe',
//     textAlign:'center',
//     fontWeight:'bold'
// },
// profileicon:{
//     paddingTop:100, 
//     alignItems:'center'
    
// }
// })
// export default Profile;

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';

class Profile extends Component {
    state = {
        user: null
    };

    componentDidMount() {
        // Fetch user data from your API
        fetch('https://car-wash-backend-api.onrender.com/api/clients')
            .then(response => response.json())
            .then(data => {
                // Assuming you have a way to identify the current user (maybe through authentication)
                const currentUser = data.find(client => client.clientEmail === 'Rahul@gmail.com');
                this.setState({ user: currentUser });
            })
            .catch(error => console.error('Error:', error));
    }

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
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
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
    }
});

export default Profile;