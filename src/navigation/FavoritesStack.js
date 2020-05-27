import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Player from '../screens/PlayerScreen';
import Favorites from '../screens/FavoritesScreen';
// import { Container } from './styles';
const StackNavigation = createStackNavigator();
const FavoritesStack = () => {
  return (
    <StackNavigation.Navigator initialRouteName="Home">
      <StackNavigation.Screen
        name="Home"
        component={Favorites}
        options={{ title: 'Favorites' }}
      />
      <StackNavigation.Screen
        name="Player"
        component={Player}
        options={({ route }) => ({ title: route.params.profile.p_name })}
      />
    </StackNavigation.Navigator>
  );
};

export default FavoritesStack;
