import React, { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from '../components/CartContext';
import { PurchaseContext } from '../components/PurchaseContext';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { auth, db } from './firebaseConfig';
import { doc, deleteDoc, getDoc } from 'firebase/firestore';



const AccountScreen = () => {
  const { cart,removeFromCart } = useContext(CartContext);
  const { purchase, addToPurchaseList} = useContext(PurchaseContext);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const handlePurchase = async (item) => {
    try {
      console.log(item.id);
      if(item.bookTitle){
        await deleteDoc(doc(db, 'bookListings', item.id))
      } else{
        await deleteDoc(doc(db, 'eventListings', item.id))
      }
  
      removeFromCart(item.id);
      addToPurchaseList(item); // Pass the complete item, not just the ID
  
      Alert.alert(
        'Purchase Successful',
        `You have purchased "${item.bookTitle || item.game}" for $${item.price}.`
      );
    } catch (error) {
      console.error('Error removing item from Firebase:', error.message);
      Alert.alert('Error', 'Could not complete the purchase. Please try again.');
    }
    finally{
      setLoading(false);
    }
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.itemBox}>
      <Text style={styles.itemTitle}>{item.bookTitle || item.game}</Text>
      <Text style={styles.itemPrice}>${item.price}</Text>
      <View style={styles.itemActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => removeFromCart(item.id)}
        >
          <Text style={styles.removeButton}>Remove</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.purchaseButton]}
          onPress={() => handlePurchase(item)}
        >
          <Text style={styles.purchaseText}>Purchase</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPurchaseItem = ({ item }) => (
    <View style={styles.itemBox}>
      <Text style={styles.itemTitle}>
        {item.bookTitle || item.game} {/* Fallback to handle missing data */}
      </Text>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => Alert.alert('Details', `Details for item ${item.bookTitle || item.game}`)}
      >
        <Text style={styles.detailsButton}>View Details</Text>
      </TouchableOpacity>
    </View>
  );


  const handleLogout = () => {
    console.log('User logged out');
    navigation.navigate('Login');
  };


  const [userData, setUserData] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.log('No such document!');
          }
        } else {
          console.log('User is not logged in');
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bucky Exchange</Text>
        <Icon name="bell-outline" size={30} color="#fff" />
      </View>

      <View style={styles.profileSection}>
        <Image
          source={require('../assets/profile-placeholder.jpg')} // Placeholder image
          style={styles.profileImage}
        />
        <View>
        <Text style={styles.profileName}>{userData.name}</Text>
          <Text style={styles.profileEmail}>{userData.email}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>My Cart</Text>
      <FlatList
        horizontal
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.sectionContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Your cart is empty.</Text>
        }
      />

      <View style={styles.searchContainer}>
        <Icon name="menu" size={24} color="#666" style={styles.menuIcon} />
        <TextInput
          placeholder="Search your items"
          placeholderTextColor="#aaa"
          style={styles.searchInput}
        />
        <Icon name="magnify" size={24} color="#666" />
      </View>

      <Text style={styles.sectionTitle}>My Events/Books</Text>
      <FlatList
        horizontal
        data={purchase} 
        renderItem={renderPurchaseItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.sectionContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>You have no purchases.</Text>
        }
      />

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="home-outline" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Sports')}>
          <Icon name="basketball" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Create', { userData })} style={styles.addButton}>
          <Icon name="plus" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Books')}>
          <Icon name="book-outline" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Account')}>
          <Icon name="account-outline" size={30} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C8102E',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
    backgroundColor: '#ddd',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileEmail: {
    fontSize: 16,
    color: '#fff',
  },
profileClass: {
    fontSize: 16,
    color: '#fff',
  },
  logoutButton: {
    backgroundColor: '#ff5c5c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 25,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  menuIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#000',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 20,
    marginBottom: 10,
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
      },
  itemBox: {
    width: 150,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  itemTitle: {
    color: '#000', // Sets the text color to black
    fontSize: 18, // Optional: Set the font size for better readability
    fontWeight: '600', // Optional: Make the text a bit bold for emphasis
    marginBottom: 5, // Optional: Add some margin for spacing
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#f2f2f2',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
});

export default AccountScreen;
