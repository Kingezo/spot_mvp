import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

const UserItem = ({message}) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={styles.card} onPress={() =>navigation}>
            <Text> {message} </Text>
          

        </TouchableOpacity>
    );

}

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: '#c5c5c5',
        borderRadius: 10,
        marginVertical: 5,
        padding: 30,
    }

})

export default UserItem;