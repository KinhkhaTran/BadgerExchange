import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BookDetailsScreen = ({ navigation, route }) => {
  const { id, title, date, description, image } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={40} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {title}
        </Text>
      </View>

      <Image source={image} style={styles.bookImage} />

      <View style={styles.detailsContainer}>
        <Text style={styles.bookTitle}>{title}</Text>
        <Text style={styles.bookDate}>{date}</Text>
        <Text style={styles.bookDescription}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C8102E', // Badger Red
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 20, // Lower the header
    paddingVertical: 16,
    paddingHorizontal: 10,
    backgroundColor: '#C8102E', // Red
    zIndex: 10, // Ensures header is above other components
  },
  backButton: {
    padding: 5, // Adds touchable padding
    marginRight: 10, // Space between arrow and title
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    flex: 1, // Ensures title centers in the remaining space
  },
  bookImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    marginTop: -20, // Pull up slightly to overlap the image
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  bookTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  bookDate: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  bookDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
});

export default BookDetailsScreen;