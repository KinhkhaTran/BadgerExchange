import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { doc, deleteDoc, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { CartContext } from './CartContext';
import { PurchaseContext } from './PurchaseContext';
import { auth } from './firebaseConfig';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

if (!auth.currentUser) {
  console.error('User is not authenticated!');
} else {
  console.log('Authenticated user:', auth.currentUser.uid);
}

const BookPurchase = ({ route, navigation }) => {
  const { book } = route.params;
  const { addToCart } = useContext(CartContext);
  const { addToPurchaseList } = useContext(PurchaseContext);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Fetch messages in real-time
  useEffect(() => {
    const chatRoomId = `book-${book.id}`; // Unique chat room ID for each book
    const chatQuery = query(
      collection(db, 'chats', chatRoomId, 'messages'),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(chatQuery, (snapshot) => {
      const chatMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(chatMessages);
    });

    return () => unsubscribe();
  }, [book.id]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const chatRoomId = `book-${book.id}`;
      const messagesCollection = collection(db, 'chats', chatRoomId, 'messages');

      await addDoc(messagesCollection, {
        text: newMessage,
        sender: userData?.name || 'User', // Use the logged-in user's email
        timestamp: serverTimestamp(),
      });

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error.message);
      Alert.alert('Error', 'Could not send the message.');
    }
  };

  const handleAddToCart = () => {
    addToCart(book);
    Alert.alert('Success', `${book.bookTitle} has been added to your cart.`);
  };

  const handlePurchase = async () => {
    try {
      addToPurchaseList(book);
      await deleteDoc(doc(db, 'bookListings', book.id));
      Alert.alert('Purchase Complete', `You have purchased ${book.bookTitle} for $${book.price}.`);
      console.log('Book being passed:', book);
      navigation.navigate('BookPurchase', { book });
    } catch (error) {
      console.error('Error removing book:', error.message);
      Alert.alert('Error', 'Could not complete the purchase. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Bucky Exchange</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.bookTitle}>{book.bookTitle}</Text>
        <Text style={styles.detail}>Course: {book.course}</Text>
        <Text style={styles.detail}>Price: ${book.price}</Text>
        <Text style={styles.detail}>Seller: {book.seller || 'Unknown'}</Text>
        <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.purchaseButton]} onPress={handlePurchase}>
          <Text style={styles.buttonText}>Purchase</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButtonSecondary} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>

      {/* Chat Room */}
      <View style={styles.chatContainer}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.messageBox}>
              <Text style={styles.messageSender}>{item.sender}</Text>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
          contentContainerStyle={styles.messageList}
        />
        <View style={styles.inputContainer}>
          <TextInput
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type your message..."
            style={styles.input}
          />
          <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    padding: 20,
    backgroundColor: '#C8102E',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bookTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#C8102E',
    marginBottom: 10,
  },
  detail: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  button: {
    backgroundColor: '#C8102E',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  purchaseButton: {
    backgroundColor: '#FF5C5C',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButtonSecondary: {
    marginTop: 20,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#C8102E',
    fontSize: 16,
    fontWeight: 'bold',
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  messageList: {
    paddingBottom: 10,
  },
  messageBox: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
  },
  messageSender: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#C8102E',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#C8102E',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default BookPurchase;
