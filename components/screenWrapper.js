import { View, StatusBar, SafeAreaView } from 'react-native';
import React from 'react';

export default function ScreenWrapper({ children }) {
    let statusBarHeight = StatusBar.currentHeight || 0;

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: statusBarHeight }}>
            {children}
        </SafeAreaView>
    );
}
