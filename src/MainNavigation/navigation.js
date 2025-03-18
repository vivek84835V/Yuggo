import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { Routes } from './Routes';
import LoginScreen from '../Screens/Login/Login';
import HomeScreen from '../Screens/Home/HomeScreen';
import ChatScreen from '../Screens/Chat/ChatScreen';
import CreateRoomScreen from '../Screens/CreateRoom/CreateRoom';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName={Routes.LoginScreen} screenOptions={{headerShown: false}}>
      <Stack.Screen name={Routes.LoginScreen} component={LoginScreen} />
      <Stack.Screen name={Routes.HomeScreen} component={HomeScreen}/>
      <Stack.Screen name={Routes.ChatScreen} component={ChatScreen}/>
      <Stack.Screen name={Routes.CreateRoomScreen} component={CreateRoomScreen}/>
    </Stack.Navigator>
  );
};

export default Navigation;
