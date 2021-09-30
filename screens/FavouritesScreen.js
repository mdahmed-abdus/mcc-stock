import { DefaultTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  TouchableWithoutFeedback,
  View,
  Pressable,
  Text,
  Keyboard,
  Alert,
} from 'react-native';
import SearchBox from '../components/SearchBox';
import { scaleSize } from '../constants/layout';

function FavouritesScreen(props) {
  const [symbol, setSymbol] = useState('');

  const handleChangeSearchText = async text => setSymbol(text);

  const handleOnPress = () => {
    Keyboard.dismiss();
    if (symbol.length === 0) {
      Alert.alert('Invalid symbol', 'Please enter stock symbol');
      return;
    }

    console.log('handleOnPress -', symbol);
  };

  const loadPressableTextStyle = pressed =>
    pressed
      ? { color: DefaultTheme.colors.primary }
      : { color: DefaultTheme.colors.card };

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <View style={{ padding: 10 }}>
        <SearchBox
          placeholder="Search stock by symbol (ex: tsla)"
          handleChangeSearchText={text => setSymbol(text)}
          wait={0}
        />
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? DefaultTheme.colors.card
                : DefaultTheme.colors.primary,
              borderColor: DefaultTheme.colors.primary,
            },
            {
              borderWidth: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: scaleSize(40),
              marginHorizontal: scaleSize(3),
              marginTop: scaleSize(5),
            },
          ]}
          onPress={handleOnPress}
        >
          {({ pressed }) => (
            <Text style={loadPressableTextStyle(pressed)}>Add stock</Text>
          )}
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default FavouritesScreen;
