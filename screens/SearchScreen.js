import React from 'react';
import { TouchableWithoutFeedback, View, Keyboard, Alert } from 'react-native';
import SearchBox from '../components/SearchBox';
import { getQuote } from '../services/stockService';

function SearchScreen(props) {
  const handleChangeSearchText = async text => {
    if (text.length === 0) {
      return;
    }

    text = text.replace(/[.*+\-?^${}()|[\]\\]/g, ''); //prevent the error caused by entering special characters
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
          flex: 1, // get full space
        }}
      >
        <SearchBox
          placeholder="Enter stock symbol (ex: tsla)"
          handleChangeSearchText={handleChangeSearchText}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

export default SearchScreen;
