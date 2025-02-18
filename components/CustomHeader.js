import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';


export default function CustomHeader({ title, navigation }) {
  const user = useSelector(state => state.user.user);  // Get user from Redux
  const [data, setData] = useState([]);
  // profile picture
 const getInitials = (firstName, lastName) => {
  if (!firstName || !lastName) return "U"; // Default to "U" if name is missing
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};
  return (
    
        <View style={styles.headerContainer}>
           
            <View style={styles.userInfoWrapper}>
                                    {user && user.firstName && user.lastName ? (
                // ✅ Render Initials if First & Last Name Exist
                <View style={styles.profileCircle}>
                  <Text style={styles.profileText}>
                    {getInitials(user.firstName, user.lastName)}
                  </Text>
                </View>
              ) : (
                // ✅ Fallback if User Info is Missing
                <View style={styles.profileCircle}>
                  <Text style={styles.profileText}>U</Text>
                </View>
              )}
            <View style = {{marginLeft: 10}}>
            <Text style={{color: "black", fontSize: 16}}>{user.firstName} {user.lastName}</Text>
            </View>
            </View>

      <TouchableOpacity onPress={() => console.log("Settings pressed")}>
        <Ionicons name="settings-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
 
   
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgb(200,260,240)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius:25,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  ProfileImage: {
    width:55,
    height:55,
    borderRadius:40,
    //aspectRatio: 1
},
 userInfoWrapper: {
    flexDirection: 'row', 
    alignItems: 'center'
 },
 profileCircle: {
  width: 55,
  height: 55,
  borderRadius: 40,
  backgroundColor: "rgb(50,300,210)",  // Spot Green background
  justifyContent: "center",
  alignItems: "center",
  elevation: 3, // Shadow effect for Android
  shadowColor: "#000", // Shadow effect for iOS
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
},

profileText: {
  fontSize: 20,
  fontWeight: "bold",
  color: "white",
},
});
