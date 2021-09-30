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
import { QuoteModel } from '../models/QuoteModel';
import { getQuote } from '../services/stockService';

function FavouritesScreen(props) {
  const [quotes, setQuotes] = useState([]);
  const [symbol, setSymbol] = useState('');

  const handleOnPress = async () => {
    Keyboard.dismiss();
    if (symbol.length === 0) {
      Alert.alert('Invalid symbol', 'Please enter stock symbol');
      return;
    }

    let alreadyAdded = false;
    quotes.forEach(q => {
      alreadyAdded = q.symbol.value === symbol.toUpperCase();
    });
    if (alreadyAdded) {
      Alert.alert('Already a favourite', `${symbol} is a favourite.`);
      return;
    }

    console.log('handleOnPress -', symbol);
    const quote = await getQuote(symbol);

    if (!quote.success) {
      Alert.alert('Invalid symbol', 'The stock symbol entered is invalid');
      return;
    }

    Object.keys(QuoteModel).forEach(k => {
      QuoteModel[k] = { ...QuoteModel[k], value: quote[k] };
    });

    setQuotes(quotes.concat([{ ...QuoteModel }]));
  };

  const loadPressableTextStyle = pressed =>
    pressed
      ? { color: DefaultTheme.colors.primary }
      : { color: DefaultTheme.colors.card };

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <View style={{ padding: 10 }}>
        {quotes.map((q, i) => (
          <Text key={i} style={{ color: DefaultTheme.colors.card, padding: 5 }}>
            {q.companyName.value} ({q.symbol.value})
          </Text>
        ))}
        <SearchBox
          placeholder="Search stock by symbol (ex: tsla)"
          handleChangeSearchText={text => setSymbol(text)}
          wait={0}
        />
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? DefaultTheme.colors.text
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
