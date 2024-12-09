import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from './firebaseConfig';

const SportDetails = ({ route, navigation }) => {
  const { sport } = route.params;
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchGames = () => {
      const q = query(collection(db, 'eventListings'), orderBy('date'));

      // Real-time listener for Firestore
      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const allGames = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log('All games in Firestore:', allGames);

          // Filter by sport (case-insensitive)
          const filteredGames = allGames.filter(
            (game) => game.sport.toLowerCase() === sport.toLowerCase()
          );
          console.log('Filtered games:', filteredGames);

          setGames(filteredGames);
          setCurrentPage(1);
        },
        (error) => {
          console.error('Error fetching games:', error.message);
        }
      );

      return unsubscribe;
    };

    const unsubscribe = fetchGames();
    return () => unsubscribe(); // Cleanup listener on component unmount
  }, [sport]);

  // Pagination logic
  const totalPages = Math.ceil(games.length / itemsPerPage);
  const paginatedGames = games.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('GamePurchase', { game: item })}
    >
      <Text style={styles.itemTitle}>{item.game}</Text>
      <Text style={styles.itemDetails}>Date: {new Date(item.date).toDateString()}</Text>
      <Text style={styles.itemDetails}>Venue: {item.venue}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>{sport} Events</Text>
      </View>
      <FlatList
        data={paginatedGames}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.emptyListText}>No events found for {sport}.</Text>}
      />
      <View style={styles.pagination}>
        <TouchableOpacity
          style={[styles.pageButton, currentPage === 1 && styles.disabledButton]}
          onPress={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <Text style={styles.pageButtonText}>Previous</Text>
        </TouchableOpacity>
        <Text style={styles.pageIndicator}>
          Page {currentPage} of {totalPages}
        </Text>
        <TouchableOpacity
          style={[styles.pageButton, currentPage === totalPages && styles.disabledButton]}
          onPress={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <Text style={styles.pageButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    paddingHorizontal: 20,
    paddingTop: 50, // Ensures space below the safe area
    paddingBottom: 10,
    backgroundColor: '#C8102E',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  itemDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  emptyListText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
    marginTop: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  pageButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  pageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pageIndicator: {
    fontSize: 16,
    color: '#333',
  },
});

export default SportDetails;