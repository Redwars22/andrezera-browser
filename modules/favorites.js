import { AsyncStorage, ToastAndroid } from 'react-native';

export const addFavorites = async (url) => {
  const existingFavorites = await retrieveFavorites();

  const alreadyFavorited = await checkIfIsAlreadyFavorited(url);

  if (alreadyFavorited) {
    ToastAndroid.show(
      'A URL já está na lista de favoritos!',
      ToastAndroid.SHORT
    );
    return;
  }

  const newFavorites = [...existingFavorites, { url }];

  await AsyncStorage.setItem('favoriteURLs', JSON.stringify(newFavorites)).then(
    () => {
      ToastAndroid.show('Adicionado aos favoritos!', ToastAndroid.SHORT);
    }
  );
};

export const removeFavorites = async (url) => {
  const existingFavorites = await retrieveFavorites();

  const newFavorites = existingFavorites.filter(
    (favorite) => favorite.url !== url
  );

  await AsyncStorage.setItem('favoriteURLs', JSON.stringify(newFavorites));
};

export const retrieveFavorites = async () => {
  const favorites = await AsyncStorage.getItem('favoriteURLs');

  if (favorites === null) {
    return [];
  }

  return JSON.parse(favorites);
};

export const checkIfIsAlreadyFavorited = async (url) => {
  const existingFavorites = await retrieveFavorites();

  return existingFavorites.some((favorite) => favorite.url === url);
};
