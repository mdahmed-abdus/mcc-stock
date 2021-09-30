import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchScreen from '../screens/SearchScreen';
import SettingsScreen from '../screens/SettingsScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import OthersScreen from '../screens/OthersScreen';
import TabBarIcon from '../components/TabBarIcon';

const BottomTab = createBottomTabNavigator();

function BottomNavigator(props) {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: 'Search Price by Stock Symbol',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="search" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="settings-outline" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{
          title: 'Favourites',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-star-outline" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Others"
        component={OthersScreen}
        options={{
          title: 'Others',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="information-circle-outline" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default BottomNavigator;
