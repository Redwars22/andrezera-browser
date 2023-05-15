import { AsyncStorage } from 'react-native';

export const addToHistory = async (url) => {
  const existingHistory = await retrieveHistory();

  const newHistory = [...existingHistory, url];

  await AsyncStorage.setItem('history', JSON.stringify(newHistory));
};

export const clearHistory = async () => {
  await AsyncStorage.removeItem('history');
};

export const retrieveHistory = async () => {
  const history = await AsyncStorage.getItem('history');

  if (history === null) {
    return [];
  }

  return JSON.parse(history);
};

export const removeLastHistory = async () => {
  const existingHistory = await retrieveHistory();

  const newHistory = existingHistory.slice(0, -1);

  await AsyncStorage.setItem('history', JSON.stringify(newHistory));
};