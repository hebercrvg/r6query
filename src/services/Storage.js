import { AsyncStorage } from 'react-native';

export const saveFavorite = async ({ player = {} }) => {
  const favorites = await AsyncStorage.getItem('@r6query/favorites');

  if (!favorites) {
    const newFavorites = [];
    newFavorites.push(player);
    await AsyncStorage.setItem(
      '@r6query/favorites',
      JSON.stringify(newFavorites)
    );
    return;
  }
  const favoritesParsed = JSON.parse(favorites);
  favoritesParsed.push(player);
  await AsyncStorage.setItem(
    '@r6query/favorites',
    JSON.stringify(favoritesParsed)
  );
};

export const unfavorite = async ({ playerId = '' }) => {
  const favorites = await AsyncStorage.getItem('@r6query/favorites');
  // await AsyncStorage.clear();
  if (!favorites) {
    return;
  }
  const favoritesParsed = JSON.parse(favorites);

  const newFavorites = favoritesParsed.filter(
    (x) => x.player.p_id !== playerId
  );

  await AsyncStorage.setItem(
    '@r6query/favorites',
    JSON.stringify(newFavorites)
  );
};

export const isFavorited = async ({ playerId = '' }) => {
  const favorites = await AsyncStorage.getItem('@r6query/favorites');
  const favoritesParsed = favorites ? JSON.parse(favorites) : [];

  if (favoritesParsed?.length === 0 || !favoritesParsed) {
    return false;
  }

  const isFavorite = favoritesParsed.filter((x) => x.player.p_id === playerId);

  return !!isFavorite.length;
};

export const getFavorites = async () => {
  const favorites = await AsyncStorage.getItem('@r6query/favorites');
  const favoritesParsed = favorites ? JSON.parse(favorites) : [];
  return favoritesParsed;
};
