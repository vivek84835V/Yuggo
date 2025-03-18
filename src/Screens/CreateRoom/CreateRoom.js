import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import {Routes} from '../../MainNavigation/Routes';
import {createRoom} from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateRoomScreen = ({navigation}) => {
  const [roomName, setRoomName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateRoom = async () => {
    if (!roomName.trim()) {
      Alert.alert('Error', 'Please enter a room name');
      return;
    }

    setIsLoading(true);
    try {
      const room = await createRoom(roomName);

      const userData = await AsyncStorage.getItem('@user_data');
      const username = userData ? JSON.parse(userData).username : 'User';

      navigation.navigate(Routes.ChatScreen, {
        roomId: room.id,
        roomName: room.name,
        username: username,
      });
    } catch (error) {
      console.error('Error creating room:', error);
      Alert.alert('Error', 'Failed to create room');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      style={styles.maincontainer}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.TouchableIcon}>
        <Icon name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.createContainer}>
        <View style={styles.createBox}>
          <Icon name="plus-box" size={40} color="black" />
          <Text style={styles.createTitle}>Create a Room</Text>
          <Text style={styles.createSubtitle}>
            Enter a room name and press create.
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Room name..."
            value={roomName}
            onChangeText={setRoomName}
          />
          <Button
            mode="contained"
            style={styles.createButton}
            onPress={handleCreateRoom}
            loading={isLoading}
            disabled={isLoading}>
            Create
          </Button>
        </View>
      </View>
    </View>
  );
};

export default CreateRoomScreen;
