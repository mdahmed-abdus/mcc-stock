import React from 'react';
import { TouchableWithoutFeedback, View, Keyboard, Alert } from 'react-native';
import SearchBox from '../components/SearchBox';
import { getStockPrice } from '../services/stockService';

function SearchScreen(props) {
  const handleChangeSearchText = async text => {
    if (text.length === 0) {
      return;
    }

    text = text.replace(/[.*+\-?^${}()|[\]\\]/g, ''); //prevent the error caused by entering special characters
    console.log();
    console.log(text);
    const price = await getStockPrice(text);

    if (price) {
      Alert.alert(`Price of ${text} stock`, price);
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
