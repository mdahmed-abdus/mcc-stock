import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { DefaultTheme } from '@react-navigation/native';

function TabBarIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={27}
      color={
        props.focused ? DefaultTheme.colors.primary : DefaultTheme.colors.border
      }
    />
  );
}

export default TabBarIcon;
