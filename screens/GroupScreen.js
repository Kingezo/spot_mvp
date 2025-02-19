import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../config/firebase';
import { collection, query, where, getDocs } from '../config/firebase'

export default function GroupScreen({ navigation }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]); // ✅ Add search results state
  const [loading, setLoading] = useState(false); // ✅ Track loading state
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [amount, setAmount] = useState('');

  const fetchUsersByEmail = async (email) => {
    if (!email) return [];
  
    try {
      console.log(`🔍 Searching for users with email: ${email}`); // ✅ Log search term
  
      const usersRef = collection(db, 'users');
      const q = query(
        usersRef,
        where('email', '>=', email.toLowerCase()),
        where('email', '<=', email.toLowerCase() + '\uf8ff')
      );
  
      const snapshot = await getDocs(q);
  
      if (snapshot.empty) {
        console.log('⚠️ No users found.');
      } else {
        console.log(`✅ Found ${snapshot.size} users:`, snapshot.docs.map(doc => doc.data()));
      }
  
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('❌ Error fetching users:', error);
      return [];
    }
  };
  

  const fetchUsers = async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    try {
      const users = await fetchUsersByEmail(query);
      setSearchResults(users);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const addUser = (user) => {
    if (selectedUsers.length < 3 && !selectedUsers.some(u => u.id === user.id)) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  return (
    <ScrollView>
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
          placeholder="Search for users by email..."
          value={searchTerm}
          onChangeText={(text) => {
            setSearchTerm(text);
            fetchUsers(text);
          }}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#00A86B" />
        ) : (
          <ScrollView style={styles.userList}>
            {searchResults.length > 0 ? (
              searchResults.map((user) => (
                <TouchableOpacity key={user.id} style={styles.userItem} onPress={() => addUser(user)}>
                  <Text>{user.firstName} {user.lastName} ({user.email})</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noResults}>No users found</Text>
            )}
          </ScrollView>
        )}

        <View style={styles.selectionContainer}>
          {Array.from({ length: 3 }).map((_, index) => (
            <View key={index} style={styles.userBox}>
              <Text>{selectedUsers[index]?.firstName || 'Empty'}</Text>
            </View>
          ))}
        </View>

        <Button
          title="Start Group"
          disabled={selectedUsers.length < 3 || !amount}
          onPress={() => alert('Group Created!')}
        />
      </View>
    </ScrollView>
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
  noResults: { textAlign: 'center', color: '#888', marginTop: 10 },
  selectionContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  userBox: { width: 100, height: 100, borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 8 },
});

