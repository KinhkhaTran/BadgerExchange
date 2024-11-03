import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      {/* Bucky Logo*/}
      <Image 
        source={require('../assets/bucky.png')} 
        style={styles.logo}
      />

      <Text style={styles.title}>Bucky Exchange</Text>

      <Text style={styles.loginText}>Login</Text>

      {/* Email Input -> need to implement storing this in database */}
      <View style={styles.inputContainer}>
        <Icon name="email-outline" size={24} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      {/* Password Input -> need to implement storing this in database */}
      <View style={styles.inputContainer}>
        <Icon name="lock-outline" size={24} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {/* Login Button -> navigate to home page upon logging in*/}
      <TouchableOpacity 
  style={styles.loginButton} 
  onPress={() => navigation.navigate('Home')}
>
  <Text style={styles.loginButtonText}>Login</Text>
</TouchableOpacity>

      {/* Register Link */}
      <Text style={styles.newHereText}>New Here?</Text>
      <TouchableOpacity 
        style={styles.registerButton} 
        onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerButtonText}>Register Here</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C8102E', // Wisconsin Red Background Color
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  loginText: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    width: '80%',
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#666',
    paddingVertical: 10,
    width: '80%',
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  newHereText: {
    color: '#fff',
    marginTop: 20,
    fontSize: 16,
  },
  registerButton: {
    marginTop: 5,
    backgroundColor: '#666',
    paddingVertical: 8,
    width: '80%',
    borderRadius: 8,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default LoginScreen;
