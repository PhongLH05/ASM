import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const TextField = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder=""
        placeholderTextColor="#999"
        underlineColorAndroid={true}
      />
      <View style={styles.underline} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    color: '#999',
    marginBottom: 4,
  },
  input: {
    height: 30,
    fontSize: 16,
    padding: 0,
  },
  underline: {
    height: 2,
    backgroundColor: '#e0e0e0',
    marginTop: 4,
  },
});

export default TextField;
