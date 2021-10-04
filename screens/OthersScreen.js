import { DefaultTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  TouchableWithoutFeedback,
  View,
  Text,
  Alert,
  Button,
  StyleSheet,
} from 'react-native';
import * as Location from 'expo-location';

function OthersScreen(props) {
  const [currentLocation, setCurrentLocation] = useState(null);

  const refreshLocation = async () => {
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
    refreshLocation();
  }, []);

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }}>
      <View style={style.mainView}>
        {currentLocation?.country ? (
          <Text style={style.textStyle}>
            Your location: {currentLocation.city}, {currentLocation.country} (
            {currentLocation.isoCountryCode})
          </Text>
        ) : (
          <Text style={style.textStyle}>Your location - not found</Text>
        )}
        <Text style={style.textStyle}>Powered by IEX Cloud</Text>
        <Button onPress={refreshLocation} title="Refresh Location" />
      </View>
    </TouchableWithoutFeedback>
  );
}

export default OthersScreen;

const style = StyleSheet.create({
  mainView: {
    flex: 1,
    padding: 10,
  },
  textStyle: {
    color: DefaultTheme.colors.card,
    padding: 5,
  },
});
