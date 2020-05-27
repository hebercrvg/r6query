import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Player from '../screens/PlayerScreen';
import Home from '../screens/HomeScreen';
// import { Container } from './styles';
const StackNavigation = createStackNavigator();
const HomeStack = () => {
  return (
    <StackNavigation.Navigator initialRouteName="Home">
      <StackNavigation.Screen
        name="Home"
        component={Home}
        options={{ title: 'Home' }}
      />
      <StackNavigation.Screen
        name="Player"
        component={Player}
        options={({ route }) => ({ title: route.params.profile.p_name })}
      />
    </StackNavigation.Navigator>
  );
};

export default HomeStack;
