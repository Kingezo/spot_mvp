import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen options= {{headerShown: false}}name="Home" component={HomeScreen} />
        <Stack.Screen options= {{headerShown: false}}name="Welcome" component={WelcomeScreen} />
        <Stack.Screen options= {{headerShown: false}}name="SignIn" component={SignInScreen} />
        <Stack.Screen options= {{headerShown: false}}name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}