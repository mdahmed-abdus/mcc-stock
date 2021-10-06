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
import { auth } from '../services/firebase';
import LoadingModal from '../components/LoadingModal';

function OthersScreen(props) {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState('');

  const navigation = useNavigation();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigation.replace('auth');
    } catch (e) {
      console.log('Could not sign out');
      console.log(e.message);
    }
  };

  const refreshLocation = async () => {
    console.log('Refreshing location...');
    setLoadingMessage('Loading...');
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
      console.log('Location refreshed');
    } catch (e) {
      console.log('Location error');
      console.log(e);
      Alert.alert('Location error', e.message);
      console.log('Could not refresh location');
    } finally {
      setLoadingMessage('');
    }
  };

  useEffect(() => {
    refreshLocation();
  }, []);

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }}>
      <View style={style.mainView}>
        <LoadingModal loadingMessage={loadingMessage} />
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
