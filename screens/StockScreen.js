import React, { useState, useEffect } from 'react';
import { DefaultTheme } from '@react-navigation/native';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Alert,
  ScrollView,
  Keyboard,
} from 'react-native';
import { getChartData, getQuote } from '../services/stockService';
import { LineChart } from 'react-native-chart-kit';
import StockDetailRow from '../components/StockDetailRow';
import SearchBoxWithButton from '../components/SearchBoxWithButton';
import LoadingModal from '../components/LoadingModal';
import { getLatestExchangeRate } from '../services/exchangeService';
import { convertUsdToInr } from '../utils/calculator';

function StockScreen({ stockSymbol = '', setStockSymbol = () => {} }) {
  const [dataAvailable, setDataAvailable] = useState(false);
  const [dates, setDates] = useState([]);
  const [closes, setCloses] = useState([]);
  const [symbol, setSymbol] = useState(stockSymbol);
  const [stockQuote, setStockQuote] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [USD, setUSD] = useState(1);
  const [INR, setINR] = useState(1);

  const searchStock = async () => {
    Keyboard.dismiss();
    if (symbol.length === 0) {
      return;
    }

    setLoadingMessage('Loading...');

    console.log('Refreshing...');

    const { success: chartDataSuccess, data } = await getChartData(
      symbol,
      '1m'
    );
    const { success: quoteSuccess, data: stockQuoteData } = await getQuote(
      symbol
    );

    if (!chartDataSuccess || !quoteSuccess) {
      Alert.alert(
        'Data could not found',
        `Data could not be loaded for symbol "${symbol}"`
      );
      setDataAvailable(false);
      setLoadingMessage('');
      return;
    }

    const x = [];
    const y = [];
    for (const d of data) {
      x.push(d.date.replace('-', ' '));
      y.push(d.close.toFixed(2));
    }

    setDates(x);
    setCloses(y);
    setStockQuote(stockQuoteData);
    setDataAvailable(true);
    console.log('Refreshed');
    setLoadingMessage('');
  };

  const getChangePercent = () => {
    return (stockQuote.changePercent * 100).toFixed(2) + '%';
  };

  useEffect(() => {
    (async () => {
      const { success, data } = await getLatestExchangeRate();
      if (!success) {
        Alert.alert(
          'Exchange rate not available',
          'Please refer to USD amount'
        );
        return;
      }
      setUSD(data.USD);
      setINR(data.INR);

      if (symbol.length > 0) {
        searchStock();
      }
    })();

    return () => {
      setSymbol('');
      setStockSymbol(-1);
    };
  }, []);

  return (
    <ScrollView>
      <View style={style.main}>
        <LoadingModal loadingMessage={loadingMessage} />
        {dataAvailable && (
          <View style={style.dataContainer}>
            <Text style={style.text}>
              {stockQuote.companyName} [{stockQuote.symbol}]
            </Text>
            <Text style={style.infoText}>Showing data for 1 month</Text>
            <LineChart
              style={style.lineChart}
              data={{ labels: dates, datasets: [{ data: closes }] }}
              width={Dimensions.get('window').width}
              height={500}
              yAxisLabel="$"
              yAxisInterval={1}
              verticalLabelRotation={90}
              chartConfig={{
                backgroundGradientFrom: 'black',
                backgroundGradientTo: 'black',
                color: (opacity = 0) => 'rgba(255, 255, 255, 0.15)',
                labelColor: (opacity = 1) => 'rgba(255, 255, 255, 0.8)',
                propsForDots: {
                  fill: DefaultTheme.colors.primary,
                  r: '2',
                  strokeWidth: '2',
                  stroke: DefaultTheme.colors.primary,
                },
              }}
            />
            <View style={style.stockDetail}>
              <StockDetailRow
                propertyNames={['OPEN', '']}
                propertyValues={[
                  '$' + stockQuote.open.toFixed(2),
                  '₹' + convertUsdToInr(stockQuote.open, USD, INR),
                ]}
              />
              <StockDetailRow
                propertyNames={['CLOSE', '']}
                propertyValues={[
                  '$' + stockQuote.close.toFixed(2),
                  '₹' + convertUsdToInr(stockQuote.close, USD, INR),
                ]}
              />
              <StockDetailRow
                propertyNames={['LOW', '']}
                propertyValues={[
                  '$' + stockQuote.low.toFixed(2),
                  '₹' + convertUsdToInr(stockQuote.low, USD, INR),
                ]}
              />
              <StockDetailRow
                propertyNames={['HIGH', '']}
                propertyValues={[
                  '$' + stockQuote.high.toFixed(2),
                  '₹' + convertUsdToInr(stockQuote.high, USD, INR),
                ]}
              />
              <StockDetailRow
                propertyNames={['VOLUME', 'AVG VOLUME']}
                propertyValues={[
                  stockQuote.volume || stockQuote.latestVolume || 'N/A',
                  stockQuote.avgTotalVolume,
                ]}
              />
              <StockDetailRow
                propertyNames={['CHANGE', 'P/E']}
                propertyValues={[getChangePercent(), stockQuote.peRatio]}
              />
            </View>
          </View>
        )}
        <SearchBoxWithButton
          placeholder="Search stock by symbol (ex: tsla)"
          onChangeText={setSymbol}
          onPress={searchStock}
          buttonText="Search stock"
        />
      </View>
    </ScrollView>
  );
}

export default StockScreen;

const style = StyleSheet.create({
  main: {
    flex: 1,
    paddingBottom: 50,
    backgroundColor: 'black',
  },
  dataContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 10,
  },
  text: {
    paddingTop: 20,
    fontSize: 30,
    color: 'white',
  },
  infoText: {
    fontSize: 12,
    color: '#616263',
    paddingBottom: 20,
  },
  lineChart: {
    borderTopWidth: 1,
    padding: 10,
    paddingTop: 20,
    borderTopColor: 'white',
  },
  stockDetail: {
    borderTopWidth: 1,
    borderTopColor: 'white',
    width: '100%',
    padding: 10,
    display: 'flex',
    justifyContent: 'space-between',
  },
  stockName: {
    color: '#fff',
    fontSize: 20,
  },
});
