import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from './firebaseConfig';

const FeedScreen = () => {
  const navigation = useNavigation();
  const [bookPosts, setBookPosts] = useState([]);

  useEffect(() => {
    const fetchRecentBookPosts = () => {
      try {
        const bookPostsQuery = query(
          collection(db, 'bookListings'),
          orderBy('createdAt', 'desc'), // Order by most recent
          limit(10) // Limit to the 10 most recent posts
        );

        const unsubscribe = onSnapshot(bookPostsQuery, (snapshot) => {
          const posts = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setBookPosts(posts);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching book posts:', error.message);
      }
    };

    fetchRecentBookPosts();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.notificationItem}
      onPress={() => navigation.navigate('BookPurchase', { book: item })}
    >
      <Icon name="book-outline" size={24} color="#C8102E" style={styles.icon} />
      <View>
        <Text style={styles.notificationTitle}>{item.bookTitle}</Text>
        <Text style={styles.notificationDetail}>Course: {item.course}</Text>
        <Text style={styles.notificationDetail}>Price: ${item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Recent Textbook Listings</Text>
      </View>

      <FlatList
        data={bookPosts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No recent book posts available.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C8102E',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    marginRight: 10,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationDetail: {
    fontSize: 14,
    color: '#555',
  },
  emptyText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    marginTop: 20,
  },
});

export default FeedScreen;
