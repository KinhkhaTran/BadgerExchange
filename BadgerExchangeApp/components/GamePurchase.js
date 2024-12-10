import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { CartContext } from './CartContext';
import { PurchaseContext } from './PurchaseContext';

const GamePurchase = ({ route, navigation }) => {
  const { game } = route.params; 
  const { addToCart } = useContext(CartContext);
  const { addToPurchaseList } = useContext(PurchaseContext);

  const handleAddToCart = () => {
    addToCart(game);
    console.log(game)
    Alert.alert('Success', `${game.game} has been added to your cart.`);
  };

  const handlePurchase = async () => {
    console.log('ID passed for deletion:', game.id);
    const docRef = doc(db, 'eventListings', game.id);
    console.log('Firestore docRef:', docRef.path);
    try {
      // Ensure game.id exists and matches Firestore's document ID
      if (!game.id) {
        Alert.alert('Error', 'Event ID is missing.');
        return;
      }
      console.log(game.id);
  
      // Attempt to delete the document
      await deleteDoc(doc(db, 'eventListings', game.id));
  
      Alert.alert('Purchase Complete', `You have purchased tickets for ${game.game}.`);
      
      // Navigate back to refresh the list
      navigation.goBack();
    } catch (error) {
      console.error('Error removing event:', error.message);
      Alert.alert('Error', 'Could not complete the purchase. Please try again.');
    }
    addToPurchaseList(game);

  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bucky Exchange</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.gameTitle}>{game.name}</Text>
        <Text style={styles.detail}>Sport: {game.sport}</Text>
        <Text style={styles.detail}>Date: {new Date(game.date).toDateString()}</Text>
        <Text style={styles.detail}>Venue: {game.venue}</Text>
        <Text style={styles.detail}>Price: ${game.price}</Text>
        <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.purchaseButton]} onPress={handlePurchase}>
          <Text style={styles.buttonText}>Purchase</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C8102E',
    paddingTop: 20
  },
  header: {
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C8102E',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  gameTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#C8102E',
    marginBottom: 20,
    textAlign: 'center',
  },
  detail: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  purchaseButton: {
    backgroundColor: '#C8102E',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#C8102E',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GamePurchase;
