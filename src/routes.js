import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigation from './navigation/BottomTabNavigator';
import HomeStack from './navigation/HomeStack';
// import { Container } from './styles';

const src = () => {
  return (
    <>
      {Platform.OS === 'ios' && <StatusBar barStyle="default" translucent />}
      <NavigationContainer>
        <BottomTabNavigation />
      </NavigationContainer>
    </>
  );
};

export default src;
