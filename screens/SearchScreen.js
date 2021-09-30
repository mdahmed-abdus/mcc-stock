import React from 'react';
import { TouchableWithoutFeedback, View, Keyboard } from 'react-native';
import SearchBox from '../components/SearchBox';

function HomeScreen(props) {
  const handleChangeSearchText = text => {
    if (text.length === 0) {
      return;
    }

    text = text.replace(/[.*+\-?^${}()|[\]\\]/g, ''); //prevent the error caused by entering special characters
    // implement
    console.log(text);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          flex: 1, // get full space
        }}
      >
        <SearchBox
          placeholder="Enter stock symbol (ex: tsla)"
          handleChangeSearchText={handleChangeSearchText}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

export default HomeScreen;
