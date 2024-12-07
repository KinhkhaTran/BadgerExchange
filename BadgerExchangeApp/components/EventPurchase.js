import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { CartContext } from './CartContext';
import { PurchaseContext } from './PurchaseContext';

const EventPurchase = ({ route, navigation }) => {
  const { event } = route.params;
  const { addToCart } = useContext(CartContext);
  const { addToPurchaseList } = useContext(PurchaseContext);

  const handleAddToCart = () => {
    addToCart(event);
    Alert.alert('Success', `${event.game} has been added to your cart.`);
  };

  const handlePurchase = async () => {
    try {
      addToPurchaseList(event);
      await deleteDoc(doc(db, 'eventListings', event.id));
      Alert.alert('Purchase Complete', `You have purchased ${event.game} for $${event.price}.`);
      navigation.navigate('Sports');
    } catch (error) {
      console.error('Error removing event:', error.message);
      Alert.alert('Error', 'Could not complete the purchase. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bucky Exchange</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.bookTitle}>{event.game}</Text>
        <Text style={styles.detail}>Sport: {event.sport}</Text>
        <Text style={styles.detail}>Price: ${event.price}</Text>
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
  bookTitle: {
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

export default EventPurchase;
