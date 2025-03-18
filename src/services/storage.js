import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUserData = async userData => {
  try {
    await AsyncStorage.setItem('@user_data', JSON.stringify(userData));
    return true;
  } catch (error) {
    console.error('Error storing user data:', error);
    return false;
  }
};

export const getUserData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@user_data');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

export const removeUserData = async () => {
  try {
    await AsyncStorage.removeItem('@user_data');
    return true;
  } catch (error) {
    console.error('Error removing user data:', error);
    return false;
  }
};

export default {
  storeUserData,
  getUserData,
  removeUserData,
};
