import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { AppDispatch, store } from './store';

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

import User from './screens/user';
import Main from './screens/main';
import Quiz from './screens/quiz';
import { Provider, useDispatch } from 'react-redux';
import Results from './screens/results';
import Login from './screens/log-in';
import { setUser } from './store/user';

const Stack = createNativeStackNavigator()

const App = () => {
  const [signedIn, setSignedIn] = useState(auth().currentUser != null);

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    setSignedIn(user != null)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  })

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {signedIn ?
        <>
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Quiz" component={Quiz} />
          <Stack.Screen name="Results" component={Results} />
        </> : 
        <>
          <Stack.Screen name="Login" component={Login} />
        </>}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({

});

export default App;
