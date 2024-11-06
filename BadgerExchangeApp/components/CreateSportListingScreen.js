import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CreateSportListingScreen = ({ navigation }) => {

    const [sport, setSport] = useState('');
    const [game, setGame] = useState('');
    const [price, setPrice] = useState('');
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>BuckyExchange</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Feed')}>
                <Icon name="bell-outline" size={30} color="#fff" />
            </TouchableOpacity>
        </View>

         {/* Back Button */}
         <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={30} color="#fff" />
          <Text style={styles.sectionTitle}>Create Sport Event Listing</Text>
        </TouchableOpacity>
  
        {/* Information Input -> need to implement storing this in database */}
        <Text style={styles.inputTitles}>Sport Category</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Sport (ex: Men's Basketball)"
            placeholderTextColor="#aaa"
            value={sport}
            onChangeText={setSport}
            keyboardType="text"
          />
        </View>
  
        <Text style={styles.inputTitles}>Event</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Event (ex: Purdue - Oct 17th, 2024)"
            placeholderTextColor="#aaa"
            value={game}
            keyboardType="text"
            onChangeText={setGame}
          />
        </View>

        <Text style={styles.inputTitles}>Price</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Price"
            placeholderTextColor="#aaa"
            value={price}
            keyboardType="numeric"
            onChangeText={setPrice}
          />
        </View>

        {/* Login Button -> navigate to home page upon logging in*/}
        <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('Account')}>
            <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C8102E', // default Wisconsin Red background color
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    width: '90%',
    paddingHorizontal: 10,
    marginLeft: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputTitles: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 20,
    alignItems: 'center',
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30,
  },
  createButton: {
    backgroundColor: '#666',
    paddingVertical: 10,
    width: '90%',
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    marginLeft: 20,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default CreateSportListingScreen;
