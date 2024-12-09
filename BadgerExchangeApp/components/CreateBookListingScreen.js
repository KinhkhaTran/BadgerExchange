import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { db } from './firebaseConfig';
import { collection, addDoc, getDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Import Firebase Auth
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CreateBookListingScreen = ({ route, navigation }) => {
  const addBookToList = route?.params?.addBookToList || (() => {});

  const [course, setCourse] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [price, setPrice] = useState('');
  const [sellerName, setSellerName] = useState('');

  useEffect(() => {
    // Fetch the logged-in user's name
    const fetchUserData = async () => {
      try {
        const auth = getAuth(); // Initialize Firebase Auth
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setSellerName(userDoc.data().name || 'Unknown');
          } else {
            console.error('User document not found in Firestore');
          }
        } else {
          console.error('No authenticated user found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleCreateListing = async () => {
    if (!course || !bookTitle || !price) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      const newBook = {
        course,
        bookTitle,
        price: parseFloat(price),
        seller: sellerName, // Use the seller's name
        createdAt: new Date(),
      };

      const docRef = await addDoc(collection(db, 'bookListings'), newBook);
      addBookToList({ ...newBook, id: docRef.id }); // Add to the list dynamically
      Alert.alert('Success', 'Book listing created successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error creating listing:', error.message);
      Alert.alert('Error', 'An error occurred while creating the listing. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" paddingTop={25} size={30} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.title}>Create Book Listing</Text>
      <TextInput
        style={styles.input}
        placeholder="Course (e.g., CS 407)"
        placeholderTextColor="#000"
        value={course}
        onChangeText={setCourse}
      />
      <TextInput
        style={styles.input}
        placeholder="Book Title"
        placeholderTextColor="#000"
        value={bookTitle}
        onChangeText={setBookTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        placeholderTextColor="#000"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
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

export default CreateBookListingScreen;