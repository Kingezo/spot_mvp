import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigation from './navigation/appNavigation';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Toast from 'react-native-toast-message';


// Step 1: Custom toast configuration
const toastConfig = {
    custom_error: ({ text1, text2, props }) => (
        <View style={{
            height: 60,
            width: '90%',
            backgroundColor: '#ff3b30', // Error background color
            borderRadius: 8,
            paddingHorizontal: 16,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowRadius: 10,
            elevation: 5,
        }}>
            <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}> {text1}</Text>
            <Text style={{ fontSize: 14, color: '#fff' }}>{text2}</Text>
        </View>
    ),
};

export default function App() {
    return (
        <Provider store={store}>
            <AppNavigation />
            {/* Step 2: Add the custom toast configuration */}
            <Toast config={toastConfig} />
            <StatusBar style="auto" />
        </Provider>
    );
}
