/* eslint-disable camelcase */
import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { Avatar, Card } from 'react-native-paper';
import { Container } from './styles';
import colors from '../../constants/Colors';
import { getRankIconByMMR } from '../../services/Rank';
import { getFavorites as getFavoritesStorage } from '../../services/Storage';

const Favorites = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  const getFavorites = useCallback(async () => {
    setLoading(true);
    const favoritesSaved = await getFavoritesStorage();

    setFavorites(favoritesSaved);
    setLoading(false);
  }, []);

  useEffect(() => {
    getFavorites();
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getFavorites();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <Container>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        favorites.map((item) => (
          <Card
            key={String(item?.player?.p_id)}
            onPress={() =>
              navigation.navigate('Player', { profile: item?.player })
            }
            elevation={5}
            style={{
              marginTop: 16,
              marginBottom: 5,
              marginLeft: 5,
              marginRight: 5,
            }}
          >
            <Card.Title
              title={item?.player?.p_name}
              subtitle={`Level: ${
                item?.stats.level
              } | KD: ${item?.ranked?.kd?.toFixed(2)}`}
              subtitleStyle={{ fontSize: 16 }}
              left={(props) => (
                <Avatar.Image
                  {...props}
                  style={{ backgroundColor: colors.white }}
                  size={45}
                  source={{
                    uri: `https://ubisoft-avatars.akamaized.net/${item?.player?.p_id}/default_146_146.png`,
                  }}
                />
              )}
              right={(props) => (
                <Avatar.Image
                  {...props}
                  style={{ backgroundColor: colors.white }}
                  size={45}
                  source={{
                    uri: getRankIconByMMR(item?.ranked.mmr),
                  }}
                />
              )}
            />
            <Card.Content />
          </Card>
        ))
      )}
    </Container>
  );
};

export default Favorites;
