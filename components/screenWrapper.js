import React from 'react';
import { View, SafeAreaView, StatusBar } from 'react-native';


export default function ScreenWrapper({ children, title, navigation }) {
  let statusBarHeight = StatusBar.currentHeight || 0;

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: statusBarHeight }}>
      <View style={{ flex: 1 }}>
        {children}
      </View>
    </SafeAreaView>
  );
}