import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SportsScreen = ({ navigation }) => {
  const sports = [
    { id: '1', name: "Men's Basketball", icon: 'basketball' },
    { id: '2', name: "Women's Basketball", icon: 'basketball' },
    { id: '3', name: "Men's Hockey", icon: 'hockey-puck' },
    { id: '4', name: "Women's Hockey", icon: 'hockey-sticks' },
    { id: '5', name: 'Football', icon: 'football' },
    { id: '6', name: 'Volleyball', icon: 'volleyball' },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.sportButton}>
      <Icon name={item.icon} size={24} color="#fff" style={styles.sportIcon} />
      <Text style={styles.sportText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bucky Exchange</Text>
        <Icon name="bell-outline" size={30} color="#fff" />
      </View>

      <FlatList
        data={sports}
        renderItem={renderItem} // TODO, implement logic and navigation for buttons for each sport
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.sportList}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="home-outline" size={30} color="#000" />
        </TouchableOpacity>
        <Icon name="basketball" size={30} color="#000" />
        <TouchableOpacity style={styles.addButton}>
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
  sportList: {
    paddingHorizontal: 20,
  },
  sportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#444',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sportIcon: {
    marginRight: 15,
  },
  sportText: {
    color: '#fff',
    fontSize: 18,
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