import { DefaultTheme } from '@react-navigation/native';
import React from 'react';
import { TouchableWithoutFeedback, View, Text } from 'react-native';

function SettingsScreen(props) {
  return (
    <TouchableWithoutFeedback style={{ flex: 1 }}>
      <View style={{ padding: 10 }}>
        <Text style={{ color: DefaultTheme.colors.card }}>
          Text from Settings screen
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default SettingsScreen;
