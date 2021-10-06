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
import PressableButton from '../components/PressableButton';
import { ScrollView } from 'react-native-gesture-handler';
import LoadingModal from '../components/LoadingModal';
import { loadFavs, saveFavs } from '../services/firebase';
import StockScreen from './StockScreen';

function FavouritesScreen(props) {
  const [quotes, setQuotes] = useState([]);
  const [symbol, setSymbol] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('');
  const [showStockScreen, setShowStockScreen] = useState(-1);

  const loadSavedFromCloud = async () => {
    try {
      console.log('Loading from cloud...');
      setLoadingMessage('Loading...');
      setQuotes([]);

      const { symbols: symbolsFromCloud } = await loadFavs();

      let i = 1;
      const temp = [];

      if (symbolsFromCloud.length === 0) {
        throw new Error('No data saved in cloud');
      }

      for (const s of symbolsFromCloud) {
        setLoadingMessage(`Loading... ${i++}/${symbolsFromCloud.length}`);
        const { success, data: quote } = await getQuote(s);
        if (!success) {
          continue;
        }

        quote.lossProfitColor = quote.changePercent >= 0 ? 'green' : 'red';
        temp.push(quote);
      }
      setQuotes(temp);
    } catch (err) {
      Alert.alert('No saved favourites', 'Saved favourites could not be found');
      console.log('Could not load from cloud');
    } finally {
      setLoadingMessage('');
      console.log('Loading complete');
    }
  };

  const continueSavingToCloud = async () => {
    const data = [];
    for (const q of quotes) {
      data.push(q.symbol);
    }
    await saveFavs(data);
    Alert.alert('Saved', 'Favourites saved');
  };

  const saveToCloud = async () => {
    try {
      console.log('Saving to cloud...');

      if (quotes.length === 0) {
        Alert.alert('Saving noting', 'All favourites will be deleted', [
          { text: 'No' },
          { text: 'Yes', onPress: continueSavingToCloud },
        ]);
        return;
      }

      await continueSavingToCloud();
    } catch (e) {
      Alert.alert('Something went wrong', 'Could not save to cloud');
      console.log('Could not save to cloud');
    } finally {
      console.log('Saved to cloud');
    }
  };

  const handleOnPress = async () => {
    Keyboard.dismiss();
    if (symbol.length === 0) {
      Alert.alert('Invalid symbol', 'Please enter stock symbol');
      return;
    }

    console.log('handleOnPress -', symbol);
    const { success, data: quote } = await getQuote(symbol);

    if (!success) {
      Alert.alert('Invalid symbol', `The stock symbol "${symbol}" is invalid`);
      return;
    }

    quote.lossProfitColor = quote.changePercent >= 0 ? 'green' : 'red';
    setQuotes([...quotes, quote]);
  };

  const showQuote = index => setShowStockScreen(index);

  const removeStock = async index => {
    console.log('removed index:', index);
    if (index > -1) {
      quotes.splice(index, 1);
      setQuotes([...quotes]);
    }
  };

  useEffect(() => {
    loadSavedFromCloud();
  }, []);

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1, backgroundColor: 'black' }}
      onPress={Keyboard.dismiss}
    >
      <ScrollView style={style.mainView}>
        <LoadingModal loadingMessage={loadingMessage} />
        {showStockScreen !== -1 && (
          <Modal visible={showStockScreen !== -1}>
            <View style={{ backgroundColor: 'black', flex: 1 }}>
              <StockScreen
                stockSymbol={quotes[showStockScreen].symbol}
                setStockSymbol={setShowStockScreen}
              />
              <PressableButton
                buttonText="Close"
                onPress={() => setShowStockScreen(-1)}
              />
            </View>
          </Modal>
        )}
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
        <PressableButton onPress={saveToCloud} buttonText="Save to cloud" />
        <PressableButton
          onPress={loadSavedFromCloud}
          buttonText="Load saved from cloud"
        />
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
    alignItems: 'center',
  },
  lossProfitText: q => {
    return {
      color: q.lossProfitColor,
      padding: 5,
      paddingHorizontal: 10,
    };
  },
});
