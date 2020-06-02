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
  Snackbar,
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
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const handleChangeNickname = useCallback(
    value => {
      setNickName(value);
    },
    [setNickName],
  );

  const showToast = (visible = false, message = '') => {
    setToastVisible(visible);
    setToastMessage(message);
  };

  const handleSearch = useCallback(async () => {
    Keyboard.dismiss();
    setLoading(true);
    if (!platform) {
      setLoading(false);
      Alert.alert('Ops...', 'Select one platform.');
      return;
    }
    if (!nickname) {
      setLoading(false);
      Alert.alert('Ops...', 'Type a nickname.');
      return;
    }

    const res = await search({
      nickname,
      platform,
    });

    if (res.status !== 200) {
      setLoading(false);
      setLoading(false);
      showToast(true, 'Network error.');
    }

    // const players = res.data.pyers
    const playersKeys = Object.keys(res.data.players);
    if (!playersKeys || playersKeys?.length == 0) {
      setLoading(false);
      showToast(true, 'Player not found.');
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
                uri: `https://tabstats.com/images/r6/ranks/?rank=${item.ranked.rank}&champ=0`,
              }}
            />
          )}
          rightStyle={{ marginRight: 5 }}
        />
        <Card.Content />
      </Card>
    );
  };
  return (
    <>
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
      <Snackbar
        duration={3000}
        visible={toastVisible}
        onDismiss={() => setToastVisible(false)}
      >
        {toastMessage}
      </Snackbar>
    </>
  );
};

export default HomeScreen;
