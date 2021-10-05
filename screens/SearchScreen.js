import React, { useState } from 'react';
import {
  TouchableWithoutFeedback,
  View,
  Keyboard,
  Alert,
  StyleSheet,
} from 'react-native';
import SearchBoxWithButton from '../components/SearchBoxWithButton';
import { getQuote } from '../services/stockService';

function SearchScreen(props) {
  const [text, setText] = useState('');

  const onPress = async () => {
    Keyboard.dismiss();
    if (text.length === 0) {
      return;
    }

    const { success, data: quote } = await getQuote(text);

    if (!success) {
      Alert.alert('Price could not be loaded', 'Please try again');
      return;
    }

    const percentage = (quote.changePercent * 100).toFixed(2);
    Alert.alert(
      `Price of ${quote.companyName} (${quote.symbol})`,
      `${quote.currency} ${quote.latestPrice} (${percentage}%)`
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={style.mainView}>
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

const style = StyleSheet.create({
  mainView: {
    flex: 1,
    padding: 10,
  },
});
