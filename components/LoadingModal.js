import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { DefaultTheme } from '@react-navigation/native';

function LoadingModal({ loadingMessage, transparent = true }) {
  return (
    <Modal visible={loadingMessage.length !== 0} transparent={transparent}>
      <View style={style.loadingModal}>
        <Text style={style.loadingText}>{loadingMessage}</Text>
      </View>
    </Modal>
  );
}

export default LoadingModal;

const style = StyleSheet.create({
  loadingModal: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  loadingText: {
    fontSize: 30,
    color: DefaultTheme.colors.primary,
  },
});
