import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { auth } from '../config/firebase';
import { setUser } from '../redux/slices/user';

import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import CustomHeader from '../components/CustomHeader';
import PersonalInfoScreen from '../screens/PersonalInfoScreen';

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
          backgroundColor: 'white',
          height: 60,
          borderTopWidth: 0,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default function AppNavigation() {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        // Fetch display name if it exists
        const nameParts = u.displayName ? u.displayName.split(" ") : ["", ""];

        // Sanitize the user object before dispatching to Redux
        const cleanUser = {
          uid: u.uid,
          email: u.email,
          firstName: nameParts[0] || null, // add first name later
          lastName: nameParts[1] || null,
          emailVerified: u.emailVerified,
          displayName: u.displayName || null,
          phoneNumber: u.phoneNumber || null,
          photoURL: u.photoURL || null,
          providerData: u.providerData.map(provider => ({
            providerId: provider.providerId,
            uid: provider.uid,
          })), // Keep only serializable parts
          createdAt: u.metadata?.creationTime || null,
          lastLoginAt: u.metadata?.lastSignInTime || null,
        };
        dispatch(setUser(cleanUser));
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe(); // ✅ Cleanup function to prevent memory leaks
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName={user ? 'Main' : 'Welcome'}
        screenOptions={({ navigation, route }) => ({
          CustomHeader: () => <CustomHeader title={route.name} navigation={navigation} />,
        })}
      >
        {user ? (
          <Stack.Screen options={{ headerShown: false }} name="Main" component={TabNavigator} />
        ) : (
          <>
            <Stack.Screen options={{ headerShown: false }} name="Welcome" component={WelcomeScreen} />
            <Stack.Screen options={{ headerShown: false }} name="SignIn" component={SignInScreen} />
            <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUpScreen} />
            <Stack.Screen options={{ headerShown: false }} name="PersonalInfo" component={PersonalInfoScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}