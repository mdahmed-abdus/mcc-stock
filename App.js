import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import BottomNavigator from './navigation/BottomNavigator';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppearanceProvider } from 'react-native-appearance';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AppearanceProvider>
      <View style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <NavigationContainer theme={DarkTheme}>
          <Stack.Navigator>
            <Stack.Screen name="mcc-stock" component={BottomNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </AppearanceProvider>
  );
}
