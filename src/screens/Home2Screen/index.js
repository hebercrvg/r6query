import React, { useCallback, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
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

const Home2Screen = () => {
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

    setPlayers(res.data.players);
    console.log(res.data.players.profile);
  }, [nickname, platform]);

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
            { label: 'XBOX', value: 'xbl' },
            { label: 'Playstation', value: 'psn' },
            { label: 'PC', value: 'uplay' },
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
          <PlayerButton>
            <PlayerAvatar
              source={{
                uri: `https://ubisoft-avatars.akamaized.net/${item.profile.Formp_id}/default_146_146.png`,
              }}
            />
            <PlayerNickname>{item.profile.p_name}</PlayerNickname>
          </PlayerButton>
        )}
      />
    </Container>
  );
};

export default Home2Screen;
