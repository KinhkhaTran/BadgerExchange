import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SectionList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { db } from './firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';

const TextbookScreen = ({ navigation }) => {
  const [bookListings, setBookListings] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [groupedBooks, setGroupedBooks] = useState([]);

  // Real-time listener for Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'bookListings'),
      (querySnapshot) => {
        const books = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookListings(books);
        groupByCourse(books); // Group books by course whenever the data changes
      },
      (error) => {
        console.error('Error listening to book listings:', error.message);
        Alert.alert('Error', 'Could not load book listings. Please try again.');
      }
    );

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  const groupByCourse = (books) => {
    const grouped = books.reduce((acc, book) => {
      const course = book.course.toLowerCase();
      if (!acc[course]) acc[course] = [];
      acc[course].push(book);
      return acc;
    }, {});
    const sections = Object.keys(grouped).map((course) => ({
      title: course.toUpperCase(),
      data: grouped[course],
    }));
    setGroupedBooks(sections);
  };

  const handleSearch = (text) => {
    setSearchText(text);
    if (!text.trim()) {
      groupByCourse(bookListings);
    } else {
      const filtered = bookListings.filter(
        (book) =>
          book.bookTitle.toLowerCase().includes(text.toLowerCase()) ||
          book.course.toLowerCase().includes(text.toLowerCase())
      );
      groupByCourse(filtered);
    }
  };

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('BookPurchase', { book: item })}
    >
      <Text style={styles.itemName}>{item.bookTitle}</Text>
      <Text style={styles.itemPrice}>Price: ${item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bucky Exchange</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Feed')}>
          <Icon name="bell-outline" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search by book title or course"
          placeholderTextColor="#aaa"
          style={styles.searchInput}
          value={searchText}
          onChangeText={handleSearch}
        />
        <Icon name="magnify" size={24} color="#666" />
      </View>
      <SectionList
        sections={groupedBooks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>
            No books available. Try searching for something else.
          </Text>
        }
      />
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="home-outline" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Sports')}>
          <Icon name="basketball" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Create')} style={styles.addButton}>
          <Icon name="plus" size={30} color="#000" />
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
    paddingTop: 60,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#000',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#fff',
    color: '#C8102E',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  itemPrice: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  emptyListText: {
    textAlign: 'center',
    color: '#fff',
    marginTop: 20,
    fontSize: 16,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#f2f2f2',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 10,
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

export default TextbookScreen;
