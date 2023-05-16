import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Dimensions,
  Alert,
  ToastAndroid,
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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function AndrezeraBrowser({ navigation, route }) {
  const [url, setUrl] = useState('https://www.google.com');
  const [currentURL, setCurrentURL] = useState('');
  const [safeWebsite, setSafeWebsite] = useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollPosString, setScrollPosString] = useState('');

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

  const getBackgroundColor = () => {
    if (route?.params?.private) return '#29002e';

    if (!isDarkMode) return '#E8E8E8';

    return '#000';
  };

  const handleScroll = (event) => {
    const currentScrollPosition = event.nativeEvent.contentOffset.y;

    if (currentScrollPosition > scrollPosition) {
      setScrollPosString('down');
    } else {
      setScrollPosString('up');
    }

    setScrollPosition(currentScrollPosition);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: getBackgroundColor(),
        },
      ]}>
      {scrollPosString != 'down' && (
        <View
          style={{
            backgroundColor: getBackgroundColor(),
            justifyContent: 'space-around',
            padding: 5,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {route?.params?.private && (
            <MaterialCommunityIcons
              name="incognito"
              size={22}
              color="white"
              onPress={() =>
                ToastAndroid.show(
                  'Navegação em modo privado',
                  ToastAndroid.SHORT
                )
              }
            />
          )}
          <TextInput
            style={{
              backgroundColor: safeWebsite ? '#0fba6d' : '#fff',
              padding: 3,
              color: safeWebsite ? '#fff' : '#000',
              fontWeight: 'bold',
              borderRadius: 10,
              textAlign: 'center',
              width: width - 80,
            }}
            placeholder="Insira um endereço aqui"
            value={currentURL}
            onChangeText={(text) => setCurrentURL(text)}
            onSubmitEditing={(ev) => setUrl(currentURL)}
          />
          <Pressable
            onPress={() => {
              this?.webview?.reload();
            }}>
            <FontAwesome name="refresh" size={18} color="#0A7FEC" />
          </Pressable>
        </View>
      )}
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

          if (!route?.params?.private) await addToHistory(currentURL);
        }}
        onNavigationStateChange={(ev) => {
          setCurrentURL(ev.url);
        }}
        onScroll={handleScroll}
      />
      {scrollPosString != 'down' && (
        <View
          style={{
            backgroundColor: getBackgroundColor(),
            justifyContent: 'space-evenly',
            alignItems: 'center',
            padding: 12,
            flexDirection: 'row',
          }}>
          <Pressable onPress={() => this.webview?.goBack()}>
            <Entypo name="chevron-left" size={20} color="#0A7FEC" />
          </Pressable>
          <Pressable onPress={() => this.webview?.goForward()}>
            <Entypo name="chevron-right" size={20} color="#0A7FEC" />
          </Pressable>
          <Pressable
            onPress={() =>
              this.webview?.injectJavaScript(
                `window.location = "https://www.google.com"`
              )
            }>
            <AntDesign name="home" size={20} color="#0A7FEC" />
          </Pressable>
          <Pressable
            onPress={() =>
              this.webview?.injectJavaScript(
                `window.location = "https://chat.openai.com/"`
              )
            }>
            <MaterialIcons name="chat" size={20} color="#0A7FEC" />
          </Pressable>
          <Pressable
            onPress={async () => {
              if (route?.params?.private) {
                ToastAndroid.show(
                  'Não é possível favoritar sites no modo privado',
                  ToastAndroid.SHORT
                );
                return;
              }
              await addFavorites(currentURL);
            }}>
            <AntDesign name="staro" size={20} color="#0A7FEC" />
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Settings')}>
            <Feather name="settings" size={20} color="#0A7FEC" />
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
