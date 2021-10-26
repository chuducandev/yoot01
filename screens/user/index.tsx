import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

const User = () => {

  return (
			<SafeAreaView style={{backgroundColor: '#ffffff'}}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
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
