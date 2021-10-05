import { DefaultTheme } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  TouchableWithoutFeedback,
  View,
  Pressable,
  Text,
  Keyboard,
  Alert,
  Button,
  StyleSheet,
  Modal,
} from 'react-native';
import SearchBoxWithButton from '../components/SearchBoxWithButton';
import { getQuote } from '../services/stockService';
import * as FileSystem from 'expo-file-system';
import PressableButton from '../components/PressableButton';
import { ScrollView } from 'react-native-gesture-handler';

function FavouritesScreen(props) {
  const fileUri = FileSystem.documentDirectory + 'fav-stocks.txt';
  const [quotes, setQuotes] = useState([]);
  const [symbol, setSymbol] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('');

  const loadSaved = async () => {
    console.log('Loading...');
    setLoadingMessage('Loading...');
    setQuotes([]);

    const savedSymbols = (await FileSystem.readAsStringAsync(fileUri))
      .split(' ')
      .filter(d => d.length !== 0);

    if (savedSymbols.length === 0) {
      Alert.alert('No saved favourites', 'Saved favourites could not be found');
      console.log('Loading complete');
      setLoadingMessage('');
      return;
    }

    let i = 1;
    const temp = [];

    for (const s of savedSymbols) {
      const quote = await getQuote(s);
      if (!quote.success) {
        continue;
      }

      quote.lossProfitColor = quote.changePercent >= 0 ? 'green' : 'red';
      temp.push(quote);
      setLoadingMessage(`Loading... ${i++}/${savedSymbols.length}`);
    }

    setQuotes(temp);
    setLoadingMessage('');
    console.log('Loading complete');
  };

  const save = async () => {
    console.log('Saving...');
    let data = '';
    for (const q of quotes) {
      data += q.symbol + ' ';
    }

    await FileSystem.writeAsStringAsync(fileUri, data);

    Alert.alert('Saved', 'Favourites saved');
    console.log('Favs saved:', fileUri);
  };

  const saveToFile = async () => {
    if (quotes.length === 0) {
      Alert.alert('Saving noting', 'All favourites will be deleted', [
        { text: 'No' },
        { text: 'Yes', onPress: save },
      ]);
      return;
    }
    save();
  };

  const handleOnPress = async () => {
    Keyboard.dismiss();
    if (symbol.length === 0) {
      Alert.alert('Invalid symbol', 'Please enter stock symbol');
      return;
    }

    console.log('handleOnPress -', symbol);
    const quote = await getQuote(symbol);

    if (!quote.success) {
      Alert.alert('Invalid symbol', `The stock symbol "${symbol}" is invalid`);
      return;
    }

    quote.lossProfitColor = quote.changePercent >= 0 ? 'green' : 'red';
    setQuotes([...quotes, quote]);
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

  useEffect(() => {
    loadSaved();
  }, []);

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <ScrollView style={style.mainView}>
        <Modal visible={loadingMessage.length !== 0}>
          <View style={style.loadingModal}>
            <Text style={style.loadingText}>{loadingMessage}</Text>
          </View>
        </Modal>

        {quotes.map((q, i) => (
          <Pressable
            key={i}
            style={style.favPressable}
            onPress={() => showQuote(i)}
          >
            <View style={style.favView}>
              <Text style={style.favText}>
                {q.companyName} ({q.symbol})
              </Text>
              <View style={style.favSecTwoView}>
                <Text style={style.lossProfitText(q)}>
                  {(q.changePercent * 100).toFixed(2)}%
                </Text>
                <Button
                  color="rgba(255, 0, 0, 0.6)"
                  onPress={() => removeStock(i)}
                  title="Remove"
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
        <PressableButton onPress={saveToFile} buttonText="Save" />
        <PressableButton onPress={loadSaved} buttonText="Load saved" />
        <View style={{ padding: 40 }} />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

export default FavouritesScreen;

const style = StyleSheet.create({
  mainView: {
    padding: 10,
  },
  favPressable: {
    padding: 5,
    margin: 5,
    borderColor: DefaultTheme.colors.card,
    borderWidth: 1,
  },
  favView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  favText: {
    color: DefaultTheme.colors.card,
    padding: 5,
  },
  favSecTwoView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lossProfitText: q => {
    return {
      color: q.lossProfitColor,
      padding: 5,
      paddingHorizontal: 10,
    };
  },
  loadingModal: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: DefaultTheme.colors.text,
  },
  loadingText: {
    fontSize: 30,
    color: DefaultTheme.colors.primary,
  },
});
