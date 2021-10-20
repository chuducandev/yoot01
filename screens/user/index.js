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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const User = () => {

  return (
			<SafeAreaView style={{backgroundColor: '#ffffff'}}>
        <StatusBar barStyle="dark-content" />
        <View
          style={styles.container}>
        </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: '100%',
  },  
});

export default User;
