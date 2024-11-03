import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import AccountScreen from './AccountScreen';
import RegisterScreen from './RegisterScreen';
import SportsScreen from './SportsScreen';
import TextbookScreen from './TextbookScreen';

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
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;