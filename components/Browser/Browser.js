import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Dimensions,
  Alert,
} from 'react-native';
import Constants from 'expo-constants';
import { WebView } from 'react-native-webview';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { isDarkTheme, setDarkMode } from '../../modules/theme';
import { useFocusEffect } from '@react-navigation/native';
import { addFavorites } from '../../modules/favorites';
import { addToHistory } from '../../modules/history';

export default function AndrezeraBrowser({ navigation, route }) {
  const [url, setUrl] = useState('https://www.google.com');
  const [currentURL, setCurrentURL] = useState('');
  const [safeWebsite, setSafeWebsite] = useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  useFocusEffect(() => {
    async function theme() {
      const isDark = await isDarkTheme();
      setIsDarkMode(isDark);
      setIsSwitchOn(isDark);
    }

    theme();
  }, []);

  const width = Dimensions.get('window').width;

  webview = null;

  useEffect(() => {
    setCurrentURL(currentURL);
  }, [url, safeWebsite]);

  useEffect(() => {
    if (route?.params?.url) {
      setUrl(route?.params?.url);
      this.webview.injectJavaScript(`window.location = ${route?.params?.url}`);
    }
  });

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: !isDarkMode ? '#E8E8E8' : '#000',
        },
      ]}>
      <View
        style={{
          backgroundColor: !isDarkMode ? '#E8E8E8' : '#000',
          justifyContent: 'space-around',
          padding: 12,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TextInput
          style={{
            backgroundColor: safeWebsite ? '#0fba6d' : '#fff',
            padding: 8,
            borderRadius: 10,
            textAlign: 'center',
            width: width - 80,
          }}
          placeholder="Insira um endereço aqui"
          value={currentURL}
          onChangeText={(text) => setCurrentURL(text)}
          onSubmitEditing={(ev) => setUrl(currentURL)}
        />
        <Pressable>
          <FontAwesome
            name="refresh"
            size={24}
            color="#0A7FEC"
            onPress={() => {
              this.webview.reload();
            }}
          />
        </Pressable>
      </View>
      <WebView
        style={{
          flex: 1,
        }}
        ref={(ref) => (this.webview = ref)}
        source={{ uri: url }}
        onLoad={async () => {
          if (url.includes('https://')) {
            setSafeWebsite(true);
          } else setSafeWebsite(false);

          await addToHistory(currentURL);
        }}
        onNavigationStateChange={(ev) => {
          setCurrentURL(ev.url);
        }}
      />
      <View
        style={{
          backgroundColor: !isDarkMode ? '#E8E8E8' : '#000',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          padding: 12,
          flexDirection: 'row',
        }}>
        <Pressable onPress={() => this.webview.goBack()}>
          <Entypo name="chevron-left" size={30} color="#0A7FEC" />
        </Pressable>
        <Pressable onPress={() => this.webview.goForward()}>
          <Entypo name="chevron-right" size={30} color="#0A7FEC" />
        </Pressable>
        <Pressable
          onPress={() =>
            this.webview.injectJavaScript(
              `window.location = "https://www.google.com"`
            )
          }>
          <AntDesign name="home" size={24} color="#0A7FEC" />
        </Pressable>
        <Pressable onPress={async () => await addFavorites(currentURL)}>
          <AntDesign name="staro" size={24} color="#0A7FEC" />
        </Pressable>
        <Pressable>
          <Feather
            name="settings"
            size={24}
            color="#0A7FEC"
            onPress={() => navigation.navigate('Settings')}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
});
