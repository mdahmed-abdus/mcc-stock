import React from 'react';
import { TouchableWithoutFeedback, View, Button } from 'react-native';

function FavouritesScreen(props) {
  const handleOnPress = () => {
    console.log('Hehe');
  };

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }}>
      <View style={{ padding: 10 }}>
        <Button title="Add stock" onPress={handleOnPress} />
      </View>
    </TouchableWithoutFeedback>
  );
}

export default FavouritesScreen;
