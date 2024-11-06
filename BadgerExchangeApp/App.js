import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import AccountScreen from './components/AccountScreen';
import RegisterScreen from './components/RegisterScreen';
import SportsScreen from './components/SportsScreen';
import TextbookScreen from './components/TextbookScreen';
import FeedScreen from './components/FeedScreen';
import CreateListingScreen from './components/CreateListingScreen';
import CreateBookListingScreen from './components/CreateBookListingScreen';
import CreateSportListingScreen from './components/CreateSportListingScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Account" 
          component={AccountScreen} 
          options={{ headerShown: false }} 
        />
          <Stack.Screen 
          name="Sports" 
          component={SportsScreen} 
          options={{ headerShown: false }} 
        />
         <Stack.Screen 
          name="books" 
          component={TextbookScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Feed" 
          component={FeedScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Create" 
          component={CreateListingScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="CreateBookListing" 
          component={CreateBookListingScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="CreateSportListing" 
          component={CreateSportListingScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;