/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  Subheading,
  Headline,
  Caption,
  Paragraph,
  Avatar,
  Card,
  Chip,
} from 'react-native-paper';
import { View } from 'react-native';
import {
  Container,
  StatsContainer,
  MatchesContainer,
  WinRateContainer,
  Stats,
  Title,
} from './styles';
import { getPlayer } from '../../services/R6tab';

const Player = ({ navigation, route }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    async function getPlayerData() {
      const { p_id: playerId } = route.params.profile;
      const res = await getPlayer({ playerId });
      if (res.status !== 200) {
        throw new Error('Erro na requisição;');
      }

      setData(res.data);
    }
    getPlayerData();
  }, []);

  return (
    <Container showsVerticalScrollIndicator={false}>
      <Card elevation={5} style={{ padding: 5 }}>
        <Card.Title
          style={{ marginTop: 12 }}
          title={data?.player?.p_name}
          subtitle={`Level: ${data?.stats?.level} | KD: ${data?.stats?.rankedpvp_kd}`}
          titleStyle={{ fontSize: 30, marginLeft: 40 }}
          subtitleStyle={{ fontSize: 18, marginLeft: 40 }}
          left={(props) => (
            <Avatar.Image
              {...props}
              size={80}
              source={{
                uri: `https://ubisoft-avatars.akamaized.net/${data?.player?.p_id}/default_146_146.png`,
              }}
            />
          )}
        />
        <Card.Content style={{ marginTop: 26 }}>
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
    </Container>
  );
};

Player.options = {
  title: 'CurrentScreen',
};

export default Player;
