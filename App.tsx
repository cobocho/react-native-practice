import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {RootNavigator} from './src/navigations/root/RootNavigator';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <RootNavigator />
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'yellow',
    height: '100%',
  },
});

export default App;
