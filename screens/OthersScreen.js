import { DefaultTheme } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  TouchableWithoutFeedback,
  View,
  Text,
  Alert,
  StyleSheet,
} from 'react-native';
import PressableButton from '../components/PressableButton';
import * as Location from 'expo-location';
import { auth, signOut } from '../services/firebase';

function OthersScreen(props) {
  const navigation = useNavigation();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.replace('auth');
    } catch (e) {
      console.log('Could not sign out');
      console.log(e.message);
    }
  };

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
        <PressableButton
          onPress={refreshLocation}
          buttonText="Refresh location"
        />
        <PressableButton onPress={handleSignOut} buttonText="Sign out" />
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
