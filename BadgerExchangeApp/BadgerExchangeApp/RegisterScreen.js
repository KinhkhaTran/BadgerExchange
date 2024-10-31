import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // Add registration logic here, likely to store user data in a database
    console.log('Registered:', { name, email, password, confirmPassword });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/bucky.png')} // Add logo image to the assets folder
        style={styles.logo}
      />

      <Text style={styles.title}>Bucky Exchange</Text>
      <Text style={styles.registerText}>Register</Text>

      {/* Name Input for user */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Email Input for user */}
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

      {/* Password Input for user, mask and also implement securing this data*/}
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

      {/* Confirm Password Input */}
      <View style={styles.inputContainer}>
        <Icon name="lock-outline" size={24} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#aaa"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </View>

      {/* Register Button */}
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C8102E', // Wisconsin Red
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
  registerText: {
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
  registerButton: {
    backgroundColor: '#666',
    paddingVertical: 10,
    width: '80%',
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default RegisterScreen;
