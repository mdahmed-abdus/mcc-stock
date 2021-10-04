import { DefaultTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  TouchableWithoutFeedback,
  View,
  Pressable,
  Text,
  Keyboard,
  Alert,
  Button,
} from 'react-native';
import SearchBoxWithButton from '../components/SearchBoxWithButton';
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
      Alert.alert('Invalid symbol', `The stock symbol "${symbol}" is invalid`);
      return;
    }

    Object.keys(QuoteModel).forEach(k => {
      QuoteModel[k] = { ...QuoteModel[k], value: quote[k] };
    });

    QuoteModel['lossProfitColor'] =
      QuoteModel.changePercent.value >= 0 ? 'green' : 'red';

    setQuotes(quotes.concat([{ ...QuoteModel }]));
  };

  const showQuote = index => {
    console.log('show quote:', index);
    // implement
  };

  const removeStock = async index => {
    console.log('removed index:', index);
    if (index > -1) {
      quotes.splice(index, 1);
      setQuotes([...quotes]);
    }
  };

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <View style={{ padding: 10 }}>
        {quotes.map((q, i) => (
          <Pressable
            key={i}
            style={{
              padding: 5,
              margin: 5,
              borderColor: DefaultTheme.colors.card,
              borderWidth: 1,
            }}
            onPress={() => showQuote(i)}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ color: DefaultTheme.colors.card, padding: 5 }}>
                {q.companyName.value} ({q.symbol.value})
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text
                  style={{
                    color: q.lossProfitColor,
                    padding: 5,
                    paddingHorizontal: 10,
                  }}
                >
                  {(q.changePercent.value * 100).toFixed(2)}%
                </Text>
                <Button
                  color="rgba(255, 0, 0, 0.6)"
                  onPress={() => removeStock(i)}
                  title={'Remove'}
                ></Button>
              </View>
            </View>
          </Pressable>
        ))}
        <SearchBoxWithButton
          placeholder="Search stock by symbol (ex: tsla)"
          onChangeText={setSymbol}
          onPress={handleOnPress}
          buttonText="Add stock"
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

export default FavouritesScreen;
