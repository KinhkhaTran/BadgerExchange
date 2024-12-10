import React, { useEffect, useState } from 'react';
import { View, Text, SectionList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './firebaseConfig';
import PopulateDatabase, { populateFirestore } from './TicketmasterEvents'; // Import the Ticketmaster refresh function

const SportsScreen = ({ navigation }) => {
  const [groupedSports, setGroupedSports] = useState([]);
  const [loading, setLoading] = useState(false); // Track loading state

  const fetchSportsData = () => {
    const unsubscribe = onSnapshot(
      collection(db, 'eventListings'),
      (querySnapshot) => {
        const events = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (events.length === 0) {
          Alert.alert('No Data', 'No sports events found.');
        } else {
          groupBySport(events);
        }
      },
      (error) => {
        console.error('Error fetching events:', error.message);
        Alert.alert('Error', 'Could not load sports events.');
      }
    );

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = fetchSportsData();
    return () => unsubscribe();
  }, []);

  const groupBySport = (events) => {
    const grouped = events.reduce((acc, event) => {
      const sport = event.sport?.toLowerCase() || 'unknown';
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

  const refreshSports = async () => {
    setLoading(true); // Set loading to true while refreshing
    try {
      await populateFirestore(); // Call Ticketmaster refresh logic
      Alert.alert('Success', 'Events refreshed successfully.');
    } catch (error) {
      console.error('Error refreshing events:', error.message);
      Alert.alert('Error', 'Failed to refresh events.');
    } finally {
      setLoading(false); // Set loading to false after refreshing
    }
  };

  const renderSectionHeader = ({ section: { title } }) => (
    <TouchableOpacity
      style={styles.sectionHeaderContainer}
      onPress={() => navigation.navigate('SportsDetails', { sport: title })}
    >
      <Text style={styles.sectionHeader}>{title}</Text>
      <Icon name="chevron-right" size={24} color="#fff" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sports Categories</Text>
        <TouchableOpacity onPress={refreshSports} disabled={loading}>
          <Icon name="refresh" size={30} color={loading ? '#ccc' : '#fff'} />
        </TouchableOpacity>
      </View>
      <SectionList
        sections={groupedSports}
        keyExtractor={(item, index) => item + index}
        renderSectionHeader={renderSectionHeader}
        renderItem={() => null} // Hide individual items
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>No sports categories available.</Text>
        }
      />
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="home-outline" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Sports')}>
          <Icon name="basketball" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Create')}
          style={styles.addButton}
        >
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
  list: {
    paddingHorizontal: 20,
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#C8102E',
  },
  emptyListText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
    marginTop: 20,
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

export default SportsScreen;
