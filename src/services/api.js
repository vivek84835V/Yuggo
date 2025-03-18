import axios from 'axios';

const BASE_URL = 'https://chat-api-k4vi.onrender.com';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setUsername = async username => {
  try {
    const response = await apiClient.post('/chat/username', {username});
    return response.data;
  } catch (error) {
    console.error('Error setting username:', error);
    throw error;
  }
};

export const getRooms = async () => {
  try {
    const response = await apiClient.get('/chat/rooms');
    return response.data;
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};

export const createRoom = async name => {
  try {
    const response = await apiClient.post('/chat/rooms', {name});
    return response.data;
  } catch (error) {
    console.error('Error creating room:', error);
    throw error;
  }
};

export const getMessages = async room_id => {
  try {
    const response = await apiClient.get(`/chat/rooms/${room_id}/messages`);
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

export const createWebSocketConnection = (room_id, username) => {
  const socket = new WebSocket(
    `ws://chat-api-k4vi.onrender.com/ws/${room_id}/${username}`,
  );

  socket.onopen = () => {
    console.log('WebSocket connection established');
  };

  socket.onerror = error => {
    console.error('WebSocket error:', error);
  };


  socket.onclose = () => {
    console.log('WebSocket connection closed');
  };

  return socket;
};

export const sendMessage = (socket, content) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    const payload = {
      event: 'message',
      content: content,
    };
    socket.send(JSON.stringify(payload));
  } else {
    console.error('WebSocket is not connected');
  }
};

export default {
  setUsername,
  getRooms,
  createRoom,
  getMessages,
  createWebSocketConnection,
  sendMessage,
};
