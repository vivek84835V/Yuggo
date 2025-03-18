import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Routes} from '../../MainNavigation/Routes';
import {setUsername} from '../../services/api';

const LoginScreen = ({navigation}) => {
  const [username, setUsernameText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!username.trim()) {
      Alert.alert('Error', 'Please enter a username');
      return;
    }

    setIsLoading(true);
    try {
      const userData = await setUsername(username);

      await AsyncStorage.setItem(
        '@user_data',
        JSON.stringify({
          ...userData,
        }),
      );

      navigation.navigate(Routes.HomeScreen);
    } catch (error) {
      Alert.alert(
        'Login Failed',
        error.response?.data?.message ||
          'Something went wrong. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#8A56DD', '#44107A']} style={styles.container}>
      <StatusBar backgroundColor="#8A56DD" barStyle="light-content" />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Yuggo</Text>
        <Text style={styles.subtitle}>Login</Text>
      </View>

      <View style={styles.meteorIcon}>
        <Text style={styles.meteorText}>☄️</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Username</Text>
        <View style={styles.glowWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Username..."
            placeholderTextColor="# E0C3FC"
            value={username}
            onChangeText={setUsernameText}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>
          {isLoading ? 'Logging in...' : 'Just Click to Login'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.footerLogo}>ΛΛ Yuggo</Text>
    </LinearGradient>
  );
};

export default LoginScreen;
