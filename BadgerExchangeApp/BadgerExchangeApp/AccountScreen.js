import React from 'react';
import { useNavigation } from '@react-navigation/native';

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

const AccountScreen = () => {
  const navigation = useNavigation();

  // array of placeholder items, to be replaced with items specific to user
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


      <View style={styles.profileSection}> 
        <Image  
          source={require('./assets/profile-placeholder.jpg')}  // Placehold image, TODO replace with actual image
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.profileName}>John Smith</Text>
          <Text style={styles.profileEmail}>john@wisc.edu</Text>
          <Text style={styles.profileClass}>Class of 2027</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Icon name="menu" size={24} color="#666" style={styles.menuIcon} />
        <TextInput
          placeholder="Hinted search text" // again, placeholder. Likely replace with functionality to search user's own items
          placeholderTextColor="#aaa"
          style={styles.searchInput}
        />
        <Icon name="magnify" size={24} color="#666" />
      </View>

      <Text style={styles.sectionTitle}>My Events/ Books</Text>
      <FlatList // will need to implement functionality to pull in user's actual items
        horizontal
        data={placeholderItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.sectionContainer}
      />
 
      <Text style={styles.sectionTitle}>My Cart</Text>
      <FlatList
        horizontal // will need to implement functionality, this is for user's items that they haven't purchased yet
        data={placeholderItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.sectionContainer}
      />

        {/*Buttons at bottom of screen to navigate between screens*/}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Icon name="home-outline" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Sports')}>
          <Icon name="basketball" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton}>
          <Icon name="plus" size={30} color="#fff" />
        </TouchableOpacity>
        <Icon name="book-outline" size={30} color="#000" />
        <Icon name="account-outline" size={30} color="#000" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C8102E', // Red background to be shared across all screens
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
    backgroundColor: '#ddd',
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

export default AccountScreen;
