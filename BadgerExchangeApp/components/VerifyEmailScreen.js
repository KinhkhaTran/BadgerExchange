import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { auth } from './firebaseConfig';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { sendEmailVerification, getAuth, onAuthStateChanged } from 'firebase/auth'

const VerificationScreen = ({ navigation }) => {
    const [emailVerified, setEmailVerified] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    // Grab the current user from auth.
    useEffect(() => {
        const currentUser = auth.currentUser;
        // Update states
        setUser(currentUser);
        setEmailVerified(currentUser.emailVerified);
        setLoading(false);
    }, []);

    // Polling if email is verified
    useEffect(() => {
        const interval = setInterval(() => {
            auth.currentUser.reload() // Force reload to get new email verification status
            setEmailVerified(auth.currentUser.emailVerified) // change emailVerified state to force login
        }, 2000)
    }, [])

    // Navigate to home if email is verified.
    useEffect(() => {
        if (emailVerified) {
            console.log("Email Verified!")

            // Delay the navigation by 2 seconds so we can see the updated UI
            const timer = setTimeout(() => {
                navigation.navigate('Home');
            }, 2000);

            // Cleanup the timer if the component is unmounted before the delay
            return () => clearTimeout(timer);
        }
    }, [emailVerified]);

    // Email verification call back function.
    const handleResendVerificationEmail = async () => {
        try {
            if (user) {
                await sendEmailVerification(user);
                Alert.alert('Verification Email Sent', 'We have sent a new verification email to your inbox.');
            }
        } catch (error) {
            console.log('Error sending verification email:', error.message);
            Alert.alert('Error', 'Failed to resend verification email. Please try again.');
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image source={require('../assets/bucky.png')} style={styles.logo} />
            <Text style={styles.title}>Bucky Exchange</Text>

            {!emailVerified ? (
                <View style={styles.statusContainer}>
                    <Icon name="alert-circle-outline" size={60} color="orange" style={styles.icon} />
                    <Text style={styles.statusText}>Your email is not verified yet.</Text>
                    <TouchableOpacity
                        style={styles.verifyButton}
                        onPress={handleResendVerificationEmail}
                    >
                        <Text style={styles.verifyButtonText}>Send Verification Email</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.statusContainer}>
                    <Icon name="check-circle-outline" size={60} color="green" style={styles.icon} />
                    <Text style={styles.statusText}>Your email is verified!</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C8102E',
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
    loadingText: {
        fontSize: 20,
        color: '#fff',
    },
    statusContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginTop: 30,
    },
    icon: {
        marginBottom: 20,
    },
    statusText: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
    },
    verifyButton: {
        backgroundColor: '#666',
        paddingVertical: 10,
        width: '80%',
        borderRadius: 8,
        marginTop: 10,
        alignItems: 'center',
    },
    verifyButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default VerificationScreen;
