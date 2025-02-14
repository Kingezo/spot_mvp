import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { colors } from '../theme/ColorThemes';

const Button = (props) => {
    const filledBgColor = props.color || colors.primary;
    const outlinedColor = colors.white;
    const bgColor = props.filled ? filledBgColor : outlinedColor;
    const textColor = props.filled ? colors.white : colors.primary;

    return (
        <TouchableOpacity
            style={{
                ...styles.button,
                ...{ backgroundColor: bgColor },
                ...props.style
            }}
            onPress={props.onPress}
        >
            <Text style={{ fontSize: 18, ... { color: 'white' , fontWeight: "bold" } }}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingBottom: 16,
        paddingVertical: 10,
        borderColor: colors.primary,
        borderWidth: 0,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default Button