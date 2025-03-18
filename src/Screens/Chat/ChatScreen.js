import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

const ChatScreen = ({route, navigation}) => {
  const {roomId, roomName} = route.params;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const socketRef = useRef(null);
  const flatListRef = useRef(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await api.getMessages(roomId);
      setMessages(response || []);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({animated: true});
  };

  const connectWebSocket = user => {
    if (socketRef.current) {
      socketRef.current.close();
    }

    socketRef.current = api.createWebSocketConnection(roomId, user);

    socketRef.current.onopen = () => {
      setIsConnected(true);
      addSystemMessage(`${user} joined the chat`);
    };

    socketRef.current.onmessage = event => {
      try {
        const data = JSON.parse(event.data);
        console.log('New WebSocket Message:', data);

        if (data?.message) {
          setMessages(prevMessages => [...prevMessages, data.message]);
          scrollToBottom();
        }
      } catch (error) {
        console.error('Error processing message:', error);
      }
    };

    socketRef.current.onerror = () => setIsConnected(false);
    socketRef.current.onclose = () => {
      setIsConnected(false);
      addSystemMessage(`${user} left the chat`);
    };
  };

  const addSystemMessage = text => {
    setMessages(prevMessages => [
      ...prevMessages,
      {id: Date.now(), sender: 'System', content: text},
    ]);
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        const userData = await AsyncStorage.getItem('@user_data');
        if (!userData) {
          Alert.alert('Error', 'User data not found', [
            {text: 'OK', onPress: () => navigation.navigate('LoginScreen')},
          ]);
          return;
        }
        const parsedData = JSON.parse(userData);
        setUsername(parsedData.username);
        await fetchMessages();
        connectWebSocket(parsedData.username);
      } catch (error) {
        console.error('Error initializing:', error);
      }
    };
    initialize();

    return () => socketRef.current?.close();
  }, [navigation, roomId]);

  const handleSendMessage = () => {
    if (!inputText.trim() || !isConnected || isSending) return;

    setIsSending(true);

    api.sendMessage(socketRef.current, inputText);
    setInputText('');
    setIsSending(false);

    scrollToBottom();
  };

  const handleLeaveRoom = () => {
    socketRef.current?.close();
    navigation.goBack();
  };

  const renderMessage = ({item}) => {
    if (item.sender === 'System') {
      return (
        <View style={styles.systemMessageContainer}>
          <Text style={styles.systemMessageText}>{item.content}</Text>
        </View>
      );
    }

    return (
      <View
        style={[
          styles.messageBubble,
          item.sender === username ? styles.userMessage : styles.botMessage,
        ]}>
        <Text style={styles.senderName}>
          {item.sender === username ? 'You' : item.sender}
        </Text>
        <Text style={styles.messageText}>{item.content}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.containerone}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#44107A'} />
      <LinearGradient colors={['#8A56DD', '#44107A']} style={styles.container}>
        <View style={styles.chatHeader}>
          <Icon name="chat" size={24} color="white" />
          <View style={styles.chatInfo}>
            <Text style={styles.chatTitle}>{roomName}</Text>
            <Text style={styles.chatSubtitle}>
              Connected as {username} {isConnected ? '(Online)' : '(Offline)'}
            </Text>
          </View>
          <Button
            mode="contained"
            style={styles.leaveButton}
            onPress={handleLeaveRoom}>
            Leave
          </Button>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>Loading messages...</Text>
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item, index) =>
              item.id ? item.id.toString() : `msg-${index}`
            }
            onContentSizeChange={scrollToBottom}
            onLayout={scrollToBottom}
            style={styles.chatArea}
            ListEmptyComponent={
              <Text style={styles.emptyMessage}>
                No messages yet. Start the conversation!
              </Text>
            }
          />
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={`Message as ${username}...`}
            placeholderTextColor="#111"
            value={inputText}
            onChangeText={setInputText}
            editable={isConnected && !isSending}
            onSubmitEditing={handleSendMessage}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendMessage}
            disabled={!isConnected || isSending || inputText.trim() === ''}>
            <Icon name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default ChatScreen;
