import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CustomHeader({ title, navigation }) {
  return (
    <SafeAreaView >
        <View style={styles.headerContainer}>
           
            <View style={styles.userInfoWrapper}>
            <Image 
                source={require('../assets/images/Gnoulelein.jpg')}
                style={styles.ProfileImage}
            />
            <View style = {{marginLeft: 10}}>
            <Text style={{color: "black", fontSize: 16}}> Gnoulelein Tako </Text>
            <Text style={{color: "black", fontSize: 12, opacity: 0.6}}> .GTako0 </Text>
            </View>
            </View>

      <TouchableOpacity onPress={() => console.log("Settings pressed")}>
        <Ionicons name="settings-outline" size={24} color="#00A86B" />
      </TouchableOpacity>
    </View>
    </SafeAreaView>
   
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
 }
});
