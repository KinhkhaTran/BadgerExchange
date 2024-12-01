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
  // Data arrays for each section
  const popularEvents = [
    {
      id: '1',
      image: require('../assets/UWfootball.png'),
      title: 'Football Game',
      date: 'Nov 20, 2024',
    },
    {
      id: '2',
      image: require('../assets/UWBasketball.png'),
      title: 'Basketball Game',
      date: 'Nov 22, 2024',
    },
    {
      id: '3',
      image: require('../assets/UWVolleyball.png'),
      title: 'Volleyball Match',
      date: 'Nov 25, 2024',
    },
  ];

  const popularBooks = [
    {
      id: '1',
      image: require('../assets/TheBookOfC.png'),
      title: 'The Book of C',
      date: 'Released: 2023',
    },
    {
      id: '2',
      image: require('../assets/TheBookOfC.png'),
      title: 'The Book of Python',
      date: 'Released: 2022',
    },
    {
      id: '3',
      image: require('../assets/TheBookOfC.png'),
      title: 'The Book of Java',
      date: 'Released: 2024',
    },
  ];

  const upcomingEvents = [...popularEvents]; // Reusing for simplicity in this example

  const renderItem = (item, type) => (
    <TouchableOpacity
      style={styles.itemBox}
      onPress={() =>
        navigation.navigate(
          type === 'event' ? 'EventDetails' : 'BookDetails',
          {
            id: item.id,
            title: item.title,
            date: item.date,
            description: type === 'event' ? 'This is an event description.' : 'This is a book description.',
            image: item.image,
          }
        )
      }
    >
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.overlay}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDate}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Bucky Exchange</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Feed')}>
          <Icon name="bell-outline" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="menu" size={24} color="#666" style={styles.menuIcon} />
        <TextInput
          placeholder="Search events or books"
          placeholderTextColor="#aaa"
          style={styles.searchInput}
        />
        <Icon name="magnify" size={24} color="#666" />
      </View>

      {/* Sections */}
      <Text style={styles.sectionTitle}>Popular Events</Text>
      <FlatList
        horizontal
        data={popularEvents}
        renderItem={({ item }) => renderItem(item, 'event')}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.sectionContainer}
      />

      <Text style={styles.sectionTitle}>Popular Books</Text>
      <FlatList
        horizontal
        data={popularBooks}
        renderItem={({ item }) => renderItem(item, 'book')}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.sectionContainer}
      />

      <Text style={styles.sectionTitle}>Upcoming Events</Text>
      <FlatList
        horizontal
        data={upcomingEvents}
        renderItem={({ item }) => renderItem(item, 'event')}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.sectionContainer}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="home-outline" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Sports')}>
          <Icon name="basketball" size={30} color="#000" />
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
    backgroundColor: '#C8102E', // Badger Red
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
    width: 250,
    height: 150,
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
  itemImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8, // Optional, for rounded corners
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '25%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Transparent black
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  itemTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemDate: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default HomeScreen;