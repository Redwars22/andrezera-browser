import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  StatusBar,
  Alert,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { Card, Switch } from 'react-native-paper';
import { isDarkTheme, setDarkMode } from '../../modules/theme';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Settings({ navigation }) {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  useFocusEffect(() => {
    async function theme() {
      const isDark = await isDarkTheme();
      setIsDarkMode(isDark);
      setIsSwitchOn(isDark);
    }

    theme();
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
          marginBottom: 30,
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
          Configurações
        </Text>
      </View>
      <Card
        style={{
          marginLeft: 28,
          marginTop: 8,
          marginRight: 28,
          marginBottom: 8,
          borderRadius: 12,
          padding: 8,
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
            Modo Escuro
          </Text>
          <Switch
            value={isSwitchOn}
            color={'#0A7FEC'}
            onValueChange={async (value) => {
              setIsSwitchOn(value);
              await setDarkMode(value);
            }}
          />
        </View>
      </Card>

      <Card
        style={{
          marginLeft: 28,
          marginTop: 8,
          marginRight: 28,
          marginBottom: 8,
          borderRadius: 12,
          padding: 8,
          backgroundColor: '#29002e',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <MaterialCommunityIcons
            name="incognito"
            size={24}
            color="white"
            onPress={() =>
              ToastAndroid.show('Navegação em modo privado', ToastAndroid.SHORT)
            }
          />
          <View
            style={{
              maxWidth: 250,
            }}>
            <Text
              style={{
                color: '#ef79fc',
                fontWeight: 'bold',
              }}>
              Modo Privado
            </Text>
            <Text
              style={{
                color: '#ef79fc',
                fontSize: 14,
              }}>
              (Nesse modo, seu histórico de navegação não será salvo.)
            </Text>
          </View>
          <Entypo
            onPress={() => {
              Alert.alert(
                'Navegação em modo privado',
                'Enquanto esse modo estiver ativado, todos os sites que você visitar não serão salvos em seu histórico de navegação. Para sair dele, reinicie o navegador.'
              );
              navigation.navigate('Home', {
                private: true,
              });
            }}
            name="chevron-right"
            size={24}
            color="#ef79fc"
          />
        </View>
      </Card>

      <Card
        style={{
          marginLeft: 28,
          marginTop: 8,
          marginRight: 28,
          marginBottom: 8,
          borderRadius: 12,
          padding: 8,
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
            Favoritos
          </Text>
          <Entypo
            onPress={() => navigation.navigate('Favorites')}
            name="chevron-right"
            size={24}
            color="#0A7FEC"
          />
        </View>
      </Card>
      <Card
        style={{
          marginLeft: 28,
          marginTop: 8,
          marginRight: 28,
          marginBottom: 8,
          borderRadius: 12,
          padding: 8,
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
            Histórico de Navegação
          </Text>
          <Entypo
            name="chevron-right"
            size={24}
            color="#0A7FEC"
            onPress={() => {
              navigation.navigate('History');
            }}
          />
        </View>
      </Card>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#0A7FEC',
          marginLeft: 20,
          marginRight: 20,
          marginTop: 20,
          marginBottom: 20,
        }}
      />
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
          }}>
          <Text
            style={{
              color: !isDarkMode ? '#000' : '#fff',
            }}>
            Navegador Andrezera, versão 1.3.0 - Release Preview
          </Text>
        </View>
      </Card>
      <Pressable>
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
              Meu GitHub
            </Text>
            <Entypo
              onPress={() =>
                navigation.navigate('Home', {
                  url: 'github.com/Redwars22',
                })
              }
              name="chevron-right"
              size={24}
              color="#0A7FEC"
            />
          </View>
        </Card>
      </Pressable>
      <Pressable>
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
              Meu Portfólio de Projetos
            </Text>
            <Entypo
              onPress={() =>
                navigation.navigate('Home', {
                  url: 'https://andrewnation.vercel.app',
                })
              }
              name="chevron-right"
              size={24}
              color="#0A7FEC"
            />
          </View>
        </Card>
      </Pressable>

      <Pressable>
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
              Código-fonte do Andrezera
            </Text>
            <Entypo
              onPress={() =>
                navigation.navigate('Home', {
                  url: 'https://github.com/Redwars22/andrezera-browser',
                })
              }
              name="chevron-right"
              size={24}
              color="#0A7FEC"
            />
          </View>
        </Card>
      </Pressable>
    </View>
  );
}
