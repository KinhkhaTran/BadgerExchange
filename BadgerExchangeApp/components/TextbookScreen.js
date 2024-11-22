import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TextbookScreen = ({ navigation }) => {
  const placeholderItems = [
    { id: '1', name: 'CS300', price: 30 },
    { id: '2', name: 'CS310', price: 30 },
    { id: '3', name: 'CS320', price: 30 },
    { id: '4', name: 'CS330', price: 25 },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>Price: ${item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bucky Exchange</Text>
        <Icon name="bell-outline" size={30} color="#fff" />
      </View>

  
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Hinted search text"
          placeholderTextColor="#aaa"
          style={styles.searchInput}
        />
        <Icon name="magnify" size={24} color="#666" />
      </View>

      {/* Need to decide implemention, possible folders for each class? */}
      <FlatList
        data={placeholderItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

     {/* Bottom Navigation */}
     <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="home-outline" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Sports')}>
          <Icon name="basketball" size={30} color="#000" /> {/* Consistent sports icon */}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Create')} style={styles.addButton}>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
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
  itemContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: '#333',
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

export default TextbookScreen;