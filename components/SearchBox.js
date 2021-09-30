import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, TextInput } from 'react-native';
import { scaleSize } from '../constants/layout';
import _, { debounce } from 'lodash';
import { DefaultTheme } from '@react-navigation/native';

function SearchBox({
  placeholder = 'Search',
  searchText,
  handleChangeSearchText,
  wait = 500,
}) {
  const debounced = debounce(handleChangeSearchText, wait);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: DefaultTheme.colors.card,
        height: scaleSize(40),
        marginHorizontal: scaleSize(3),
        marginTop: scaleSize(5),
      }}
    >
      <Ionicons
        name="search"
        style={{
          paddingHorizontal: scaleSize(15),
          color: DefaultTheme.colors.text,
          fontSize: scaleSize(20),
        }}
      />
      <TextInput
        style={{ flex: 1, color: DefaultTheme.colors.text }}
        autoCapitalize="none"
        placeholder={placeholder}
        defaultValue={searchText}
        onChangeText={text => debounced(text)}
      />
    </View>
  );
}

export default SearchBox;
