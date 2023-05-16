import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AndrezeraBrowser from './components/Browser/Browser';
import Settings from './components/Settings/Settings';
import Favorites from './components/Favorites/Favorites';
import History from './components/History/History';
import { View, StatusBar } from 'react-native';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name={'Home'} component={AndrezeraBrowser} />
          <Stack.Screen name={'Settings'} component={Settings} />
          <Stack.Screen name={'Favorites'} component={Favorites} />
          <Stack.Screen name={'History'} component={History} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
