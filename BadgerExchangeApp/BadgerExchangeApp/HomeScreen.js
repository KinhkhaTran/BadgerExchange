import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = ({ navigation }) => {
  const placeholderItems = [{ id: '1' }, { id: '2' }, { id: '3' }];

  const renderItem = () => (
    <TouchableOpacity style={styles.itemBox}>
      <Text>Placeholder Item</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bucky Exchange</Text>
        <Icon name="bell-outline" size={30} color="#fff" />
      </View>

      <View style={styles.searchContainer}>
        <Icon name="menu" size={24} color="#666" style={styles.menuIcon} />
        <TextInput
          placeholder="Hinted search text" // will need to determine functionality for the search
          placeholderTextColor="#aaa"
          style={styles.searchInput}
        />
        <Icon name="magnify" size={24} color="#666" />
      </View>

      <Text style={styles.sectionTitle}>Popular Events</Text>
      <FlatList
        horizontal
        data={placeholderItems} // temporary placeholder, need to implement (possibly by most viewed games)
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.sectionContainer}
      />

      <Text style={styles.sectionTitle}>Popular Books</Text>
      <FlatList
        horizontal
        data={placeholderItems}  // temporary placeholder, need to implement (possibly by most viewed books)
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.sectionContainer}
      />

      {/* Section: Upcoming Events (to view upcoming games - across sports? */}
      <Text style={styles.sectionTitle}>Upcoming Events</Text>
      <FlatList
        horizontal
        data={placeholderItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.sectionContainer}
      />

      {/* Bottom Navigation for between various screens of app*/}
      <View style={styles.bottomNav}>
        <Icon name="home-outline" size={30} color="#000" />
        <Icon name="basketball" size={30} color="#000" />
        <TouchableOpacity style={styles.addButton}>
          <Icon name="plus" size={30} color="#fff" />
        </TouchableOpacity>
        <Icon name="book-outline" size={30} color="#000" />
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
    backgroundColor: '#C8102E', // Red background for Badger Colors
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

export default HomeScreen;
