import { DefaultTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  TouchableWithoutFeedback,
  View,
  Text,
  Alert,
  Button,
} from 'react-native';
import * as Location from 'expo-location';

function OthersScreen(props) {
  const [currentLocation, setCurrentLocation] = useState(null);

  const x = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const { latitude, longitude } = location.coords;
      const postalAddress = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      setCurrentLocation(postalAddress[0]);
      console.log(postalAddress[0]);
    } catch (e) {
      console.log('Location error');
      console.log(e);
      Alert.alert('Location error', e.message);
    }
  };

  useEffect(() => {
    console.log('OthersScreen - useEffect');
    x();
  }, []);

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }}>
      <View style={{ padding: 10 }}>
        {currentLocation?.country ? (
          <Text style={{ color: DefaultTheme.colors.card }}>
            Your location: {currentLocation.city}, {currentLocation.country} (
            {currentLocation.isoCountryCode})
          </Text>
        ) : (
          <Text style={{ color: DefaultTheme.colors.card, padding: 5 }}>
            Your location - not found
          </Text>
        )}
        <Text style={{ color: DefaultTheme.colors.card, padding: 5 }}>
          Powered by IEX Cloud
        </Text>
        <Button onPress={x} title="Refresh Location" />
      </View>
    </TouchableWithoutFeedback>
  );
}

export default OthersScreen;
