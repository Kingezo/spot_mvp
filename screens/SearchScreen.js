import React, { useState } from 'react';
import { View, Text, TextInput,StyleSheet, TouchableOpacity } from 'react-native';
import ScreenWrapper from '../components/screenWrapper';

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  // Mock data for testing purposes
  const data = [
    { id: '1', title: 'Biweekly Payments' },
    { id: '2', title: 'Weekly Payments' },
    { id: '3', title: '$2000 Pools' },
    { id: '4', title: '$400 payments' },
    { id: '5', title: 'Pools with less than 5 people' },
  ];

  // Function to handle search filtering
  const handleSearch = (text) => {
    setSearchTerm(text);
    if (text) {
      const filteredData = data.filter((item) => 
        item.title.toLowerCase().includes(text.toLowerCase())
      );
      setSearchResults(filteredData);
    } else {
      setSearchResults([]);
    }
  };

  // Render each search result item
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.resultItem}>
      <Text style={styles.resultText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper>
    <View style={styles.container}>
      <Text style={styles.header}>Search</Text>
      
      <TextInput
        style={styles.searchBar}
        placeholder="Coming Soon..."
        value={searchTerm}
        onChangeText={handleSearch}
      />

      {searchResults.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {searchResults.map((item) => (
            <View key={item.id}>{renderItem({ item })}</View> 
          ))}
        </View>
      </ScrollView>
      
      ) : (
        <Text style={styles.placeholder}>Search for someone to start a group with!</Text>
      )}
    </View>
    </ScreenWrapper>

  );
};

export default SearchScreen;

// Styles for the search screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  searchBar: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  placeholder: {
    marginTop: 20,
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  resultItem: {
    padding: 12,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  resultText: {
    fontSize: 18,
    color: '#333',
  },
});
