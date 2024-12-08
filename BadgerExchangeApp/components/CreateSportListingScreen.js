import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CreateSportListingScreen = ({ route, navigation }) => {
  const addEventToList = route?.params?.addEventToList || (() => {}); 

  const [sport, setSport] = useState('');
  const [game, setGame] = useState('');
  const [price, setPrice] = useState('');
  const [venue, setVenue] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleCreateListing = async () => {
    if (!sport || !game || !price || !venue || !date || !time) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      const newEvent = {
        sport,
        game,
        price: parseFloat(price),
        venue,
        date,
        time,
        createdAt: new Date(), 
      };

      const docRef = await addDoc(collection(db, 'eventListings'), newEvent);
      addEventToList({ ...newEvent, id: docRef.id }); 
      Alert.alert('Success', 'Sport event created successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error creating listing:', error.message);
      Alert.alert('Error', 'An error occurred while creating the listing. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={30} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.title}>Create Sport Listing</Text>
      <TextInput
        style={styles.input}
        placeholder="Sport (e.g., Men's Basketball)"
        placeholderTextColor="#000"
        value={sport}
        onChangeText={setSport}
      />
      <TextInput
        style={styles.input}
        placeholder="Game (e.g., Wisconsin vs Purdue)"
        placeholderTextColor="#000"
        value={game}
        onChangeText={setGame}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        placeholderTextColor="#000"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Venue (e.g., Kohl Center)"
        placeholderTextColor="#000"
        value={venue}
        onChangeText={setVenue}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (e.g., 2024-12-31)"
        placeholderTextColor="#000"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Time (e.g., 7:00 PM)"
        placeholderTextColor="#000"
        value={time}
        onChangeText={setTime}
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateListing}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C8102E',
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    color: '#000',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateSportListingScreen;
