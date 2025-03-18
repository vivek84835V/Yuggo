import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Alert,
} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import {Routes} from '../../MainNavigation/Routes';
import {getRooms} from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import {useFocusEffect} from '@react-navigation/native';
import {removeUserData} from '../../services/storage';

const HomeScreen = ({navigation}) => {
  const [rooms, setRooms] = useState([]);
  const [username, setUsername] = useState('User');
  const [loading, setLoading] = useState(true);

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('@user_data');
      if (userData) {
        const parsed = JSON.parse(userData);
        setUsername(parsed.username || 'User');
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const roomsData = await getRooms();
      setRooms(roomsData);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadUserData();
      fetchRooms();
    }, []),
  );

  const handleJoinRoom = room => {
    navigation.navigate(Routes.ChatScreen, {
      roomId: room.id,
      roomName: room.name,
    });
  };

  const handleLogout = async () => {
    const success = await removeUserData();
    if (success) {
      navigation.replace(Routes.LoginScreen);
    } else {
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/Images/Background_img.png')}
      style={styles.background}
      blurRadius={1}>
      <SafeAreaView style={styles.primarycontainer}>
        <View style={styles.btncontainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleLogout}>
            <Icon name="logout" size={25} />
          </TouchableOpacity>
        </View>
        <LinearGradient
          colors={['#8A56DD', '#44107A']}
          style={styles.linearcontainer}>
          <View style={styles.txtcontainer}>
            <Text style={styles.header}>Your Spaces</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.CreateRoomScreen)}
              style={styles.TouchableIcon}>
              <Icon
                name="chat-plus"
                size={30}
                color="black"
                style={styles.Icon}
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <ScrollView
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}>
          {loading ? (
            <Text style={styles.loadingText}>Loading rooms...</Text>
          ) : rooms.length === 0 ? (
            <Text style={styles.noRoomsText}>No rooms available</Text>
          ) : (
            rooms.map(room => (
              <View key={room.id} style={styles.spaceItem}>
                <Icon name="chess-queen" size={32} color="black" />
                <View style={styles.spaceText}>
                  <Text style={styles.spaceTitle}>{room.name}</Text>
                  {room.activeUsers && (
                    <Text>Active users: {room.activeUsers}</Text>
                  )}
                </View>
                <Button
                  mode="contained"
                  style={styles.joinButton}
                  onPress={() => handleJoinRoom(room)}>
                  Join
                </Button>
              </View>
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default HomeScreen;
