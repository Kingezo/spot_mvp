import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import CustomHeader from '../components/CustomHeader';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { setUser } from '../redux/slices/user';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#00A86B',
        tabBarInactiveTintColor: '#50C878',
        tabBarStyle: { 
          backgroundColor: 'white',      // Background color of tab bar
          height: 60,                      // Height of the tab bar
          borderTopWidth: 0,               // Border style (optional)
        }
      })}
    >


      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      
      
    </Tab.Navigator>
  );
}

export default function AppNavigation() {
  const {user} = useSelector(state=> state.user);

  const dispatch = useDispatch();

  onAuthStateChanged(auth, u=>{
    console.log('got user: ',u);
    dispatch(setUser(u));
  })

  if(user){
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName= 'Main' screenOptions={({ navigation, route }) => ({
            CustomHeader: () => (
              <CustomHeader title={route.name} navigation={navigation} />
            ),
          })}
        >
          <Stack.Screen options ={{ headerShown: false }} name="Main" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    );

  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName= 'Welcome' screenOptions={({ navigation, route }) => ({
            CustomHeader: () => (
              <CustomHeader title={route.name} navigation={navigation} />
            ),
          })}
        >
          <Stack.Screen options= {{headerShown: false}}name="Welcome" component={WelcomeScreen} />
          <Stack.Screen options= {{headerShown: false}}name="SignIn" component={SignInScreen} />
          <Stack.Screen options= {{headerShown: false}}name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );

  }
  
}