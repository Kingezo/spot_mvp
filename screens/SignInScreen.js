import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Pressable} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import ScreenWrapper from '../components/screenWrapper';
import { colors } from '../theme/ColorThemes';
import Button from '../constants/Button';
import { useNavigation } from '@react-navigation/native';

export default function SignInScreen() {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const navigation = useNavigation();

    return (
        <ScreenWrapper>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', marginVertical: 12, color: colors.black }}> Sign In </Text>
                <Text style={{ fontSize: 16, color: colors.black }}> Welcome Back! </Text>
            </View>

            <View style={{ height: 575, marginBottom: 12 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginVertical: 8 }}> Email Address</Text>
                <View style={{ width: "100%", height: 48, borderColor: colors.black, borderWidth: 1, borderRadius: 8, alignItems: "center", justifyContent: "center", paddingLeft: 22 }}>
                    <TextInput
                        placeholder='Enter your email address'
                        placeholderTextColor={colors.black}
                        keyboardType='email-address'
                        style={{
                            width: "100%"
                        }}
                    />
                </View>

                <Text style={{ fontSize: 16, fontWeight: 'bold', marginVertical: 8 }}> Password</Text>
                <View style={{ width: "100%", height: 48, borderColor: colors.black, borderWidth: 1, borderRadius: 8, alignItems: "center", justifyContent: "center", paddingLeft: 22 }}>
                    <TextInput
                        placeholder='Enter your Password'
                        placeholderTextColor={colors.black}
                        secureTextEntry={!isPasswordShown}
                        style={{
                            width: "100%"
                        }}
                    />
                    <TouchableOpacity onPress={() => setIsPasswordShown(!isPasswordShown)} style={{ position: "absolute", right: 12 }}>
                        {isPasswordShown == true ? (
                            <Ionicons name="eye" size={24} color={colors.black} />
                        ) : (
                            <Ionicons name="eye-off" size={24} color={colors.black} />
                        )}
                    </TouchableOpacity>
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginVertical: 6
                }}>
                    <Button
                        title="Sign In"
                        filled
                        onPress={() => navigation.navigate("Main")}
                        style={{
                            marginTop: 22,
                            width: "100%",
                        }}
                    />
                </View>

                <View style={{ alignItems: 'center', marginVertical: 20 }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10 }}> Or Sign in With</Text>
                    <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => console.log("Pressed")}
                            style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', height: 52, borderWidth: 1, borderColor: colors.grey, borderRadius: 10, marginHorizontal: 22, width: '99%' }}>
                            <Image source={require("../assets/images/googleIcon.png")} style={{ height: 36, width: 36, marginRight: 8 }} resizeMode='contain' />
                            <Text>Google</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 22
                }}>
                    <Text style={{ fontSize: 16, color: colors.black }}>Don't have an account ? </Text>
                    <Pressable
                        onPress={() => navigation.navigate("SignUp")}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: colors.primary,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Register</Text>
                    </Pressable>
                </View>
                </View>
            </View>
            </ScreenWrapper>
    );
}
