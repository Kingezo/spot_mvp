import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Pressable} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import ScreenWrapper from '../components/screenWrapper';
import { colors } from '../theme/ColorThemes';
import Button from '../constants/Button';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Toast from 'react-native-toast-message';
import { auth } from '../config/firebase';
import { setUserLoading } from '../redux/slices/user';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/loading';
import { setUserInfo, updateUser } from '../redux/slices/user';
import { updateProfile } from "firebase/auth";
import axios from 'axios';
//import { updateUser } from '../redux/userSlice';

export default function PersonalInfoScreen({route,}) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigation = useNavigation();
    const {userLoading} = useSelector(state=> state.user);
    const dispatch = useDispatch();
    const { email, password } = route.params || { email: '', password: '' }; // Default to empty strings if not found, is currently not working

    const handleSubmit = async () => {
        
        console.log('From Redux:', email, password);
        if (firstName && lastName && phoneNumber) {
            try {
                dispatch(setUserLoading(true));

                // Create user with email and password
                const userCredential = await createUserWithEmailAndPassword(auth, email, password); // is currently the only parameter that is working
                const user = userCredential.user;

                  // ✅ Update Firebase Auth profile with first & last name
            await updateProfile(user, {
                displayName: `${firstName} ${lastName}`,
            });

            console.log('Updated Display Name:', user.displayName);

               

                // Reload user to make sure the display name is updated
                await user.reload();
                dispatch(updateUser({
                    firstName,
                    lastName,
                    email,
                    firebaseUid: user.uid,
                  }));

                  // ✅ Sync with Django Backend
            const response = await axios.post('http://192.168.1.96:8000/users/', {
                first_name: firstName,    // ✅ snake_case
                last_name: lastName,      // ✅ snake_case
                email: email,
                phone_number: phoneNumber,
                firebase_uid: user.uid,
            }, {
                headers: { 'Content-Type': 'application/json' },
            });
            console.log('✅ Django API Response:', response.data);

            dispatch(setUserLoading(false));
            navigation.navigate('Home');

 
        } catch (error) {
            dispatch(setUserLoading(false));
      console.error('❌ Error:', error.response?.data || error.message);
    }
        } else {
            Toast.show({
                type: 'custom_error',
                text1: 'Error',
                text2: 'Please enter first and last name',
                position: 'bottom',
            });
        }
    };

    
    return (
        <ScreenWrapper>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', marginVertical: 12, color: colors.black }}>{email}</Text>
                <Text style={{ fontSize: 16, color: colors.black }}>Save money and build credit today!</Text>
            </View>

            <View style={{ height: 575, marginBottom: 12 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginVertical: 8 }}> First Name</Text>
                <View style={{ width: "100%", height: 48, borderColor: colors.black, borderWidth: 1, borderRadius: 8, alignItems: "center", justifyContent: "center", paddingLeft: 22 }}>
                    <TextInput
                        value = {firstName}
                        onChangeText={value=> setFirstName(value)}
                        placeholder='Enter your legal first name'
                        placeholderTextColor={colors.black}
                        keyboardType='email-address'
                        style={{
                            width: "100%"
                        }}
                    />
                </View>

                <Text style={{ fontSize: 16, fontWeight: 'bold', marginVertical: 8 }}> Last Name</Text>
                <View style={{ width: "100%", height: 48, borderColor: colors.black, borderWidth: 1, borderRadius: 8, alignItems: "center", justifyContent: "center", paddingLeft: 22 }}>
                    <TextInput
                        value = {lastName}
                        onChangeText={value=> setLastName(value)}
                        placeholder='Enter your legal last name'
                        placeholderTextColor={colors.black}
                        style={{
                            width: "100%"
                        }}
                    />
                </View>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginVertical: 8 }}> Phone Number</Text>
                <View style={{ width: "100%", height: 48, borderColor: colors.black, borderWidth: 1, borderRadius: 8, alignItems: "center", justifyContent: "center", paddingLeft: 22 }}>
                    <TextInput
                        value = {phoneNumber}
                        onChangeText={value=> setPhoneNumber(value)}
                        placeholder='Enter your phone number'
                        placeholderTextColor={colors.black}
                        style={{
                            width: "100%"
                        }}
                    />
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
                        title="Continue"
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

            </View>
            </ScreenWrapper>
    );
}