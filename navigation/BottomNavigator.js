import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavouritesScreen from '../screens/FavouritesScreen';
import OthersScreen from '../screens/OthersScreen';
import TabBarIcon from '../components/TabBarIcon';
import StockScreen from '../screens/StockScreen';
import ChatScreen from '../screens/ChatScreen';

const BottomTab = createBottomTabNavigator();

function BottomNavigator(props) {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Stock"
        component={StockScreen}
        options={{
          title: 'Stock',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="analytics" />
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
      <BottomTab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          title: 'Chat',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              name="md-chatbubble-ellipses-outline"
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default BottomNavigator;
