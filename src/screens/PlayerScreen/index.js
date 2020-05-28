/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useCallback } from 'react';
import { Subheading, Headline, Avatar, Card, Button } from 'react-native-paper';
import { View, AsyncStorage, ActivityIndicator } from 'react-native';
import {
  Container,
  StatsContainer,
  MatchesContainer,
  Stats,
  Title,
} from './styles';
import { getPlayer } from '../../services/R6tab';
import {
  saveFavorite as saveFavoriteStorage,
  isFavorited as isFavoritedStorage,
  unfavorite,
} from '../../services/Storage';
import colors from '../../constants/Colors';

const Player = ({ route }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const isFavorited = useCallback(
    async playerId => {
      const favorited = await isFavoritedStorage({ playerId });
      return favorited;
    },
    [isFavoritedStorage],
  );
  const getPlayerData = async () => {
    setLoading(true);
    const { p_id: playerId } = route.params.profile;
    const res = await getPlayer({ playerId });
    if (res.status !== 200) {
      setLoading(false);
      throw new Error('Erro na requisição;');
    }
    res.data.isFavorited = await isFavorited(res.data?.player?.p_id);

    setData(res.data);
    setLoading(false);
  };

  const saveFavorite = useCallback(
    async player => {
      setLoading(true);
      const favorited = await isFavorited(player.player.p_id);

      if (favorited) {
        await unfavorite({ playerId: player.player.p_id });
        const newData = data;
        newData.isFavorited = !favorited;

        setData(newData);
        await getPlayerData();
        setLoading(false);
        return;
      }

      await saveFavoriteStorage({ player });
      const newData = data;
      newData.isFavorited = !favorited;

      setData(newData);
      await getPlayerData();
      setLoading(false);
    },
    [saveFavoriteStorage, unfavorite],
  );

  useEffect(() => {
    getPlayerData();
  }, []);

  return (
    <Container showsVerticalScrollIndicator={false}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Card elevation={5} style={{ padding: 5 }}>
          <Card.Title
            style={{ marginTop: 12 }}
            title={data?.player?.p_name}
            subtitle={`Level: ${data?.stats?.level} | KD: ${data?.stats?.rankedpvp_kd}`}
            titleStyle={{ fontSize: 24, marginLeft: 12 }}
            subtitleStyle={{ fontSize: 14, marginLeft: 12 }}
            leftStyle={{ marginLeft: 0 }}
            left={props => (
              <Avatar.Image
                {...props}
                size={60}
                source={{
                  uri: `https://ubisoft-avatars.akamaized.net/${data?.player?.p_id}/default_146_146.png`,
                }}
              />
            )}
            right={props => (
              <View>
                <Avatar.Icon
                  {...props}
                  size={40}
                  icon={data?.isFavorited ? 'heart' : 'heart-outline'}
                  color={colors.red}
                  style={{ backgroundColor: colors.white }}
                  onPress={() => saveFavorite(data)}
                />
              </View>
            )}
          />
          <Button onPress={() => saveFavorite(data)}>
            {data?.isFavorited ? 'UNFAVORITE' : 'FAVORITE'}
          </Button>
          <Card.Content>
            <Headline style={{ fontWeight: 'bold', marginTop: 8 }}>
              Ranked Stats
            </Headline>
            <StatsContainer>
              <View>
                <Title>Kills</Title>
                <Subheading>{data?.stats?.rankedpvp_kills}</Subheading>
              </View>
              <Stats>
                <Title>Deaths</Title>
                <Subheading>{data?.stats?.rankedpvp_death}</Subheading>
              </Stats>
              <Stats>
                <Title>Wins</Title>
                <Subheading>{data?.stats?.rankedpvp_matchwon}</Subheading>
              </Stats>
              <Stats>
                <Title>Losses</Title>
                <Subheading>{data?.stats?.rankedpvp_matchlost}</Subheading>
              </Stats>
            </StatsContainer>
            <MatchesContainer>
              <View>
                <Title>Winrate</Title>
                <Subheading>{data?.stats?.rankedpvp_wl}</Subheading>
              </View>
              <Stats>
                <Title>Hours Played</Title>
                <Subheading>{`${data?.stats?.rankedpvp_hoursplayed} hrs`}</Subheading>
              </Stats>
            </MatchesContainer>

            <Headline style={{ fontWeight: 'bold', marginTop: 8 }}>
              General Stats
            </Headline>
            <StatsContainer>
              <View>
                <Title>Kills</Title>
                <Subheading>{data?.stats?.generalpvp_kills}</Subheading>
              </View>
              <Stats>
                <Title>Deaths</Title>
                <Subheading>{data?.stats?.generalpvp_death}</Subheading>
              </Stats>
              <Stats>
                <Title>Wins</Title>
                <Subheading>{data?.stats?.generalpvp_matchwon}</Subheading>
              </Stats>
              <Stats>
                <Title>Losses</Title>
                <Subheading>{data?.stats?.generalpvp_matchlost}</Subheading>
              </Stats>
            </StatsContainer>
            <MatchesContainer>
              <View>
                <Title>Winrate</Title>
                <Subheading>{data?.stats?.generalpvp_wl}</Subheading>
              </View>
              <Stats>
                <Title>HS Rate</Title>
                <Subheading>{data?.stats?.generalpvp_hsrate}</Subheading>
              </Stats>
              <Stats>
                <Title>Hours Played</Title>
                <Subheading>{`${data?.stats?.rankedpvp_hoursplayed} hrs`}</Subheading>
              </Stats>
            </MatchesContainer>

            <Headline style={{ fontWeight: 'bold', marginTop: 8 }}>
              Casual Stats
            </Headline>
            <StatsContainer>
              <View>
                <Title>Kills</Title>
                <Subheading>{data?.stats?.casualpvp_kills}</Subheading>
              </View>
              <Stats>
                <Title>Deaths</Title>
                <Subheading>{data?.stats?.casualpvp_death}</Subheading>
              </Stats>
              <Stats>
                <Title>Wins</Title>
                <Subheading>{data?.stats?.casualpvp_matchwon}</Subheading>
              </Stats>
              <Stats>
                <Title>Losses</Title>
                <Subheading>{data?.stats?.casualpvp_matchlost}</Subheading>
              </Stats>
            </StatsContainer>
            <MatchesContainer>
              <View>
                <Title>Winrate</Title>
                <Subheading>{data?.stats?.casualpvp_wl}</Subheading>
              </View>

              <Stats>
                <Title>Hours Played</Title>
                <Subheading>{`${data?.stats?.casualpvp_hoursplayed} hrs`}</Subheading>
              </Stats>
            </MatchesContainer>
          </Card.Content>
        </Card>
      )}
    </Container>
  );
};

Player.options = {
  title: 'CurrentScreen',
};

export default Player;
