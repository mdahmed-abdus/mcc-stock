import React, { useState } from 'react';
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

function StockScreen(props) {
  const [dataAvailable, setDataAvailable] = useState(false);
  const [dates, setDates] = useState([]);
  const [closes, setCloses] = useState([]);
  const [symbol, setSymbol] = useState('');
  const [stockQuote, setStockQuote] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState('');

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
      symbol,
      '1m'
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
      y.push(d.close);
    }

    setDates(x);
    setCloses(y);
    setStockQuote(stockQuoteData);
    setDataAvailable(true);
    console.log('Refreshed');
    setLoadingMessage('');
  };

  return (
    <ScrollView>
      <View style={style.main}>
        <LoadingModal loadingMessage={loadingMessage} />
        {dataAvailable && (
          <View style={style.dataContainer}>
            <Text style={style.text}>
              {stockQuote.companyName} [{stockQuote.symbol}]
            </Text>
            <LineChart
              style={style.lineChart}
              data={{ labels: dates, datasets: [{ data: closes }] }}
              width={Dimensions.get('window').width}
              height={500}
              yAxisLabel="$"
              yAxisInterval={1}
              verticalLabelRotation={90}
              chartConfig={{
                backgroundGradientFrom: DefaultTheme.colors.text,
                backgroundGradientTo: DefaultTheme.colors.primary,
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                propsForDots: {
                  r: '1',
                  strokeWidth: '3',
                  stroke: DefaultTheme.colors.card,
                },
              }}
            />
            <View style={style.stockDetail}>
              <View style={style.stockHeader}>
                <Text style={style.stockName}>{stockQuote.symbol}</Text>
              </View>
              <StockDetailRow
                propertyNames={['OPEN', 'HIGH']}
                propertyValues={[stockQuote.open, stockQuote.high]}
              />
              <StockDetailRow
                propertyNames={['LOW', 'VOLUME']}
                propertyValues={[
                  stockQuote.low,
                  stockQuote.volume || stockQuote.latestVolume || '-',
                ]}
              />
              <StockDetailRow
                propertyNames={['P/E', 'AVG VOLUME']}
                propertyValues={[stockQuote.peRatio, stockQuote.avgTotalVolume]}
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
  },
  dataContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 10,
  },
  text: {
    padding: 10,
    fontSize: 30,
    color: 'white',
  },
  lineChart: {},
  stockDetail: {
    width: '100%',
    padding: 10,
    display: 'flex',
    justifyContent: 'space-between',
  },
  stockHeader: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#BCBCBC',
  },
  stockName: {
    color: '#fff',
    fontSize: 20,
  },
});
