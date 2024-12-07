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
import VerifyEmailScreen from './components/VerifyEmailScreen';
import EventDetailsScreen from './components/EventDetailsScreen';
import BookDetailsScreen from './components/BookDetailsScreen';
import BookPurchase from './components/BookPurchase';
import EventPurchase from './components/EventPurchase';
import { CartProvider } from './components/CartContext';
import { PurchaseProvider } from './components/PurchaseContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <CartProvider>
      <PurchaseProvider>
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
              name="Books" 
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
            <Stack.Screen 
              name="VerifyEmailScreen" 
              component={VerifyEmailScreen} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="BookPurchase" 
              component={BookPurchase} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="EventPurchase" 
              component={EventPurchase} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="EventDetails" 
              component={EventDetailsScreen} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="BookDetails" 
              component={BookDetailsScreen} 
              options={{ headerShown: false }} 
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PurchaseProvider>
    </CartProvider>
  );
};

export default App;