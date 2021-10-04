import React, { useState } from 'react';
import { TouchableWithoutFeedback, View, Keyboard, Alert } from 'react-native';
import SearchBoxWithButton from '../components/SearchBoxWithButton';
import { getQuote } from '../services/stockService';

function SearchScreen(props) {
  const [text, setText] = useState('');

  const onPress = async () => {
    if (text.length === 0) {
      return;
    }

    console.log();
    console.log(text);

    const {
      success,
      companyName,
      symbol,
      latestPrice: price,
      currency,
      close,
      open,
    } = await getQuote(text);

    if (success) {
      const percentage = (((close - open) * 100) / open).toFixed(2);
      console.log(percentage);
      Alert.alert(
        `Price of ${companyName} (${symbol})`,
        `${currency} ${price} (${percentage}%)`
      );
    } else {
      Alert.alert('Price could not be loaded', 'Please try again');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          flex: 1,
          padding: 10,
        }}
      >
        <SearchBoxWithButton
          placeholder="Search stock by symbol (ex: tsla)"
          onChangeText={setText}
          onPress={onPress}
          buttonText="Search stock"
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

export default SearchScreen;
