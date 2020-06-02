/* eslint-disable camelcase */
import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { Avatar, Card } from 'react-native-paper';
import { Container } from './styles';
import colors from '../../constants/Colors';
import { getRankIconByMMR } from '../../services/Rank';
import { getPlayer } from '../../services/R6tab';
import { getFavorites as getFavoritesStorage } from '../../services/Storage';

const Favorites = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  const getFavorites = useCallback(async () => {
    setLoading(true);
    const favoritesSaved = await getFavoritesStorage();
    favoritesSaved.forEach(item => {
      getPlayer({ playerId: item?.player?.p_id }).then(res => {
        item.player.p_name = res.data.player.p_name;
        console.log(res.data.player.p_name);
      });
    });

    //console.log(favoritesSaved);
    setTimeout(() => {
      setFavorites(favoritesSaved);
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    getFavorites();
  }, []);

  useEffect(() => {
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
        favorites?.map(item => (
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
                item?.stats?.level
              } | KD: ${item?.ranked?.kd?.toFixed(2)}`}
              subtitleStyle={{ fontSize: 16 }}
              left={props => (
                <Avatar.Image
                  {...props}
                  style={{ backgroundColor: colors.white }}
                  size={45}
                  source={{
                    uri: `https://ubisoft-avatars.akamaized.net/${item?.player?.p_id}/default_146_146.png`,
                  }}
                />
              )}
              right={props => (
                <Avatar.Image
                  {...props}
                  style={{ backgroundColor: colors.white }}
                  size={45}
                  source={{
                    uri: `https://tabstats.com/images/r6/ranks/?rank=${item?.ranked?.rank}&champ=0`,
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
