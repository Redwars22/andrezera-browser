import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { Card, Switch } from 'react-native-paper';
import { isDarkTheme, setDarkMode } from '../../modules/theme';
import { useFocusEffect } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { retrieveFavorites, removeFavorites } from '../../modules/favorites';

export default function Favorites({ navigation, route }) {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [favorites, setFavorites] = React.useState([]);

  useFocusEffect(() => {
    async function theme() {
      const isDark = await isDarkTheme();
      setIsDarkMode(isDark);
    }

    async function favorites() {
      const favs = await retrieveFavorites();
      setFavorites(favs);
    }

    theme();
    favorites();
  }, []);

  return (
    <View
      style={{
        backgroundColor: !isDarkMode ? '#ecf0f1' : '#000',
        height: Dimensions.get('window').height + 100,
      }}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 35,
          marginLeft: 28,
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <Pressable
          onPress={() => navigation.navigate('Home')}
          style={{
            marginRight: 10,
          }}>
          <Entypo name="chevron-left" size={24} color="#0A7FEC" />
        </Pressable>
        <Text
          style={{
            fontSize: 22,
            color: !isDarkMode ? '#000' : '#fff',
          }}>
          Favoritos
        </Text>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#0A7FEC',
          marginLeft: 20,
          marginRight: 20,
          marginTop: 20,
          marginBottom: 1,
        }}
      />
      <ScrollView>
        {favorites?.reverse().map((item) => (
          <Card
            style={{
              marginLeft: 28,
              marginTop: 8,
              marginRight: 28,
              marginBottom: 8,
              borderRadius: 12,
              padding: 10,
              backgroundColor: !isDarkMode ? '#fff' : '#17181a',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: !isDarkMode ? '#000' : '#fff',
                }}>
                {item.url}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Feather
                  style={{
                    marginRight: 10,
                  }}
                  name="globe"
                  size={24}
                  color="#0A7FEC"
                  onPress={() =>
                    navigation.navigate('Home', {
                      url: item.url,
                    })
                  }
                />
                <Feather
                  name="trash"
                  size={24}
                  color="#0A7FEC"
                  onPress={async () => {
                    await removeFavorites(item.url);
                  }}
                />
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}
