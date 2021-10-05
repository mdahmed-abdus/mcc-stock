import React from 'react';
import StockDetailProperty from './StockDetailProperty';
import { View, StyleSheet } from 'react-native';

function StockDetailRow({ propertyNames, propertyValues }) {
  return (
    <View style={style.stockDetailRow}>
      <StockDetailProperty
        propertyName={propertyNames.length > 0 ? propertyNames[0] : ''}
        propertyValue={propertyValues.length > 0 ? propertyValues[0] : ''}
      />
      <StockDetailProperty
        propertyName={propertyNames.length > 1 ? propertyNames[1] : ''}
        propertyValue={propertyValues.length > 1 ? propertyValues[1] : ''}
      />
    </View>
  );
}

export default StockDetailRow;

const style = StyleSheet.create({
  stockDetailRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#404142',
  },
});
