import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';
import { scaleSize } from '../constants/layout';
import { DefaultTheme } from '@react-navigation/native';
import PressableButton from './PressableButton';

function SearchBoxWithButton({
  placeholder = 'Search',
  defaultValue,
  buttonText = 'Enter',
  onPress = () => console.log('onPress not provided'),
  onChangeText = () => console.log('onChangeText not provided'),
}) {
  return (
    <View>
      <View style={style.searchBox}>
        <Ionicons name="search" style={style.searchIcon} />
        <TextInput
          style={style.textInput}
          autoCapitalize="none"
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChangeText={text => onChangeText(text)}
        />
      </View>
      <PressableButton onPress={onPress} buttonText={buttonText} />
    </View>
  );
}

export default SearchBoxWithButton;

const style = StyleSheet.create({
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DefaultTheme.colors.card,
    height: scaleSize(40),
    marginHorizontal: scaleSize(3),
    marginTop: scaleSize(5),
  },
  searchIcon: {
    paddingHorizontal: scaleSize(15),
    color: DefaultTheme.colors.text,
    fontSize: scaleSize(20),
  },
  textInput: {
    flex: 1,
    color: DefaultTheme.colors.text,
  },
});
