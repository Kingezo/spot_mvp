import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Pressable} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import ScreenWrapper from '../components/screenWrapper';
import { colors } from '../theme/ColorThemes';
import Button from '../constants/Button';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { setUserLoading } from '../redux/slices/user';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/loading';

export default function SignUpScreen() {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const navigation = useNavigation();
    const {userLoading} = useSelector(state=> state.user);
    const dispatch = useDispatch();

    const handleSubmit = async ()=>{
        if(email && password == confirmedPassword){ 
            try{
                //dispatch(setUserLoading(true));
                //await createUserWithEmailAndPassword(auth, email, password);
                //dispatch(setUserLoading(false))
                navigation.navigate('PersonalInfo', { email, password });
                 // Navigate to PersonalInfoScreen after successful sign up
                 //navigation.navigate('PersonalInfo');

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
                <Text style={{ fontSize: 22, fontWeight: 'bold', marginVertical: 12, color: colors.black }}>Create Account </Text>
                <Text style={{ fontSize: 16, color: colors.black }}>Save money and build credit today! </Text>
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

                <Text style={{ fontSize: 16, fontWeight: 'bold', marginVertical: 8 }}> Create Password</Text>
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

                <Text style={{ fontSize: 16, fontWeight: 'bold', marginVertical: 8 }}> Confirm Password</Text>
                <View style={{ width: "100%", height: 48, borderColor: colors.black, borderWidth: 1, borderRadius: 8, alignItems: "center", justifyContent: "center", paddingLeft: 22 }}>
                    <TextInput
                        value = {confirmedPassword}
                        onChangeText={value=> setConfirmedPassword(value)}
                        placeholder='Confirm your Password'
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
                        title="Sign Up"
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
                    <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10 }}>Or Sign up With</Text>
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
                    
                </View>
                </View>
            </View>
            </ScreenWrapper>
    );
}