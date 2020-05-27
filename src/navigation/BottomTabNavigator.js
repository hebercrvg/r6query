import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeStack from './HomeStack';

const BottomTab = createBottomTabNavigator();
// const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  return (
    <BottomTab.Navigator initialRouteName="HomeStack">
      <BottomTab.Screen
        name="Home"
        component={HomeStack}
        options={{
          title: 'Players',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-search" />
          ),
        }}
      />
      {/* <BottomTab.Screen
        name="GetStarted"
        component={HomeScreen}
        options={{
          title: 'Favorites',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-heart" />
          ),
        }}
      /> */}
      {/* <BottomTab.Screen
        name="Links"
        component={LinksScreen}
        options={{
          title: 'Resources',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-book" />
          ),
        }}
      /> */}
    </BottomTab.Navigator>
  );
}
