import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, TextInput } from 'react-native';
import { scaleSize } from '../constants/layout';
import _, { debounce } from 'lodash';

function SearchBox({
  placeholder = 'Search',
  searchText,
  handleChangeSearchText,
}) {
  const debounced = debounce(handleChangeSearchText, 500);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white', //grey
        height: scaleSize(40),
        marginHorizontal: scaleSize(3),
        marginTop: scaleSize(5),
      }}
    >
      <Ionicons
        name="search"
        style={{
          paddingHorizontal: scaleSize(15),
          color: '#000000',
          fontSize: scaleSize(20),
        }}
      />
      <TextInput
        style={{ color: '#000000' }}
        autoCapitalize="none"
        placeholder={placeholder}
        defaultValue={searchText}
        onChangeText={text => debounced(text)}
      />
    </View>
  );
}

export default SearchBox;
