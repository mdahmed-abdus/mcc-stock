import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert, StyleSheet, TextInput, View } from 'react-native';
import { auth } from '../services/firebase';
import PressableButton from '../components/PressableButton';

function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace('mcc-stock');
      }
    });
    return unsubscribe;
  }, []);

  const handleSignUp = async () => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (e) {
      console.log('Could not signup');
      console.log(e.message);
      Alert.alert('Could not signup', e.message);
    }
  };

  const handleLogin = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (e) {
      console.log('Could not login');
      console.log(e.message);
      Alert.alert('Could not signup', e.message);
    }
  };

  return (
    <View style={style.container} behavior="padding">
      <View style={style.inputContainer}>
        <TextInput
          autoCapitalize="none"
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={style.input}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={style.input}
          secureTextEntry
        />
      </View>
      <View style={style.buttons}>
        <PressableButton buttonText="Login" onPress={handleLogin} />
        <PressableButton buttonText="Register" onPress={handleSignUp} />
      </View>
    </View>
  );
}

export default AuthScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 5,
  },
  buttons: {
    paddingTop: 20,
    width: '80%',
  },
});
