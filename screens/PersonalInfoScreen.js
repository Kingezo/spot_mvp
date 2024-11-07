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

export default function PersonalInfoScreen({route,}) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigation = useNavigation();
    const {userLoading} = useSelector(state=> state.user);
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        const { email, password } = route.params || { email: '', password: '' }; // Default to empty strings if not found
        if (firstName && lastName) {
            try {
                dispatch(setUserLoading(true));

                // Create user with email and password
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // Update user profile with first and last name
                await user.updateProfile({
                    displayName: `${firstName} ${lastName}`,
                });

                dispatch(setUserLoading(false));
                navigation.navigate('Home'); // Navigate to home or profile screen
            } catch (e) {
                dispatch(setUserLoading(false));
                console.error("Error creating user: ", e); // Log the actual error for debugging
                //Toast.show({
                    //type: 'custom_error',
                   // text1: 'Error',
                  //  text2: 'Failed. Please try again.',
                    //position: 'bottom',
               // });
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
                <Text style={{ fontSize: 22, fontWeight: 'bold', marginVertical: 12, color: colors.black }}>Create Account </Text>
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