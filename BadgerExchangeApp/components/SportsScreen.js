import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SectionList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { db } from './firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import fetchTicketmasterData from './TicketmasterEvents';

const SportsScreen = ({ navigation }) => {
  const [sportListings, setSportListings] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [groupedSports, setGroupedSports] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'eventListings'),
      (querySnapshot) => {
        const events = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSportListings(events);
        groupBySport(events);
      },
      (error) => {
        console.error('Error listening to sport listings:', error.message);
        Alert.alert('Error', 'Could not load sport listings. Please try again.');
      }
    );

    return () => unsubscribe();
  }, []);

  const groupBySport = (events) => {
    const grouped = events.reduce((acc, event) => {
      const sport = event.sport ? event.sport.toLowerCase() : 'unknown sport';
      if (!acc[sport]) acc[sport] = [];
      acc[sport].push(event);
      return acc;
    }, {});

    const sections = Object.keys(grouped).map((sport) => ({
      title: sport.toUpperCase(),
      data: grouped[sport],
    }));
    setGroupedSports(sections);
  };

  const handleSearch = (text) => {
    setSearchText(text);
    if (!text.trim()) {
      groupBySport(sportListings);
    } else {
      const filtered = sportListings.filter(
        (event) =>
          event.game.toLowerCase().includes(text.toLowerCase()) ||
          event.sport.toLowerCase().includes(text.toLowerCase())
      );
      groupBySport(filtered);
    }
  };

  const handleRefresh = async () => {
    try {
      await fetchTicketmasterData(); 
      Alert.alert('Success', 'Data refreshed successfully!');
    } catch (error) {
      console.error('Error refreshing data:', error.message);
      Alert.alert('Error', 'Could not refresh data. Please try again.');
    }
  };

  const handleHeaderPress = (title, data) => {
    navigation.navigate('SportDetails', { sport: title, events: data });
  };

  const renderSectionHeader = ({ section: { title, data } }) => (
    <TouchableOpacity
      onPress={() => handleHeaderPress(title, data)}
      style={styles.sectionHeaderContainer}
    >
      <Text style={styles.sectionHeader}>{title}</Text>
      <Icon name="chevron-right" size={24} color="#C8102E" />
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
          placeholder="Search by game or sport"
          placeholderTextColor="#aaa"
          style={styles.searchInput}
          value={searchText}
          onChangeText={handleSearch}
        />
        <Icon name="magnify" size={24} color="#666" />
      </View>
      <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
        <Text style={styles.refreshButtonText}>Refresh Data</Text>
      </TouchableOpacity>
      <SectionList
        sections={groupedSports}
        keyExtractor={(item) => item.id}
        renderItem={() => null} 
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>
            No games available. Try searching for something else.
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
  refreshButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  refreshButtonText: {
    fontSize: 16,
    color: '#C8102E',
    fontWeight: 'bold',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#C8102E',
    textTransform: 'uppercase',
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

export default SportsScreen;
