import React, { useState } from 'react';
import { DefaultTheme } from '@react-navigation/native';
import { Text, View, StyleSheet, Dimensions, Alert } from 'react-native';
import PressableButton from '../components/PressableButton';
import { getChartData } from '../services/stockService';
import { LineChart } from 'react-native-chart-kit';
import { scaleSize } from '../constants/layout';
import StockDetailRow from '../components/StockDetailRow';

function StockScreen(props) {
  const [dataAvailable, setDataAvailable] = useState(false);
  const [dates, setDates] = useState([]);
  const [closes, setCloses] = useState([]);
  const [stock, setStock] = useState({
    name: 'Tesla INC',
    open: '1000',
    low: '100',
    close: '100',
    high: '123',
    volumes: '20000',
  });

  const refresh = async () => {
    console.log('Refreshing...');
    const data = await getChartData('tsla', '1m');
    if (!data.success) {
      Alert.alert('Could not be loaded', 'Data could not be loaded');
      return;
    }

    const x = [];
    const y = [];
    for (const d of data.data) {
      x.push(d.date.replace('-', ' '));
      y.push(d.close);
    }

    setDates(x);
    setCloses(y);
    setDataAvailable(true);
    console.log('Refreshed');
  };

  return (
    <View style={style.main}>
      {dataAvailable && (
        <View style={style.dataContainer}>
          <Text style={style.text}>TSLA</Text>
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
              <Text style={style.stockName}>{stock.name}</Text>
            </View>
            <StockDetailRow
              propertyNames={['OPEN', 'LOW']}
              propertyValues={[stock.open, stock.low]}
            />
            <StockDetailRow
              propertyNames={['CLOSE', 'HIGH']}
              propertyValues={[stock.close, stock.high]}
            />
            <StockDetailRow
              propertyNames={['VOLUME']}
              propertyValues={[stock.volumes]}
            />
          </View>
        </View>
      )}
      <PressableButton buttonText="Refresh" onPress={refresh} />
    </View>
  );
}

export default StockScreen;

const style = StyleSheet.create({
  main: {
    flex: 1,
  },
  dataContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 10,
  },
  text: {
    padding: 10,
    fontSize: scaleSize(30),
    color: DefaultTheme.colors.card,
  },
  lineChart: {},
  stockDetail: {
    width: '100%',
    padding: 10,
    display: 'flex',
    justifyContent: 'space-between',
  },
  stockHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: scaleSize(0.5),
    borderBottomColor: '#BCBCBC',
  },
  stockName: {
    color: '#fff',
    fontSize: scaleSize(20),
  },
});
