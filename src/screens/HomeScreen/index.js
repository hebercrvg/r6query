/* eslint-disable react/prop-types */
import React, { useCallback, useState } from 'react';
import { Alert, Keyboard, View } from 'react-native';
import {
  TextInput,
  Card,
  Avatar,
  Searchbar,
  RadioButton,
  Text,
} from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { FlatList } from 'react-native-gesture-handler';
import { Container, Form, SubmitButton } from './styles';
import colors from '../../constants/Colors';
import { search } from '../../services/R6tab';
import { getRankIconByMMR } from '../../services/Rank';

const HomeScreen = ({ navigation }) => {
  const [nickname, setNickName] = useState('');
  const [platform, setPlatform] = useState('');
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleChangeNickname = useCallback(
    value => {
      setNickName(value);
    },
    [setNickName],
  );

  const handleSearch = useCallback(async () => {
    console.log(platform);
    Keyboard.dismiss();
    setLoading(true);
    if (!platform) {
      setLoading(false);
      Alert.alert('Ops...', 'Informe a plataforma.');
      return;
    }

    const res = await search({
      nickname,
      platform,
    });

    if (res.status !== 200) {
      setLoading(false);
      throw new Error('Erro requisição.');
    }

    // const players = res.data.pyers
    const playersKeys = Object.keys(res.data.players);
    if (!playersKeys) {
      setLoading(false);
      throw new Error('Nao encontrado');
    }
    const playersMapped = [];
    // setPlayers(res.data.players);
    playersKeys.forEach(key => {
      playersMapped.push(res.data.players[key]);
    });

    setPlayers(playersMapped);
    setLoading(false);
  }, [nickname, platform]);

  const renderPlayersCards = ({ item }) => {
    return (
      <Card
        onPress={() => navigation.navigate('Player', { profile: item.profile })}
        elevation={5}
        style={{
          marginTop: 16,
          marginBottom: 5,
          marginLeft: 5,
          marginRight: 5,
        }}
      >
        <Card.Title
          title={item.profile.p_name}
          subtitle={`Level: ${item.stats.level} | KD: ${item.ranked.kd.toFixed(
            2,
          )}`}
          subtitleStyle={{ fontSize: 16 }}
          left={props => (
            <Avatar.Image
              {...props}
              style={{ backgroundColor: colors.white }}
              size={45}
              source={{
                uri: `https://ubisoft-avatars.akamaized.net/${item.profile.p_id}/default_146_146.png`,
              }}
            />
          )}
          right={props => (
            <Avatar.Image
              {...props}
              style={{ backgroundColor: colors.white }}
              size={45}
              source={{
                uri: getRankIconByMMR(item.ranked.mmr),
              }}
            />
          )}
        />
        <Card.Content />
      </Card>
    );
  };
  return (
    <Container>
      <Form>
        <Searchbar
          placeholder="Search"
          onChangeText={handleChangeNickname}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <View style={{ marginTop: 10 }}>
          <RadioButton.Group
            onValueChange={value => setPlatform(value)}
            value={platform}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}
            >
              <View>
                <Text>XBOX</Text>
                <RadioButton value="xbl" />
              </View>
              <View>
                <Text>PSN</Text>
                <RadioButton value="psn" />
              </View>
              <View>
                <Text>UPLAY</Text>
                <RadioButton value="uplay" />
              </View>
            </View>
          </RadioButton.Group>
        </View>
        <SubmitButton onPress={handleSearch} loading={loading}>
          SEARCH
        </SubmitButton>
      </Form>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={players}
        onRefresh={handleSearch}
        refreshing={false}
        keyExtractor={item => String(item.profile.p_id)}
        renderItem={renderPlayersCards}
      />
    </Container>
  );
};

export default HomeScreen;
