import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressBar = ({ progress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Progress</Text>
        <Text style={styles.percentage}>{progress}%</Text>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: `${progress}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    width: '100%',
    marginBottom: 20
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontSize: 10,
    color: '#333',
    fontWeight: 'bold',
  },
  percentage: {
    fontSize: 10,
    color: '#333',
  },
  progressBar: {
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%'
  },
  progress: {
    height: '100%',
    backgroundColor: '#76c7c0',
    borderRadius: 10,
  },
});

export default ProgressBar;