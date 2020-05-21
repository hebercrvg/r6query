import React, { useCallback, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { TextInput, Card, Avatar } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { FlatList } from 'react-native-gesture-handler';
import {
  Container,
  Form,
  SubmitButton,
  PlayerAvatar,
  PlayerButton,
  PlayerNickname,
} from './styles';
import colors from '../../constants/Colors';
import { search } from '../../services/R6tab';

const Home2Screen = ({ navigation }) => {
  const [nickname, setNickName] = useState('');
  const [platform, setPlatform] = useState('');
  const [players, setPlayers] = useState([]);
  const handleChangeNickname = useCallback(
    (value) => {
      setNickName(value);
    },
    [setNickName]
  );

  const handleSearch = useCallback(async () => {
    if (!platform) {
      Alert.alert('Informe plataforma', 'ok');
      return;
    }

    const res = await search({
      nickname,
      platform,
    });
    if (res.status !== 200) {
      throw new Error('Erro requisição.');
    }

    // const players = res.data.pyers
    const playersKeys = Object.keys(res.data.players);
    if (!playersKeys) {
      throw new Error('Nao encontrado');
    }
    const playersMapped = [];
    // setPlayers(res.data.players);
    playersKeys.forEach((key) => {
      playersMapped.push(res.data.players[key]);
    });

    setPlayers(playersMapped);
  }, [nickname, platform]);

  const getPlatformIcon = useCallback(
    ({ props }) => {
      switch (platform) {
        case 'xbl':
          return (
            <Avatar.Icon
              {...props}
              style={{ backgroundColor: 'white' }}
              size={60}
              icon="xbox"
            />
          );
        case 'psn':
          return (
            <Avatar.Icon
              {...props}
              style={{ backgroundColor: 'white' }}
              size={60}
              icon="playstation"
            />
          );
        case 'uplay':
          return (
            <Avatar.Icon
              {...props}
              style={{ backgroundColor: 'white' }}
              size={60}
              icon="ubisoft"
            />
          );
        default:
          return (
            <Avatar.Icon
              {...props}
              style={{ backgroundColor: 'white' }}
              size={60}
              icon="ubisoft"
            />
          );
      }
    },
    [platform]
  );

  return (
    <Container>
      <Form>
        <TextInput
          mode="outlined"
          label="Nickname"
          placeholder="Type a nickname"
          onChangeText={handleChangeNickname}
        />
        <RNPickerSelect
          onValueChange={(value) => setPlatform(value)}
          items={[
            { label: 'Xbox', value: 'xbl' },
            { label: 'Playstation', value: 'psn' },
            { label: 'Uplay', value: 'uplay' },
          ]}
        />
        <SubmitButton onPress={handleSearch}>SEARCH</SubmitButton>
      </Form>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={players}
        onRefresh={handleSearch}
        refreshing={false}
        keyExtractor={(item) => String(item.profile.p_id)}
        renderItem={({ item }) => (
          <Card style={{ marginTop: 16 }}>
            <Card.Title
              title={item.profile.p_name}
              subtitle={`Level: ${
                item.stats.level
              } | KD: ${item.ranked.kd.toFixed(2)}`}
              subtitleStyle={{ fontSize: 16 }}
              left={(props) => (
                <Avatar.Image
                  {...props}
                  style={{ backgroundColor: colors.primary }}
                  source={{
                    uri: `https://ubisoft-avatars.akamaized.net/${item.profile.p_id}/default_146_146.png`,
                  }}
                />
              )}
              right={(props) => getPlatformIcon({ props })}
            />
          </Card>
        )}
      />
    </Container>
  );
};

export default Home2Screen;
