import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CreateListingScreen = ({ navigation }) => {
  const listing = [
    { id: '1', name: "Sporting Event", icon: 'basketball', nav: 'CreateSportListing'},
    { id: '2', name: "Book Listing", icon: 'book-outline', nav: 'CreateBookListing'},
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate(item.nav)} style={styles.itemBox}>
      <Icon name={item.icon} size={24} color="#000" />
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>BuckyExchange</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Feed')}>
          <Icon name="bell-outline" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Select Listing Type</Text>
      <FlatList
        data={listing}
        style={styles.listing}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.sectionContainer}
      />

      <View style={styles.bottomNav}>
        <Icon name="home-outline" size={30} color="#000" />
        <TouchableOpacity onPress={() => navigation.navigate('Sports')}>
          <Icon name="basketball" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Create')} style={styles.addButton}>
          <Icon name="plus" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('books')}>
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
    backgroundColor: '#C8102E', // default Wisconsin Red background color
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
  listing: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginLeft: 20,
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
    color: '#fff',
  },
  itemBox: {
    flex: 1, // This makes the item box take up available space
    height: 120, // Increase height to make it taller
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10, // Space between items
    paddingHorizontal: 10,
  },
  itemText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginTop: 25,
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

export default CreateListingScreen;
