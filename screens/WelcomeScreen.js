
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import ScreenWrapper from '../components/screenWrapper';
//import { colors } from '../theme/ColorThemes';
import Button from '../constants/Button';
// import classNames from 'classnames';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
    const navigation = useNavigation();
    return (
        <ScreenWrapper>
          <View >
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image 
                source={require('../assets/images/Piggy.jpg')} className="h-96 w-96 shadow" 
                style={{ width: 300, height: 300, borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4.65, elevation: 8, marginTop: 50 }}
                />
            </View>
            <View >
                <View style={{fontSize: 32, fontWeight: "bold", alignItems: 'center',justifyContent: 'center' }}>
                <Text style={{fontSize: 32, fontWeight: "bold", alignItems: 'center',justifyContent: 'center', color: 'green' }}>SPOT FINANCIAL</Text>
                </View>
                <Button
                        title="Sign In"
                        onPress={() => navigation.navigate('SignIn')}
                        filled
                        style={{
                            marginTop: 100,
                            width: "100%",
                        }}
                    />
                <Button
                        title="Sign Up"
                        onPress={() => navigation.navigate("SignUp")}
                        filled
                        style={{
                            marginTop: 22,
                            width: "100%",
                         
                        }}
                    />
                <TouchableOpacity onPress={()=> signIn()} className="shadow p-3 rounded-full bg-white" >
                  <View >
                   
                  </View>
                    
                </TouchableOpacity>
            </View>
          </View>
        </ScreenWrapper>
      )
    }

    
