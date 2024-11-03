import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Pressable} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import ScreenWrapper from '../components/screenWrapper';
import { colors } from '../theme/ColorThemes';
import Button from '../constants/Button';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/loading';
import { setUser } from '../redux/slices/user';
import { setUserLoading } from '../redux/slices/user';

export default function SignInScreen() {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const {userLoading} = useSelector(state=> state.user);

    const dispatch = useDispatch();

    const handleSubmit = async ()=>{
        if(email && password){ 
            // good to go
            //navigation.navigate('Home');
            //await signInWithEmailAndPassword(auth, email, password);
           

             try{
                dispatch(setUserLoading(true));
                await signInWithEmailAndPassword(auth, email, password);
                dispatch(setUserLoading(false))
            }catch(e){
                Toast.show({
                    type: 'custom_error',
                    text1: 'Error',
                    text2: 'Invalid email and/or password',
                    position: 'bottom',
                });

            }
                


        }else{
            // show error
            Toast.show({
                type: 'custom_error',
                text1: 'Error',
                text2: 'Please enter both valid email and password.',
                position: 'bottom',
            });
        }
        
    }
    return (
        <ScreenWrapper>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', marginVertical: 12, color: colors.black }}>Sign In </Text>
                <Text style={{ fontSize: 16, color: colors.black }}>Welcome Back! </Text>
            </View>

            <View style={{ height: 575, marginBottom: 12 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginVertical: 8 }}> Email Address</Text>
                <View style={{ width: "100%", height: 48, borderColor: colors.black, borderWidth: 1, borderRadius: 8, alignItems: "center", justifyContent: "center", paddingLeft: 22 }}>
                    <TextInput
                        value = {email}
                        onChangeText={value=> setEmail(value)}
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
                        value = {password}
                        onChangeText={value=> setPassword(value)}
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
                    {
                        userLoading? (
                            <Loading />
                        ):(
                            <Button
                        title="Sign In"
                        filled
                        onPress={handleSubmit}
                        style={{
                            marginTop: 22,
                            width: "100%",
                        }}
                    />

                        )
                    }
                    
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
