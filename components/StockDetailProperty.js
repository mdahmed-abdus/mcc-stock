import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scaleSize } from '../constants/layout';

function StockDetailProperty({ propertyName, propertyValue }) {
  return (
    <View style={style.stockProperty}>
      <Text style={style.stockPropertyName}>{propertyName}</Text>
      <Text style={style.stockPropertyValue}>{propertyValue}</Text>
    </View>
  );
}

export default StockDetailProperty;

const style = StyleSheet.create({
  stockProperty: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: scaleSize(3),
  },
  stockPropertyName: {
    color: '#616263',
  },
  stockPropertyValue: {
    color: '#fff',
    fontSize: scaleSize(15),
  },
});
