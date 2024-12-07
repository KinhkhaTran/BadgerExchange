import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const SportDetails = ({ route }) => {
  const { sport, events } = route.params;

  const PAGE_SIZE = 4; 
  const totalPages = Math.ceil(events.length / PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState(events.slice(0, PAGE_SIZE));

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const startIndex = (page - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      setCurrentData(events.slice(startIndex, endIndex)); 
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.game}</Text>
      <Text style={styles.itemVenue}>Venue: {item.venue}</Text>
      <Text style={styles.itemPrice}>Price: ${item.price}</Text>
      <Text style={styles.itemDateTime}>
        Date: {item.date} | Time: {item.time}
      </Text>
    </View>
  );

  const renderPagination = () => (
    <View style={styles.paginationContainer}>
      {Array.from({ length: totalPages }).map((_, index) => {
        const page = index + 1;
        return (
          <TouchableOpacity
            key={page}
            style={[
              styles.pageButton,
              page === currentPage && styles.activePageButton,
            ]}
            onPress={() => handlePageChange(page)}
          >
            <Text
              style={[
                styles.pageButtonText,
                page === currentPage && styles.activePageButtonText,
              ]}
            >
              {page}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{sport} Events</Text>
      <FlatList
        data={currentData} 
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        extraData={currentData} 
      />
      {renderPagination()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#C8102E',
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
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
  itemVenue: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  itemPrice: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  itemDateTime: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  pageButton: {
    padding: 10,
    margin: 5,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  activePageButton: {
    backgroundColor: '#C8102E',
  },
  pageButtonText: {
    fontSize: 16,
    color: '#333',
  },
  activePageButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SportDetails;
