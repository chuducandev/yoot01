import React from 'react';
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
import User from './screens/user';
import Main from './screens/main';
import Quiz from './screens/quiz';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Quiz" component={Quiz} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({

});

export default App;
