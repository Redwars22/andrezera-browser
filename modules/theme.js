import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setDarkMode(isDarkMode) {
  try {
    await AsyncStorage.setItem('dark_mode_enabled', String(isDarkMode));
  } catch (e) {
    return;
  }
}

export async function isDarkTheme() {
  try {
    const value = await AsyncStorage.getItem('dark_mode_enabled');
    return value === "true";
  } catch (e) {
    return false;
  }
}
