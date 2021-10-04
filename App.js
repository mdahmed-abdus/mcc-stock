import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, View } from 'react-native';
import BottomNavigator from './navigation/BottomNavigator';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppearanceProvider } from 'react-native-appearance';
import * as Location from 'expo-location';
import * as MediaLibrary from 'expo-media-library';

const Stack = createStackNavigator();

export default function App() {
  const requestPermissions = async () => {
    console.log('Requesting permissions...');
    const { status: mls } = await MediaLibrary.requestPermissionsAsync();
    const { status: ls } = await Location.requestForegroundPermissionsAsync();

    if ([mls, ls].includes('denied')) {
      console.log('Permissions not granted');
      Alert.alert(
        'Permissions required',
        'Please enable permissions for the app to work properly'
      );
      return;
    }

    console.log('Permissions granted');
  };

  useEffect(() => {
    requestPermissions();
  }, []);

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
