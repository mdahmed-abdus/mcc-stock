import { DefaultTheme } from '@react-navigation/native';
import React from 'react';
import { TouchableWithoutFeedback, View, Text } from 'react-native';

function OthersScreen(props) {
  const handleOnPress = () => {
    console.log('Hehe');
  };

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }}>
      <View style={{ padding: 10 }}>
        <Text style={{ color: DefaultTheme.colors.card }}>
          Powered by IEX Cloud
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default OthersScreen;
