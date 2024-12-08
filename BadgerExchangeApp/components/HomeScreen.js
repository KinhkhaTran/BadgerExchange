import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';

const sportIcons = {
  football: 'football',
  basketball: 'basketball',
  volleyball: 'volleyball',
  hockey: 'hockey-sticks',
  soccer: 'soccer',
  baseball: 'baseball',
  default: 'calendar-outline', // Default icon for unspecified sports
};

const HomeScreen = ({ navigation }) => {
  const [popularEvents, setPopularEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];

        // Fetch upcoming events
        const upcomingQuery = query(
          collection(db, 'eventListings'),
          where('date', '>=', today),
          orderBy('date', 'asc')
        );
        const upcomingSnapshot = await getDocs(upcomingQuery);

        // Deduplicate upcoming events by `game` and limit to 5
        const upcoming = [];
        const addedGames = new Set();
        upcomingSnapshot.docs.forEach((doc) => {
          const data = doc.data();
          if (!addedGames.has(data.game)) {
            upcoming.push({ id: doc.id, ...data });
            addedGames.add(data.game);
          }
        });
        setUpcomingEvents(upcoming.slice(0, 5)); // Limit to 5 unique events

        // Fetch all events to determine popular events
        const allEventsSnapshot = await getDocs(collection(db, 'eventListings'));
        const events = allEventsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Count occurrences of each game
        const gameFrequency = {};
        events.forEach((event) => {
          gameFrequency[event.game] = (gameFrequency[event.game] || 0) + 1;
        });

        // Determine popular games (unique games sorted by frequency)
        const uniqueGames = [...new Map(events.map((e) => [e.game, e])).values()];
        const popular = uniqueGames
          .sort((a, b) => (gameFrequency[b.game] || 0) - (gameFrequency[a.game] || 0))
          .slice(0, 5); // Limit to top 5 popular games
        setPopularEvents(popular);
      } catch (error) {
        console.error('Error fetching events:', error.message);
      }
    };

    fetchEvents();
  }, []);

  const renderItem = (item) => (
    <TouchableOpacity
      style={styles.itemBox}
      onPress={() =>
        navigation.navigate('GamePurchase', { game: item }) // Navigate to GamePurchase
      }
    >
      <View style={styles.iconContainer}>
        <Icon
          name={sportIcons[item.sport?.toLowerCase()] || sportIcons.default}
          size={80}
          color="#fff"
        />
      </View>
      <View style={styles.overlay}>
        <Text style={styles.itemTitle} numberOfLines={1}>
          {item.game}
        </Text>
        <Text style={styles.itemDate}>
          {new Date(item.date).toDateString()} {item.time || ''}
        </Text>
      </View>
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

      <Text style={styles.sectionTitle}>Popular Events</Text>
      <FlatList
        horizontal
        data={popularEvents}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={(item) => `popular-${item.id}`}
        contentContainerStyle={styles.sectionContainer}
      />

      <Text style={styles.sectionTitle}>Upcoming Events</Text>
      <FlatList
        horizontal
        data={upcomingEvents}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={(item) => `upcoming-${item.id}`}
        contentContainerStyle={styles.sectionContainer}
      />

      {/* Bottom Navigation Panel */}
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
    backgroundColor: '#333',
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  itemTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDate: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
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
