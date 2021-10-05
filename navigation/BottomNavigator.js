import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchScreen from '../screens/SearchScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import OthersScreen from '../screens/OthersScreen';
import TabBarIcon from '../components/TabBarIcon';
import StockScreen from '../screens/StockScreen';

const BottomTab = createBottomTabNavigator();

function BottomNavigator(props) {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: 'Search Stock by Symbol',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="search" />
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
        name="Stock"
        component={StockScreen}
        options={{
          title: 'Stock',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="analytics" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default BottomNavigator;
