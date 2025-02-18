// GroupScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';


export default function GroupScreen({ navigation }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [amount, setAmount] = useState('');
  
  const users = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];
  const filteredUsers = users.filter(user =>
    user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addUser = (user) => {
    if (selectedUsers.length < 3 && !selectedUsers.includes(user)) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const removeUser = (user) => {
    setSelectedUsers(selectedUsers.filter(u => u !== user));
  };

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Create a Group</Text>

    

    <View style={styles.amountContainer}>
      <Text style={styles.dollarSign}>$</Text>
      <TextInput
        style={styles.amountInput}
        placeholder="Enter Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
    </View>

    <TextInput
      style={styles.searchBar}
      placeholder="Search for users..."
      value={searchTerm}
      onChangeText={setSearchTerm}
    />

    <ScrollView style={styles.userList}>
      {filteredUsers.map((user, index) => (
        <TouchableOpacity key={index} style={styles.userItem} onPress={() => addUser(user)}>
          <Text>{user}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>

    <View style={styles.selectionContainer}>
      {Array.from({ length: 3 }).map((_, index) => (
        <View key={index} style={styles.userBox}>
          <Text>{selectedUsers[index] || 'Empty'}</Text>
          {selectedUsers[index] && (
            <Button title="Remove" onPress={() => removeUser(selectedUsers[index])} />
          )}
        </View>
      ))}
    </View>

    <Button title="Start Group" disabled={selectedUsers.length < 3 || !amount} onPress={() => alert('Group Started!')} />
  </View>
);
}

const styles = StyleSheet.create({
container: { flex: 1, padding: 16 },
title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
amountContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, borderWidth: 1, borderRadius: 8, paddingHorizontal: 12 },
dollarSign: { fontSize: 18, fontWeight: 'bold', marginRight: 4 },
amountInput: { flex: 1, height: 40, fontSize: 16 },
searchBar: { height: 40, borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, marginBottom: 16 },
userList: { maxHeight: 150, marginBottom: 16 },
userItem: { padding: 10, borderBottomWidth: 1 },
selectionContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
userBox: { width: 100, height: 100, borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 8 },
});