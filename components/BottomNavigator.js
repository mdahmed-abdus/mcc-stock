import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/SearchScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TabBarIcon from './TabBarIcon';

const BottomTab = createBottomTabNavigator();

function BottomNavigator(props) {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
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
    </BottomTab.Navigator>
  );
}

export default BottomNavigator;
