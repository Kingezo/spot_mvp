import React  from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { colors } from '../theme/ColorThemes';

export default function Loading() {
  
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 16, marginLeft: 160 }}>
        <ActivityIndicator size="large" color = {"green"} />
      </View>
    )
}
  

